// The guide (v3 template, D47): its eyes follow the pointer, it gives a first-time visitor a seven-step tour,
// and it pipes up now and then when a visitor has been still for a while. Markup: src/components/Guide.astro and
// the guide link in src/components/Header.astro (which opens the chat; see ChatWidget.astro).

const ui = document.querySelector<HTMLElement>('[data-guide-ui]');
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const fine = matchMedia('(hover: hover) and (pointer: fine)');

const store = (s: () => Storage) => ({
  get(k: string) {
    try {
      return s().getItem(k);
    } catch {
      return null;
    }
  },
  set(k: string, v: string | null) {
    try {
      if (v === null) s().removeItem(k);
      else s().setItem(k, v);
    } catch {
      /* private mode: the tour simply runs again next time */
    }
  },
});
const local = store(() => localStorage);
const session = store(() => sessionStorage);

/* ---------- The eyes follow the pointer (only with a mouse, and only if motion is welcome) ---------- */
const pupils = [...document.querySelectorAll<HTMLElement>('[data-pupil]')];
let frame = 0;
let px = 0;
let py = 0;
window.addEventListener(
  'pointermove',
  (e) => {
    if (!fine.matches || reduce.matches || !pupils.length) return;
    px = e.clientX;
    py = e.clientY;
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      for (const el of pupils) {
        const b = el.parentElement!.getBoundingClientRect();
        const dx = px - (b.left + b.width / 2);
        const dy = py - (b.top + b.height / 2);
        const d = Math.hypot(dx, dy) || 1;
        const m = Math.min(3.2, d / 25);
        el.style.transform = `translate(${(dx / d) * m}px, ${(dy / d) * m * 1.1}px)`;
      }
    });
  },
  { passive: true },
);

