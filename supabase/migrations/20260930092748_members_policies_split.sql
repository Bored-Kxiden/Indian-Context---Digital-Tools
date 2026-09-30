-- One permissive policy per action on members (the performance advisor flagged two for SELECT).
drop policy "editors manage members" on public.members;
create policy "editors add members" on public.members
  for insert to authenticated with check ((select private.is_editor()));
create policy "editors change members" on public.members
  for update to authenticated using ((select private.is_editor())) with check ((select private.is_editor()));
create policy "editors remove members" on public.members
  for delete to authenticated using ((select private.is_editor()));
comment on table public.chat_usage is 'Rate-limit counters for the ask Edge Function. No policies on purpose: only the service role reads or writes it.';
comment on table public.index_meta is 'Chat index sync state. No policies on purpose: only the service role reads or writes it.';
