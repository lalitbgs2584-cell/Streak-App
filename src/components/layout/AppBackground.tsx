/**
 * AppBackground.tsx
 * ----------------------------------------------------------------------------
 * WHY this exists as its own component instead of styling RootLayout
 * directly:
 * Separation of concerns — RootLayout's job is to set up providers
 * (theme, auth, query client, navigation). AppBackground's ONLY job is
 * "paint the screen behind everything." Keeping it separate means you can
 * unit-test / Storybook it alone, and swap it (e.g. add a noise texture,
 * or an animated gradient) without touching navigation code.
 *
 * WHY `position: absolute` + `StyleSheet.absoluteFillObject` instead of
 * just making it the root View:
 * We want the gradient to sit BEHIND the navigator, not wrap it as a normal
 * parent in the layout flow. Absolute-fill pins it to fill the screen
 * regardless of what's rendered as siblings, so it never affects layout
 * measurements of the content on top.
 *
 * This is the ONLY place in your entire app that references
 * `theme.gradients.appBackground`. Change the mood of the whole app (e.g.
 * swap purple-black for the warm gradient) by editing gradients.ts — this
 * file and every screen stay untouched.
 */

import React, { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '@/lib/theme';


export function AppBackground({ children }: PropsWithChildren) {
  return (
    <View style={styles.root}>
      <LinearGradient
        colors={theme.gradients.appBackground.colors}
        start={theme.gradients.appBackground.start}
        end={theme.gradients.appBackground.end}
        style={StyleSheet.absoluteFill}
      />
      {/* Content (the navigator) renders on top, with a transparent bg */}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background.primary, // fallback if gradient hasn't painted yet
  },
  content: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});