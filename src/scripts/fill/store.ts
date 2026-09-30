// "Fill on screen": saving, loading and exporting the forms built by src/components/fill/FillForm.astro.
//
// Everything stays in this browser (localStorage), under a project name the reader chooses, so the same person can
// keep "NSP · Meera" and "DigiLocker · Ravi" apart. Nothing is sent to a server: research notes can hold sensitive
// things, and this way the reader decides where they go (print, save as PDF, or download a file to share).

const PREFIX = 'bte-fill:v1:';
const PROJECTS = `${PREFIX}projects`;
const CURRENT = `${PREFIX}current`;
const DEFAULT_PROJECT = 'My project';

export interface Saved {
  kind: 'beyond-the-edge-case/fill';
  version: 1;
  template: string;
  title?: string;
  project: string;
  updated: string;
  values: Record<string, string | boolean>;
  repeats: Record<string, number>;
}

// ---- Storage (every read and write can fail: private windows, full storage)

const read = <T>(k: string, fallback: T): T => {
  try {
    const v = localStorage.getItem(k);
    return v === null ? fallback : (JSON.parse(v) as T);
  } catch {
    return fallback;
  }
};
const write = (k: string, v: unknown) => {
  try {
    localStorage.setItem(k, JSON.stringify(v));
    return true;
  } catch {
    return false;
  }
};
const remove = (k: string) => {
  try {
    localStorage.removeItem(k);
  } catch {
    /* ignore */
  }
};

export const keyFor = (project: string, template: string) => `${PREFIX}${encodeURIComponent(project)}:${template}`;
export const projects = (): string[] => {
  const list = read<string[]>(PROJECTS, []);
  return list.length ? list : [DEFAULT_PROJECT];
};
export const currentProject = () => read<string>(CURRENT, '') || projects()[0];
export function setCurrentProject(name: string) {
  const n = name.trim() || DEFAULT_PROJECT;
  write(CURRENT, n);
  const list = projects();
  if (!list.includes(n)) write(PROJECTS, [...list.filter((p) => p !== DEFAULT_PROJECT || hasAny(p)), n]);
  return n;
}
export const load = (project: string, template: string) => read<Saved | null>(keyFor(project, template), null);
export const save = (s: Saved) => write(keyFor(s.project, s.template), s);
export const clear = (project: string, template: string) => remove(keyFor(project, template));
export function hasAny(project: string) {
  try {
    const p = `${PREFIX}${encodeURIComponent(project)}:`;
    for (let i = 0; i < localStorage.length; i++) if (localStorage.key(i)?.startsWith(p)) return true;
  } catch {
    /* ignore */
  }
  return false;
}
/** Everything saved for a project: template id → saved answers. */
export function allFor(project: string): Record<string, Saved> {
  const out: Record<string, Saved> = {};
  try {
    const p = `${PREFIX}${encodeURIComponent(project)}:`;
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k?.startsWith(p)) {
        const v = read<Saved | null>(k, null);
        if (v) out[v.template] = v;
      }
    }
  } catch {
    /* ignore */
  }
  return out;
}
export function deleteProject(project: string) {
  for (const id of Object.keys(allFor(project))) clear(project, id);
  write(
    PROJECTS,
    projects().filter((p) => p !== project),
  );
  if (currentProject() === project) remove(CURRENT);
}

export function download(filename: string, text: string, type = 'application/json') {
  const blob = new Blob([text], { type: `${type};charset=utf-8` });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
export const fileSlug = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60) || 'work';

// ---- One form

const san = (n: string) => n.replace(/[^a-zA-Z0-9]+/g, '-');
type Control = HTMLInputElement | HTMLTextAreaElement;

