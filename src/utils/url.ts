// Prefixes site-internal paths with the configured base path (see astro.config.mjs),
// so links keep working on GitHub Pages sub-paths as well as on a domain root.
const base = import.meta.env.BASE_URL.replace(/\/+$/, '');

export function url(path = '/'): string {
  if (/^([a-z][a-z0-9+.-]*:|#|\/\/)/i.test(path)) return path;
  return base + (path.startsWith('/') ? path : `/${path}`);
}

/** True when `current` (a pathname) is `href` or inside it. */
export function isActive(current: string, href: string): boolean {
  const norm = (p: string) => p.replace(/\/+$/, '') || '/';
  const a = norm(current);
  const b = norm(url(href));
  return b === norm(url('/')) ? a === b : a === b || a.startsWith(`${b}/`);
}
