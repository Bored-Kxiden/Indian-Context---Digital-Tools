// Keyword tips (D43): the pop-ups open on hover and focus with CSS alone. This adds what CSS can't:
// tap or click to keep one open, Escape to close it (even while the pointer is over it), and nudging it
// sideways so it never runs off the screen.

const marks = [...document.querySelectorAll<HTMLElement>('.kw')];
if (marks.length) {
  const close = (except?: HTMLElement) =>
    marks.forEach((k) => {
      if (k !== except) k.querySelector('.kw-b')?.setAttribute('aria-expanded', 'false');
    });
  const place = (k: HTMLElement) => {
    const p = k.querySelector<HTMLElement>('.kw-p');
    if (!p) return;
    k.style.removeProperty('--kw-dx');
    const r = p.getBoundingClientRect(); // reading it lays the page out with the pop-up in its natural place
    if (!r.width) return;
    const over = r.right - (document.documentElement.clientWidth - 16);
    if (over > 0) k.style.setProperty('--kw-dx', `${-Math.min(over, r.left - 16)}px`);
  };
  for (const k of marks) {
    const b = k.querySelector<HTMLButtonElement>('.kw-b');
    if (!b) continue;
    k.addEventListener('mouseenter', () => place(k));
    k.addEventListener('focusin', () => place(k));
    k.addEventListener('mouseleave', () => k.classList.remove('kw--off'));
    k.addEventListener('focusout', (e) => {
      if (!k.contains(e.relatedTarget as Node)) k.classList.remove('kw--off');
    });
    b.addEventListener('click', () => {
      const open = b.getAttribute('aria-expanded') !== 'true';
      close(k);
      b.setAttribute('aria-expanded', String(open));
      k.classList.toggle('kw--off', !open);
      if (open) place(k);
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const shown = marks.filter((k) => k.matches(':hover, :focus-within') || k.querySelector('[aria-expanded="true"]'));
    if (!shown.length) return;
    close();
    shown.forEach((k) => k.classList.add('kw--off'));
  });
  document.addEventListener('click', (e) => {
    if (!(e.target as HTMLElement).closest('.kw')) close();
  });
}
