/**
 * spacing.ts
 * ----------------------------------------------------------------------------
 * WHY a scale instead of arbitrary numbers:
 * If every component picks its own padding (14, 15, 18, 20...) your app will
 * feel "almost aligned but not quite" — the exact bug that makes hobby apps
 * look like hobby apps. A fixed 4px-based scale forces every gap in the app
 * onto a shared rhythm, which is what makes Linear/Notion/Arc feel precise.
 *
 * WHY base-4 specifically:
 * 4px divides cleanly into common screen widths and matches iOS/Android's
 * native spacing conventions, so things line up on real devices without
 * sub-pixel rounding issues.
 */

export const spacing = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,   // default screen horizontal padding, card padding
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  huge: 56,
} as const;

export type Spacing = typeof spacing;