import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import Ex106 from './Ex106.astro';
import Ex108 from './Ex108.astro';
import Ex111 from './Ex111.astro';
import Ex114 from './Ex114.astro';
import Ex116 from './Ex116.astro';
import Ex117 from './Ex117.astro';
import Ex120 from './Ex120.astro';
import Ex122 from './Ex122.astro';
import Ex204 from './Ex204.astro';
import Ex207 from './Ex207.astro';
import Ex210 from './Ex210.astro';
import Ex213 from './Ex213.astro';
import Ex305 from './Ex305.astro';
import Ex306 from './Ex306.astro';
import Ex309 from './Ex309.astro';
import Ex312 from './Ex312.astro';
import Ex315 from './Ex315.astro';
import Ex318 from './Ex318.astro';
import Ex320 from './Ex320.astro';
import Ex407 from './Ex407.astro';
import Ex409 from './Ex409.astro';
import Ex412 from './Ex412.astro';
import Ex414 from './Ex414.astro';
import Ex417 from './Ex417.astro';
import Ex420 from './Ex420.astro';

// Booklet page id → the native (HTML) version of that filled example.
// A page without an entry falls back to the booklet's page image.
export const nativeExamples: Record<string, AstroComponentFactory> = {
  '1.06': Ex106,
  '1.08': Ex108,
  '1.11': Ex111,
  '1.14': Ex114,
  '1.16': Ex116,
  '1.17': Ex117,
  '1.20': Ex120,
  '1.22': Ex122,
  '2.04': Ex204,
  '2.07': Ex207,
  '2.10': Ex210,
  '2.13': Ex213,
  '3.05': Ex305,
  '3.06': Ex306,
  '3.09': Ex309,
  '3.12': Ex312,
  '3.15': Ex315,
  '3.18': Ex318,
  '3.20': Ex320,
  '4.07': Ex407,
  '4.09': Ex409,
  '4.12': Ex412,
  '4.14': Ex414,
  '4.17': Ex417,
  '4.20': Ex420,
};