function initFill(root: HTMLElement) {
  const id = root.dataset.fill!;
  const uid = root.dataset.uid!;
  const title = root.dataset.title ?? id;
  const status = root.querySelector<HTMLElement>('[data-fill-status]')!;
  const projectInput = root.querySelector<HTMLInputElement>('[data-fill-project]')!;
  const repeats = [...root.querySelectorAll<HTMLElement>('[data-repeat]')];
  let project = currentProject();
  projectInput.value = project;

  const controls = () => [...root.querySelectorAll<Control>('input[name], textarea[name]')].filter((c) => c.type !== 'file');

  // Repeats: number the items, and rebuild each field's name, id, label and hint from its pattern.
  function renumber(rep: HTMLElement) {
    const items = [...rep.querySelectorAll<HTMLElement>(':scope > [data-repeat-list] > .item')];
    items.forEach((item, i) => {
      const lbl = item.querySelector<HTMLElement>('[data-item-label]');
      if (lbl) lbl.textContent = `${lbl.dataset.itemLabel} ${i + 1}`;
      const at = (tplName: string) => tplName.replace('[#]', `[${i}]`);
      item.querySelectorAll<Control>('[data-name-tpl]').forEach((c) => {
        const n = at(c.dataset.nameTpl!);
        c.name = n;
        if (c.hasAttribute('id')) c.id = `${uid}-${san(n)}`;
        if (c.hasAttribute('aria-describedby')) c.setAttribute('aria-describedby', `${uid}-${san(n)}-h`);
      });
      item.querySelectorAll<HTMLLabelElement>('[data-for-tpl]').forEach((l) => (l.htmlFor = `${uid}-${san(at(l.dataset.forTpl!))}`));
      item.querySelectorAll<HTMLElement>('[data-hint-tpl]').forEach((h) => (h.id = `${uid}-${san(at(h.dataset.hintTpl!))}-h`));
      const rm = item.querySelector<HTMLButtonElement>('[data-remove]');
      if (rm) rm.setAttribute('aria-label', `Remove ${lbl?.textContent ?? 'item'}`);
    });
  }
  function addItem(rep: HTMLElement, focus = false) {
    const tpl = rep.querySelector<HTMLTemplateElement>(':scope > [data-repeat-tpl]')!;
    const list = rep.querySelector<HTMLElement>(':scope > [data-repeat-list]')!;
    const node = tpl.content.firstElementChild!.cloneNode(true) as HTMLElement;
    list.append(node);
    renumber(rep);
    if (focus) node.querySelector<HTMLElement>('input, textarea')?.focus();
    return node;
  }
  function setCount(rep: HTMLElement, n: number) {
    const list = rep.querySelector<HTMLElement>(':scope > [data-repeat-list]')!;
    list.replaceChildren();
    for (let i = 0; i < n; i++) addItem(rep);
  }

  function collect(): Saved {
    const values: Record<string, string | boolean> = {};
    for (const c of controls()) {
      if (c instanceof HTMLInputElement && c.type === 'radio') {
        if (c.checked) values[c.name] = c.value;
      } else if (c instanceof HTMLInputElement && c.type === 'checkbox') {
        if (c.value && c.value !== 'on') {
          if (c.checked) values[`${c.name}=${c.value}`] = true;
        } else if (c.checked) values[c.name] = true;
      } else if (c.value.trim()) values[c.name] = c.value;
    }
    const counts: Record<string, number> = {};
    for (const r of repeats) counts[r.dataset.repeat!] = r.querySelectorAll(':scope > [data-repeat-list] > .item').length;
    return { kind: 'beyond-the-edge-case/fill', version: 1, template: id, title, project, updated: new Date().toISOString(), values, repeats: counts };
  }

  function apply(s: Saved | null) {
    for (const r of repeats) setCount(r, s?.repeats?.[r.dataset.repeat!] ?? Number(r.dataset.start ?? 1));
    const v = s?.values ?? {};
    for (const c of controls()) {
      if (c instanceof HTMLInputElement && c.type === 'radio') c.checked = v[c.name] === c.value;
      else if (c instanceof HTMLInputElement && c.type === 'checkbox')
        c.checked = c.value && c.value !== 'on' ? v[`${c.name}=${c.value}`] === true : v[c.name] === true;
      else {
        c.value = typeof v[c.name] === 'string' ? (v[c.name] as string) : '';
        if (c instanceof HTMLTextAreaElement) grow(c);
        else if (c.classList.contains('blank')) widen(c);
      }
    }
    showStatus(s);
  }

  function showStatus(s: Saved | null, justSaved = false) {
    if (!s || (!Object.keys(s.values).length && !justSaved)) {
      status.textContent = `Nothing filled in yet for “${project}”.`;
      return;
    }
    const t = new Date(s.updated);
    const when = t.toLocaleString(undefined, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
    status.textContent = `Saved in this browser for “${project}” · ${when}`;
  }

  let timer = 0;
  function saveSoon() {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      const s = collect();
      if (save(s)) {
        setCurrentProject(project);
        showStatus(s, true);
      } else status.textContent = 'Could not save in this browser (private window, or storage full). Download a copy to keep it.';
    }, 350);
  }

  const grow = (t: HTMLTextAreaElement) => {
    t.style.height = 'auto';
    t.style.height = `${t.scrollHeight + 2}px`;
  };
  // A blank in a sentence is as wide as its example, or its answer once that is longer.
  const widen = (b: HTMLInputElement) => b.style.setProperty('--w', `${Math.min(Math.max(b.value.length, b.placeholder.length) + 3, 60)}ch`);

  root.addEventListener('input', (e) => {
    const el = e.target as HTMLElement;
    if (el === projectInput) return;
    if (el instanceof HTMLTextAreaElement) grow(el);
    else if (el instanceof HTMLInputElement && el.classList.contains('blank')) widen(el);
    saveSoon();
  });
  root.addEventListener('change', (e) => {
    const el = e.target as HTMLElement;
    if (el === projectInput) {
      project = setCurrentProject(projectInput.value);
      projectInput.value = project;
      apply(load(project, id));
      fillProjectList();
      document.dispatchEvent(new CustomEvent('fill:project', { detail: project }));
      return;
    }
    if ((el as HTMLInputElement).type === 'file') return;
    saveSoon();
  });
  document.addEventListener('fill:project', (e) => {
    const p = (e as CustomEvent<string>).detail;
    if (p !== project) {
      project = p;
      projectInput.value = p;
      apply(load(p, id));
    }
  });

  root.addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest('button');
    if (!b) return;
    const rep = b.closest<HTMLElement>('[data-repeat]');
    if (b.matches('[data-add]') && rep) {
      addItem(rep, true);
      saveSoon();
    } else if (b.matches('[data-remove]') && rep) {
      const item = b.closest('.item')!;
      const next = (item.nextElementSibling ?? item.previousElementSibling) as HTMLElement | null;
      item.remove();
      renumber(rep);
      (next?.querySelector<HTMLElement>('input, textarea') ?? rep.querySelector<HTMLElement>('[data-add]'))?.focus();
      saveSoon();
    } else if (b.matches('[data-fill-print]')) printForm(root);
    else if (b.matches('[data-fill-download]')) {
      const s = collect();
      download(`${fileSlug(title)}-${fileSlug(project)}.json`, JSON.stringify(s, null, 2));
    } else if (b.matches('[data-fill-csv]')) downloadCsv(root, `${fileSlug(title)}-${fileSlug(project)}.csv`);
    else if (b.matches('[data-fill-clear]')) {
      if (confirm(`Clear “${title}” for “${project}”? This cannot be undone. Download a copy first if you want to keep it.`)) {
        clear(project, id);
        apply(null);
        status.textContent = `Cleared “${title}” for “${project}”.`;
      }
    }
  });

  root.querySelector<HTMLInputElement>('[data-fill-load]')?.addEventListener('change', async (e) => {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      const s: Saved | undefined = data?.kind === 'beyond-the-edge-case/fill' ? data : data?.templates?.[id];
      if (!s || s.template !== id) {
        status.textContent = 'That file is not a copy of this form.';
        return;
      }
      apply({ ...s, project });
      save(collect());
      status.textContent = `Loaded “${file.name}” into “${project}”.`;
    } catch {
      status.textContent = 'Could not read that file.';
    }
  });

  apply(load(project, id));
}

