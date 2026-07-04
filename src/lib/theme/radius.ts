/**
 * radius.ts
 * ----------------------------------------------------------------------------
 * Looking at the reference: cards use one consistent large radius (~20px),
 * buttons/pills are fully rounded, icon containers use a smaller radius.
 * Three tiers cover every shape in the mockup — you rarely need more than
 * that, and having more just invites inconsistency.
 */

export const radius = {
  none: 0,
  sm: 10,    // small icon chips, badges
  md: 14,    // inputs, list rows
  lg: 20,    // cards (HabitCard, StatCard, StreakCard)
  xl: 28,    // large illustration cards, bottom sheets
  full: 999, // pill buttons, avatars, circular progress container
} as const;

export type Radius = typeof radius;