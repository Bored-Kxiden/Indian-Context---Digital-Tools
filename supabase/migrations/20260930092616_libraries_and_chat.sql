-- Beyond the Edge Case: the libraries (Expression and Design Language), who may contribute,
-- and the chatbot's search index. See CONTEXT.md, D34.
--
-- Rules the database enforces, so no page can get them wrong:
--   * Anyone can read approved library entries. Entries flagged "sensitive to reuse" are
--     readable by signed-in members only.
--   * Only invited members can submit. Nothing a contributor writes is published until an
--     editor approves it. Contributors cannot set their own entries to approved.
--   * A Design Language entry cannot be approved unless it cites at least one approved
--     Expression Library entry.
--   * The chat index and the rate-limit counters are written only by the Edge Functions.

create extension if not exists vector with schema extensions;
create schema if not exists private;

-- ---------------------------------------------------------------- members
create type public.member_role as enum ('contributor', 'editor');

create table public.members (
  user_id uuid primary key references auth.users (id) on delete cascade,
  role public.member_role not null default 'contributor',
  display_name text check (display_name is null or char_length(display_name) <= 80),
  created_at timestamptz not null default now()
);
alter table public.members enable row level security;

-- Helpers live in a schema the API does not expose.
create or replace function private.is_member() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.members m where m.user_id = (select auth.uid()));
$$;
create or replace function private.is_editor() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.members m where m.user_id = (select auth.uid()) and m.role = 'editor');
$$;
-- True when the request comes through the API as a signed-in or anonymous user
-- (not the service role, and not a direct database session).
create or replace function private.is_api_user() returns boolean
language sql stable set search_path = '' as $$
  select coalesce((select auth.role()), '') in ('anon', 'authenticated');
$$;
grant usage on schema private to anon, authenticated;
grant execute on function private.is_member(), private.is_editor(), private.is_api_user() to anon, authenticated;

create policy "members read their own row, editors read all" on public.members
  for select to authenticated using (user_id = (select auth.uid()) or (select private.is_editor()));
create policy "editors manage members" on public.members
  for all to authenticated using ((select private.is_editor())) with check ((select private.is_editor()));

-- ---------------------------------------------------------------- library
create type public.review_status as enum ('draft', 'submitted', 'approved', 'rejected');

create sequence public.expressions_seq start 101;
create sequence public.patterns_seq start 101;