if (ui) {
  const home = ui.dataset.home ?? '/';
  const tourFile = ui.dataset.tourFile ?? '/components/existing-products/';
  const files = JSON.parse(ui.dataset.files ?? '[]') as { name: string; href: string }[];
  const here = location.pathname;
  const onHome = here === home || here === `${home}index.html`;
  const onTourFile = here === tourFile;

  /* ---------- Tour ---------- */
  type Step = { target: string; page: 'home' | 'file'; title: string; text: string; fold?: string };
  // The owner's words from the v3 template. Step 5 leaves out "Same sheet, no reload": each step is its own page here.
  const steps: Step[] = [
    { target: 'guide', page: 'home', title: 'Hi, I’m the guide.', text: 'The bubble with eyes. Give me a minute and I’ll show you around. After that I sit up here as Ask the toolkit.' },
    { target: 'drawer', page: 'home', title: 'This is your drawer.', text: 'Each folder is a way of reading the people you design for. India isn’t one default user, so the kit starts from real, varied people instead of an assumed executive.' },
    {
      target: 'drawer',
      page: 'home',
      fold: 'existing-products',
      title: fine.matches ? 'Hover to peek.' : 'Tap to peek.',
      text: fine.matches
        ? 'Point at a folder and the ones above it slide up while a preview opens. Click to open the file.'
        : 'Tap a folder and the ones above it slide up while a preview opens. Tap “Open file” to go in.',
    },
    { target: 'paper', page: 'file', title: 'A folder becomes paper.', text: 'Overview, pictures, downloads and steps sit on one punched sheet. The side tabs hop to the other tools.' },
    { target: 'strip', page: 'file', title: 'Scroll the steps.', text: 'Each card is one tool inside the folder. Click one and only what is below changes.' },
    { target: 'search', page: 'file', title: 'Find a tool.', text: 'Type a name and jump straight to it.' },
    { target: 'guide', page: 'file', title: 'That’s me again.', text: 'Click me any time to ask the toolkit a question. I might pipe up now and then, too.' },
  ];
  const KEY = 'bte-tour';
  const DONE = 'bte-tour-done';
  const root = ui.querySelector<HTMLElement>('[data-tour-root]')!;
  const spot = ui.querySelector<HTMLElement>('[data-tour-spot]')!;
  const card = ui.querySelector<HTMLElement>('[data-tour-card]')!;
  const title = ui.querySelector<HTMLElement>('[data-tour-title]')!;
  const text = ui.querySelector<HTMLElement>('[data-tour-text]')!;
  const no = ui.querySelector<HTMLElement>('[data-tour-no]')!;
  const live = ui.querySelector<HTMLElement>('[data-tour-live]')!;
  const dots = ui.querySelector<HTMLOListElement>('[data-tour-dots]')!;
  const back = ui.querySelector<HTMLButtonElement>('[data-tour-back]')!;
  const next = ui.querySelector<HTMLButtonElement>('[data-tour-next]')!;
  const pad = (n: number) => String(n).padStart(2, '0');
  ui.querySelector<HTMLElement>('[data-tour-total]')!.textContent = pad(steps.length);
  dots.replaceChildren(...steps.map(() => document.createElement('li')));

  let step = -1;
  let inerted: HTMLElement[] = [];

  // The first one that is showing (the search box on large screens, the magnifier on phones).
  const targetOf = (s: Step) => [...document.querySelectorAll<HTMLElement>(`[data-tour="${s.target}"]`)].find((el) => el.getClientRects().length) ?? null;
  const pageOf = (s: Step) => (s.page === 'home' ? home : tourFile);
  const onPage = (s: Step) => (s.page === 'home' ? onHome : onTourFile);

  function measure() {
    if (step < 0) return;
    const el = targetOf(steps[step]);
    if (!el) {
      Object.assign(spot.style, { left: '50%', top: '50%', width: '0px', height: '0px' });
      return;
    }
    const r = el.getBoundingClientRect();
    const t = Math.max(r.top - 8, 4);
    const b = Math.min(r.bottom + 8, innerHeight - 4);
    Object.assign(spot.style, {
      left: `${Math.max(r.left - 8, 4)}px`,
      top: `${t}px`,
      width: `${Math.min(r.width + 16, innerWidth - 8)}px`,
      height: `${Math.max(b - t, 40)}px`,
    });
    // On large screens the card sits top right; if that covers the part being shown and there is room under it,
    // the card moves to the bottom right instead.
    card.classList.remove('low');
    if (innerWidth >= 768) {
      const c = card.getBoundingClientRect();
      const covers = c.left < r.right && c.right > r.left && c.top < b && c.bottom > t;
      if (covers && b + c.height + 32 < innerHeight) card.classList.add('low');
    }
  }
  let mFrame = 0;
  const remeasure = () => {
    if (mFrame) return;
    mFrame = requestAnimationFrame(() => {
      mFrame = 0;
      measure();
    });
  };

  function lockPage(on: boolean) {
    if (on) {
      inerted = [...document.body.children].filter((el): el is HTMLElement => el instanceof HTMLElement && !el.contains(ui!) && !el.inert);
      inerted.forEach((el) => (el.inert = true));
      // The guide UI lives in the body too; only its tour part should be reachable.
      ui!.querySelector<HTMLElement>('[data-nudge]')!.hidden = true;
    } else {
      inerted.forEach((el) => (el.inert = false));
      inerted = [];
    }
  }

  function show(i: number, focusTitle: boolean) {
    const s = steps[i];
    if (!onPage(s)) {
      session.set(KEY, String(i));
      location.assign(pageOf(s));
      return;
    }
    step = i;
    session.set(KEY, String(i));
    if (root.hidden) {
      root.hidden = false;
      lockPage(true);
    }
    if (s.fold) document.dispatchEvent(new CustomEvent('bte:fold', { detail: s.fold }));
    no.textContent = pad(i + 1);
    title.textContent = s.title;
    text.textContent = s.text;
    [...dots.children].forEach((d, k) => d.classList.toggle('on', k === i));
    back.disabled = i === 0;
    next.textContent = i === steps.length - 1 ? 'Done' : 'Next';
    live.textContent = `Step ${i + 1} of ${steps.length}. ${s.title} ${s.text}`;
    const el = targetOf(s);
    if (el && !el.closest('.site-header')) {
      const header = document.querySelector('.site-header')?.getBoundingClientRect().height ?? 72;
      scrollTo({ top: Math.max(0, el.getBoundingClientRect().top + scrollY - header - 24), behavior: 'auto' });
    } else if (el) {
      scrollTo({ top: 0, behavior: 'auto' });
    }
    measure();
    // Folders and the sheet animate open; measure again once they have settled.
    setTimeout(measure, 120);
    setTimeout(measure, 600);
    if (focusTitle) title.focus();
  }

  function end() {
    step = -1;
    session.set(KEY, null);
    local.set(DONE, '1');
    root.hidden = true;
    lockPage(false);
    document.querySelector<HTMLElement>('[data-tour="guide"]')?.focus();
    idle.reset();
  }

  function start() {
    session.set(KEY, '0');
    if (!onHome) location.assign(home);
    else show(0, true);
  }

  next.addEventListener('click', () => (step >= steps.length - 1 ? end() : show(step + 1, false)));
  back.addEventListener('click', () => step > 0 && show(step - 1, false));
  ui.querySelector('[data-tour-skip]')!.addEventListener('click', end);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      end();
    }
    if (e.key === 'Tab') {
      // Keep the keyboard inside the tour card while it is open.
      const f = [...card.querySelectorAll<HTMLElement>('button:not(:disabled)')];
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === title)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
  addEventListener('scroll', remeasure, { passive: true });
  addEventListener('resize', remeasure);

  document.querySelectorAll<HTMLButtonElement>('[data-tour-start]').forEach((b) => {
    b.hidden = false;
    b.addEventListener('click', start);
  });

  /* ---------- Nudges: one short suggestion after a while of stillness, at most three a visit ---------- */
  const nudge = ui.querySelector<HTMLElement>('[data-nudge]')!;
  const nText = ui.querySelector<HTMLElement>('[data-nudge-text]')!;
  const nGo = ui.querySelector<HTMLAnchorElement>('[data-nudge-go]')!;
  const COUNT = 'bte-nudges';
  const fileIndex = files.findIndex((f) => here.startsWith(f.href));
  let hideTimer = 0;

  function place() {
    // Point the bubble's arrow at the guide.
    const g = document.querySelector<HTMLElement>('[data-tour="guide"]');
    if (!g) return;
    const r = g.getBoundingClientRect();
    const right = Math.max(8, innerWidth - r.right - 8);
    nudge.style.setProperty('--nudge-r', `${right}px`);
    nudge.style.setProperty('--nudge-arrow', `${Math.max(12, r.width / 2 + 8 - 7)}px`);
  }

  function hideNudge() {
    clearTimeout(hideTimer);
    nudge.hidden = true;
  }

  function busy() {
    const a = document.activeElement as HTMLElement | null;
    return (
      step >= 0 ||
      /\/ask\/?$/.test(here) ||
      document.hidden ||
      !!document.querySelector('#chat-panel:not([hidden]), dialog[open], details.menu[open]') ||
      !!(a && (a.matches('input, textarea, select') || a.isContentEditable))
    );
  }

  function pipeUp() {
    const n = Number(session.get(COUNT) ?? '0');
    if (n >= 3 || busy()) return;
    // Every other time, offer the chat. Otherwise suggest a folder: a first one on the home page, the next one in a file.
    const chat = n % 2 === 1 || (!onHome && fileIndex < 0);
    if (chat) {
      nText.textContent = 'Questions about a tool or a step? Ask me.';
      nGo.textContent = 'Ask the toolkit';
      nGo.href = `${home}ask/`;
      nGo.dataset.chat = '1';
    } else {
      const to = onHome ? files[1] : files[(fileIndex + 1) % files.length];
      nText.textContent = onHome ? `Not sure where to start? ${to.name} is a good first folder.` : `Done here? Next up: ${to.name}.`;
      nGo.textContent = 'Open it';
      nGo.href = to.href;
      delete nGo.dataset.chat;
    }
    session.set(COUNT, String(n + 1));
    place();
    nudge.hidden = false;
    hideTimer = window.setTimeout(() => {
      if (!nudge.matches(':hover, :focus-within')) hideNudge();
    }, 10000);
  }

  nGo.addEventListener('click', (e) => {
    if (nGo.dataset.chat) {
      e.preventDefault();
      document.dispatchEvent(new CustomEvent('bte:ask-open'));
    }
    hideNudge();
  });
  ui.querySelector('[data-nudge-dismiss]')!.addEventListener('click', () => {
    hideNudge();
    document.querySelector<HTMLElement>('[data-tour="guide"]')?.focus();
  });
  nudge.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hideNudge();
  });
  nudge.addEventListener('mouseleave', () => {
    clearTimeout(hideTimer);
    hideTimer = window.setTimeout(hideNudge, 4000);
  });

  const idle = {
    t: 0,
    reset() {
      clearTimeout(idle.t);
      if (step >= 0 || Number(session.get(COUNT) ?? '0') >= 3) return;
      idle.t = window.setTimeout(pipeUp, 25000);
    },
  };
  ['pointermove', 'keydown', 'scroll', 'click', 'touchstart'].forEach((k) => addEventListener(k, () => step < 0 && idle.reset(), { capture: true, passive: true }));

  /* ---------- Start: carry on a tour from the last page, or begin one on a first visit to the home page ---------- */
  const saved = session.get(KEY);
  if (saved !== null && steps[Number(saved)]) {
    const i = Number(saved);
    if (onPage(steps[i])) show(i, true);
    else session.set(KEY, null);
  } else if (onHome && !local.get(DONE) && !/[?&]notour\b/.test(location.search)) {
    setTimeout(() => step < 0 && show(0, true), 900);
  } else {
    idle.reset();
  }
}