// ---- Printing: a plain copy of the form with the answers written in, then the browser's print dialog.

function printForm(root: HTMLElement) {
  const copy = root.cloneNode(true) as HTMLElement;
  const orig = [...root.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea')];
  const cl = [...copy.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea')];
  cl.forEach((c, i) => {
    const o = orig[i];
    if (o instanceof HTMLInputElement && (o.type === 'checkbox' || o.type === 'radio')) {
      const mark = document.createElement('span');
      mark.className = 'pv-box';
      mark.textContent = o.checked ? '☑' : '☐';
      c.replaceWith(mark);
    } else if (o instanceof HTMLInputElement && o.type === 'file') {
      c.remove();
    } else {
      const v = document.createElement('span');
      v.className = o.classList.contains('blank') ? 'pv pv--blank' : 'pv';
      v.textContent = o.value || (o.classList.contains('blank') ? '      ' : '');
      if (!o.value) v.classList.add('pv--empty');
      c.replaceWith(v);
    }
  });
  copy.querySelectorAll('template, .factions, .fprivacy, .fsaved, [data-remove], [data-add], .fhint').forEach((n) => n.remove());
  // The copy is only for paper: keep the page's ids unique.
  [copy, ...copy.querySelectorAll('[id]')].forEach((n) => n.removeAttribute('id'));
  const wrap = document.createElement('div');
  wrap.className = 'fill-print';
  wrap.append(copy);
  document.body.append(wrap);
  document.documentElement.classList.add('printing-fill');
  const done = () => {
    wrap.remove();
    document.documentElement.classList.remove('printing-fill');
    window.removeEventListener('afterprint', done);
  };
  window.addEventListener('afterprint', done);
  window.print();
  setTimeout(() => document.documentElement.classList.contains('printing-fill') && done(), 60000);
}

// ---- A repeat (e.g. Meaning Cards) as a spreadsheet: one row per item, one column per field.

function downloadCsv(root: HTMLElement, filename: string) {
  const rep = root.querySelector<HTMLElement>('[data-repeat][data-csv]');
  if (!rep) return;
  const items = [...rep.querySelectorAll<HTMLElement>(':scope > [data-repeat-list] > .item')];
  const cell = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const cols: { label: string; get: (item: HTMLElement) => string }[] = [];
  const first = rep.querySelector<HTMLTemplateElement>(':scope > [data-repeat-tpl]')!.content;
  first.querySelectorAll<HTMLElement>('.ff').forEach((ff) => {
    const label = ((ff.classList.contains('flag') ? ff.querySelector('b') : ff.querySelector('label, legend'))?.textContent ?? '').trim().replace(/\.$/, '');
    const input = ff.querySelector<HTMLInputElement | HTMLTextAreaElement>('[data-name-tpl]');
    if (!input) return;
    const tplName = input.dataset.nameTpl!;
    cols.push({
      label,
      get: (item) => {
        const els = [...item.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[data-name-tpl]')].filter((e) => e.dataset.nameTpl === tplName);
        if (els[0] instanceof HTMLInputElement && els[0].type === 'radio') return (els as HTMLInputElement[]).find((e) => e.checked)?.value ?? '';
        if (els[0] instanceof HTMLInputElement && els[0].type === 'checkbox') return (els[0] as HTMLInputElement).checked ? 'yes' : '';
        return els[0]?.value ?? '';
      },
    });
  });
  const rows = [cols.map((c) => cell(c.label)).join(','), ...items.map((it) => cols.map((c) => cell(c.get(it))).join(','))];
  // A byte-order mark so spreadsheet apps read Devanagari and other scripts correctly.
  download(filename, `﻿${rows.join('\r\n')}\r\n`, 'text/csv');
}

function fillProjectList() {
  let dl = document.getElementById('fill-projects') as HTMLDataListElement | null;
  if (!dl) {
    dl = document.createElement('datalist');
    dl.id = 'fill-projects';
    document.body.append(dl);
  }
  dl.replaceChildren(
    ...projects().map((p) => {
      const o = document.createElement('option');
      o.value = p;
      return o;
    }),
  );
}

let started = false;
export function initFills() {
  if (started) return;
  started = true;
  fillProjectList();
  document.querySelectorAll<HTMLElement>('[data-fill]').forEach(initFill);
}
