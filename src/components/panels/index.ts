import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import MissionsPanel from './MissionsPanel.astro';
import ReverseThickTranslation from './ReverseThickTranslation.astro';

// Extra tabs on a tool page: "<component>/<tool slug>/<panel id>" → the component that fills it.
// A panel a tool lists in its data but that has no entry here is left out.
export const toolPanels: Record<string, AstroComponentFactory> = {
  'visual-culture/show/missions': MissionsPanel,
  'language/translate/reverse': ReverseThickTranslation,
};
