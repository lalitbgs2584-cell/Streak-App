/**
 * usage-example.tsx — NOT a real screen, just shows the pattern.
 * ----------------------------------------------------------------------------
 * Without NativeWind, the theme feeds StyleSheet.create() instead of
 * className strings. The discipline is the same: a component NEVER writes
 * a raw hex/number — it always reads `theme.xxx`.
 */

import { theme } from '@/lib/theme';
import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';


type Props = {
  children: string;
  onPress?: () => void;
  variant?: 'primary' | 'outline';
};

export function PrimaryButton({ children, onPress, variant = 'primary' }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        variant === 'primary' ? styles.primary : styles.outline,
        pressed && styles.pressed,
      ]}
    >
      <Text style={variant === 'primary' ? styles.textOnAccent : styles.textDefault}>
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  primary: {
    backgroundColor: theme.colors.accent.DEFAULT,
    ...theme.shadows.accentGlow,
  },
  outline: {
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    backgroundColor: 'transparent',
  },
  pressed: {
    opacity: 0.85,
  },
  textOnAccent: {
    color: theme.colors.accent.text,
    ...theme.typography.bodyMedium,
  },
  textDefault: {
    color: theme.colors.text.primary,
    ...theme.typography.bodyMedium,
  },
});

// Used exactly like your target API:
// <PrimaryButton onPress={...}>Add Habit</PrimaryButton>