create table public.expressions (
  id text primary key default ('EX-' || lpad(nextval('public.expressions_seq')::text, 3, '0'))
    check (id ~ '^EX-[0-9]{3,}$'),
  title text not null check (char_length(title) between 3 and 200),
  original_text text not null check (char_length(original_text) between 1 and 2000),
  language text not null check (char_length(language) between 1 and 120),
  literal text not null check (char_length(literal) between 1 and 2000),
  implied text not null check (char_length(implied) between 1 and 2000),
  setting text not null check (char_length(setting) between 1 and 400),
  lenses text[] not null default '{}' check (lenses <@ array['N', 'P', 'T']),
  -- The four Fidelity Protocol tags. Any of them may be missing; the site then shows
  -- "Needs re-check" and the entry cannot carry full confidence.
  source_language text check (source_language is null or char_length(source_language) <= 120),
  interpreter text check (interpreter in ('none-needed', 'research-coordinator', 'independent-interpreter', 'professional-translator')),
  rendering text check (rendering in ('verbatim', 'gloss', 'paraphrase')),
  single_source boolean,
  sensitive boolean not null default false,
  sample boolean not null default false,
  status public.review_status not null default 'submitted',
  submitted_by uuid references auth.users (id) on delete set null default auth.uid(),
  reviewed_by uuid references auth.users (id) on delete set null,
  reviewed_at timestamptz,
  review_note text check (review_note is null or char_length(review_note) <= 1000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.patterns (
  id text primary key default ('DL-' || lpad(nextval('public.patterns_seq')::text, 3, '0'))
    check (id ~ '^DL-[0-9]{3,}$'),
  title text not null check (char_length(title) between 3 and 200),
  type text not null check (type in ('Wording', 'Interaction')),
  context text not null check (char_length(context) between 1 and 400),
  pattern text not null check (char_length(pattern) between 1 and 2000),
  -- A named segment, never a generic user.
  audience text not null check (char_length(audience) between 1 and 200),
  tested_status text not null default 'Not yet tested'
    check (tested_status in ('Confirmed', 'Partially confirmed', 'Not yet tested')),
  lens_n text not null default 'untested' check (lens_n in ('pass', 'fail', 'untested')),
  lens_n_note text check (lens_n_note is null or char_length(lens_n_note) <= 600),
  lens_p text not null default 'untested' check (lens_p in ('pass', 'fail', 'untested')),
  lens_p_note text check (lens_p_note is null or char_length(lens_p_note) <= 600),
  lens_t text not null default 'untested' check (lens_t in ('pass', 'fail', 'untested')),
  lens_t_note text check (lens_t_note is null or char_length(lens_t_note) <= 600),
  sample boolean not null default false,
  status public.review_status not null default 'submitted',
  submitted_by uuid references auth.users (id) on delete set null default auth.uid(),
  reviewed_by uuid references auth.users (id) on delete set null,
  reviewed_at timestamptz,
  review_note text check (review_note is null or char_length(review_note) <= 1000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.pattern_citations (
  pattern_id text not null references public.patterns (id) on delete cascade,
  expression_id text not null references public.expressions (id) on delete restrict,
  primary key (pattern_id, expression_id)
);
create index pattern_citations_expression_idx on public.pattern_citations (expression_id);
create index expressions_status_idx on public.expressions (status);
create index patterns_status_idx on public.patterns (status);
create index expressions_submitted_by_idx on public.expressions (submitted_by);
create index patterns_submitted_by_idx on public.patterns (submitted_by);
create index expressions_reviewed_by_idx on public.expressions (reviewed_by);
create index patterns_reviewed_by_idx on public.patterns (reviewed_by);

create or replace function private.default_id(tbl text) returns text
language sql volatile set search_path = '' as $$
  select case tbl
    when 'expressions' then 'EX-' || lpad(nextval('public.expressions_seq')::text, 3, '0')
    else 'DL-' || lpad(nextval('public.patterns_seq')::text, 3, '0')
  end;
$$;


-- Contributors cannot approve, cannot set the sample flag, cannot pick IDs or reviewers,
-- and an edit to a rejected entry sends it back for review. Editors set the review fields.
create or replace function private.guard_library_row() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  editor boolean := private.is_editor();
begin
  if not private.is_api_user() then
    new.updated_at := now();
    return new;
  end if;
  if tg_op = 'INSERT' then
    if not editor then
      new.id := private.default_id(tg_table_name);
      new.sample := false;
      new.submitted_by := (select auth.uid());
      new.reviewed_by := null;
      new.reviewed_at := null;
      new.review_note := null;
      if new.status not in ('draft', 'submitted') then new.status := 'submitted'; end if;
    end if;
  else
    new.id := old.id;
    new.submitted_by := old.submitted_by;
    new.created_at := old.created_at;
    if not editor then
      new.sample := old.sample;
      if old.status = 'approved' then
        raise exception 'Approved entries can only be changed by an editor.';
      end if;
      if new.status not in ('draft', 'submitted') then new.status := 'submitted'; end if;
      new.reviewed_by := null;
      new.reviewed_at := null;
      new.review_note := old.review_note;
    end if;
  end if;
  if editor and new.status in ('approved', 'rejected')
     and (tg_op = 'INSERT' or new.status is distinct from old.status) then
    new.reviewed_by := (select auth.uid());
    new.reviewed_at := now();
  end if;
  new.updated_at := now();
  return new;
end;
$$;

create trigger expressions_guard before insert or update on public.expressions
  for each row execute function private.guard_library_row();
create trigger patterns_guard before insert or update on public.patterns
  for each row execute function private.guard_library_row();

-- A Design Language entry is approved only with at least one approved citation.
create or replace function private.check_pattern_citations() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if new.status = 'approved' and not exists (
    select 1 from public.pattern_citations c
    join public.expressions e on e.id = c.expression_id
    where c.pattern_id = new.id and e.status = 'approved'
  ) then
    raise exception 'A Design Language entry must cite at least one approved Expression Library entry before it is approved.';
  end if;
  return new;
end;
$$;
create constraint trigger patterns_citations_check after insert or update on public.patterns
  deferrable initially deferred
  for each row execute function private.check_pattern_citations();

alter table public.expressions enable row level security;
alter table public.patterns enable row level security;
alter table public.pattern_citations enable row level security;

-- Reads
create policy "read approved, own, or all for editors" on public.expressions
  for select to anon, authenticated using (
    (status = 'approved' and (not sensitive or (select private.is_member())))
    or submitted_by = (select auth.uid())
    or (select private.is_editor())
  );
create policy "read approved, own, or all for editors" on public.patterns
  for select to anon, authenticated using (
    status = 'approved' or submitted_by = (select auth.uid()) or (select private.is_editor())
  );
create policy "read citations of readable patterns" on public.pattern_citations
  for select to anon, authenticated using (
    exists (select 1 from public.patterns p where p.id = pattern_id)
  );

-- Writes: members submit, owners edit until approved, editors do everything
create policy "members submit" on public.expressions
  for insert to authenticated with check ((select private.is_member()));
create policy "members submit" on public.patterns
  for insert to authenticated with check ((select private.is_member()));
create policy "owners edit until approved, editors always" on public.expressions
  for update to authenticated
  using ((submitted_by = (select auth.uid()) and status <> 'approved') or (select private.is_editor()))
  with check ((select private.is_member()));
create policy "owners edit until approved, editors always" on public.patterns
  for update to authenticated
  using ((submitted_by = (select auth.uid()) and status <> 'approved') or (select private.is_editor()))
  with check ((select private.is_member()));
create policy "owners delete drafts, editors any" on public.expressions
  for delete to authenticated
  using ((submitted_by = (select auth.uid()) and status in ('draft', 'submitted', 'rejected')) or (select private.is_editor()));
create policy "owners delete drafts, editors any" on public.patterns
  for delete to authenticated
  using ((submitted_by = (select auth.uid()) and status in ('draft', 'submitted', 'rejected')) or (select private.is_editor()));
create policy "cite from patterns you can edit" on public.pattern_citations
  for insert to authenticated with check (
    exists (select 1 from public.patterns p where p.id = pattern_id
      and ((p.submitted_by = (select auth.uid()) and p.status <> 'approved') or (select private.is_editor())))
  );
create policy "uncite from patterns you can edit" on public.pattern_citations
  for delete to authenticated using (
    exists (select 1 from public.patterns p where p.id = pattern_id
      and ((p.submitted_by = (select auth.uid()) and p.status <> 'approved') or (select private.is_editor())))
  );

-- ---------------------------------------------------------------- chat index
create table public.doc_chunks (
  id text primary key,
  source text not null default 'toolkit' check (source in ('toolkit', 'library', 'open')),
  url text not null,
  title text not null,
  section text,
  component text,
  content text not null,
  content_hash text not null,
  license text,
  attribution text,
  embedding extensions.vector(384),
  fts tsvector generated always as (
    to_tsvector('english', coalesce(title, '') || ' ' || coalesce(section, '') || ' ' || content)
  ) stored,
  updated_at timestamptz not null default now()
);
create index doc_chunks_embedding_idx on public.doc_chunks using hnsw (embedding extensions.vector_ip_ops);
create index doc_chunks_fts_idx on public.doc_chunks using gin (fts);
alter table public.doc_chunks enable row level security;
create policy "the index is public" on public.doc_chunks for select to anon, authenticated using (true);

-- Hybrid search: semantic (gte-small, normalised, inner product) and keyword (any term),
-- merged by reciprocal rank. `similarity` is the cosine similarity of the semantic match.
create or replace function public.match_chunks(
  query_text text,
  query_embedding extensions.vector(384) default null,
  match_count int default 6
) returns table (
  id text, url text, title text, section text, component text, content text,
  source text, license text, attribution text, similarity float, keyword_rank float, score float
)
language sql stable set search_path = '' as $$
  with q as (
    select case when trim(coalesce(query_text, '')) = '' then null
      else to_tsquery('english', replace(plainto_tsquery('english', query_text)::text, '&', '|')) end as tsq
  ),
  semantic as (
    select c.id, -(c.embedding operator(extensions.<#>) query_embedding) as sim,
      row_number() over (order by c.embedding operator(extensions.<#>) query_embedding) as rank
    from public.doc_chunks c
    where query_embedding is not null and c.embedding is not null
    order by c.embedding operator(extensions.<#>) query_embedding
    limit 40
  ),
  keyword as (
    select c.id, ts_rank_cd(c.fts, q.tsq) as kr,
      row_number() over (order by ts_rank_cd(c.fts, q.tsq) desc) as rank
    from public.doc_chunks c, q
    where q.tsq is not null and c.fts @@ q.tsq
    order by ts_rank_cd(c.fts, q.tsq) desc
    limit 40
  )
  select c.id, c.url, c.title, c.section, c.component, c.content, c.source, c.license, c.attribution,
    coalesce(s.sim, 0)::float, coalesce(k.kr, 0)::float,
    (coalesce(1.0 / (60 + s.rank), 0) + coalesce(1.0 / (60 + k.rank), 0))::float as score
  from semantic s
  full outer join keyword k on s.id = k.id
  join public.doc_chunks c on c.id = coalesce(s.id, k.id)
  order by score desc
  limit greatest(1, least(match_count, 12));
$$;

-- ---------------------------------------------------------------- rate limits and sync state
create table public.chat_usage (
  bucket text primary key,
  count int not null default 0,
  expires_at timestamptz not null
);
alter table public.chat_usage enable row level security;
-- No policies: only the service role (Edge Functions) reads or writes it.

create table public.index_meta (
  key text primary key,
  value text,
  updated_at timestamptz not null default now()
);
alter table public.index_meta enable row level security;

-- Counts one question against three limits: per visitor per minute, per visitor per day,
-- and for the whole site per day. Returns which limit was hit, or null when allowed.
create or replace function public.take_chat_token(
  visitor text, per_minute int default 6, per_day int default 60, site_per_day int default 1500
) returns text
language plpgsql set search_path = '' as $$
declare
  n int;
begin
  delete from public.chat_usage where expires_at < now() and random() < 0.05;
  insert into public.chat_usage as u (bucket, count, expires_at)
    values ('m:' || visitor || ':' || to_char(now(), 'YYYYMMDDHH24MI'), 1, now() + interval '2 minutes')
    on conflict (bucket) do update set count = u.count + 1 returning count into n;
  if n > per_minute then return 'minute'; end if;
  insert into public.chat_usage as u (bucket, count, expires_at)
    values ('d:' || visitor || ':' || to_char(now(), 'YYYYMMDD'), 1, now() + interval '2 days')
    on conflict (bucket) do update set count = u.count + 1 returning count into n;
  if n > per_day then return 'day'; end if;
  insert into public.chat_usage as u (bucket, count, expires_at)
    values ('site:' || to_char(now(), 'YYYYMMDD'), 1, now() + interval '2 days')
    on conflict (bucket) do update set count = u.count + 1 returning count into n;
  if n > site_per_day then return 'site'; end if;
  return null;
end;
$$;
revoke all on function public.take_chat_token(text, int, int, int) from public, anon, authenticated;
grant execute on function public.take_chat_token(text, int, int, int) to service_role;
