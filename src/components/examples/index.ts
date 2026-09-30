import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import Ex204 from './Ex204.astro';
import Ex207 from './Ex207.astro';
import Ex210 from './Ex210.astro';
import Ex213 from './Ex213.astro';
import Ex305 from './Ex305.astro';
import Ex306 from './Ex306.astro';
import Ex315 from './Ex315.astro';
import Ex318 from './Ex318.astro';
import Ex321 from './Ex321.astro';
import Ex323 from './Ex323.astro';
import Ex407 from './Ex407.astro';
import Ex409 from './Ex409.astro';
import Ex412 from './Ex412.astro';
import Ex414 from './Ex414.astro';
import Ex417 from './Ex417.astro';
import Ex420 from './Ex420.astro';

// Booklet page id → the native (HTML) version of that filled example.
// A page without an entry falls back to the booklet's page image. Component 1 has none: in the final
// booklet its pages are templates with the example written into the fields. 3.09 and 3.11, the Translate
// examples that changed in the final booklet, are page images until they are rebuilt.
export const nativeExamples: Record<string, AstroComponentFactory> = {
  '2.04': Ex204,
  '2.07': Ex207,
  '2.10': Ex210,
  '2.13': Ex213,
  '3.05': Ex305,
  '3.06': Ex306,
  '3.15': Ex315,
  '3.18': Ex318,
  '3.21': Ex321,
  '3.23': Ex323,
  '4.07': Ex407,
  '4.09': Ex409,
  '4.12': Ex412,
  '4.14': Ex414,
  '4.17': Ex417,
  '4.20': Ex420,
};
