/**
 * theme/index.ts
 * ----------------------------------------------------------------------------
 * WHY combine everything into one `theme` object instead of importing
 * colors/spacing/radius separately everywhere:
 * 1. One import line in every component: `import { theme } from '@/theme'`.
 * 2. Sets up a clean seam for a future ThemeProvider — right now `theme` is
 *    a static constant, but later you can make it a value returned by
 *    `useTheme()` (for light mode / AMOLED mode) WITHOUT changing a single
 *    component's styles, because they already read from `theme.colors...`
 *    rather than importing `colors` directly.
 *
 * RULE going forward: components import from '@/theme', never from
 * './colors' or './spacing' directly. That single discipline is what makes
 * theme-switching possible later without a rewrite.
 */

import { colors } from './colors';
import { spacing } from './spacing';
import { radius } from './radius';
import { typography, fontFamily, fontWeight } from './typography';
import { shadows } from './shadows';
import { gradients } from './gradients';

export const theme = {
  colors,
  spacing,
  radius,
  typography,
  fontFamily,
  fontWeight,
  shadows,
  gradients,
} as const;

export type Theme = typeof theme;

// Re-exported individually too, for the rare case a util file needs just
// one slice (e.g. a chart lib that wants a raw hex, not the full theme).
export { colors, spacing, radius, typography, fontFamily, fontWeight, shadows, gradients };