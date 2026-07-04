/**
 * gradients.ts
 * ----------------------------------------------------------------------------
 * There's no CSS `background: linear-gradient()` in React Native. Gradients
 * are rendered with the `expo-linear-gradient` component, which takes a
 * `colors` array + `start`/`end` points as props. This file centralizes
 * those arrays so `<AppBackground>` and illustration cards all pull from
 * the same definitions instead of each screen inventing its own gradient.
 *
 * npx expo install expo-linear-gradient
 */

import { colors } from './colors';

type GradientDef = {
  colors: [string, string, ...string[]];
  start: { x: number; y: number };
  end: { x: number; y: number };
};

export const gradients: Record<string, GradientDef> = {
  // The app-wide background used behind every screen via <AppBackground>.
  appBackground: {
    colors: [colors.background.primary, colors.background.secondary],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  // Onboarding / empty-state illustration panels (purple wash, screens 1 & 17).
  illustrationPurple: {
    colors: [colors.illustration.purpleTop, colors.illustration.purpleBottom],
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },
  // Streak-detail illustration panel (warm wash, screen 10).
  illustrationWarm: {
    colors: [colors.illustration.warmTop, colors.illustration.warmBottom],
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },
  // Subtle sheen on the primary accent button — keeps it from looking like a
  // flat sticker of color.
  accentButton: {
    colors: [colors.accent.DEFAULT, colors.accent.pressed],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
};

export type Gradients = typeof gradients;