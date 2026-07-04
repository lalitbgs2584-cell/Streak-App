/**
 * SettingsSection.tsx
 * WHY: the "NOTIFICATIONS" / "PREFERENCES" / "MORE" grouping pattern
 * (label above, rounded card below containing rows with dividers) repeats
 * 3x in this one screen alone. One component = one place to fix the
 * card radius/padding if it's off.
 */
import { theme } from '@/lib/theme';
import React, { PropsWithChildren } from 'react';
import { View, Text, StyleSheet } from 'react-native';


export function SettingsSection({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{title}</Text>
      <View style={styles.card}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: theme.spacing.xl },
  label: {
    ...theme.typography.overline,
    color: theme.colors.text.tertiary,
    marginBottom: theme.spacing.sm,
    marginLeft: theme.spacing.xs,
  },
  card: {
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
  },
});