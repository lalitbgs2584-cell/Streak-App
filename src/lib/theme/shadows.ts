/**
 * shadows.ts
 * ----------------------------------------------------------------------------
 * WHY this needs its own file: React Native shadows are annoying — iOS uses
 * shadowColor/Offset/Opacity/Radius, Android only respects `elevation`. If
 * you write that block by hand in every Card component, you'll get visibly
 * inconsistent depth across screens. Define it once per "level," per platform,
 * and spread it: `style={[styles.card, shadows.md]}`.
 *
 * On a near-black background, soft dark shadows barely read — so the card
 * "lift" in this design comes mostly from the surface color being lighter
 * than the background (see colors.surface), with shadows adding a subtle
 * assist. The one place a strong shadow matters is the accent button glow.
 */

import { Platform } from 'react-native';
import { colors } from './colors';

const shadow = (
  opacity: number,
  radius: number,
  elevation: number,
  color: string = '#000000',
) =>
  Platform.select({
    ios: {
      shadowColor: color,
      shadowOffset: { width: 0, height: radius / 2 },
      shadowOpacity: opacity,
      shadowRadius: radius,
    },
    android: { elevation },
    default: {},
  });

export const shadows = {
  none: {},
  sm: shadow(0.2, 4, 2),
  md: shadow(0.3, 10, 5),
  lg: shadow(0.35, 20, 10),
  // Glow used behind the primary accent button / FAB — this is what makes
  // the lime button feel "lit up" against the dark background.
  accentGlow: shadow(0.5, 16, 8, colors.accent.glow),
} as const;

export type Shadows = typeof shadows;