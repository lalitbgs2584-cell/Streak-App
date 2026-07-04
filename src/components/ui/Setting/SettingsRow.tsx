/**
 * SettingsRow.tsx
 * WHY `value` and `valueColor` are separate props: most rows show a plain
 * gray value ("Default", "English"), but "Granted" is shown in the accent
 * green — a status, not just info. Rather than hardcoding that logic here,
 * the SCREEN decides the color per-row (see settings.tsx config), keeping
 * this component dumb and reusable for any row type.
 *
 * WHY it renders a bottom border instead of each Section adding gaps:
 * matches the reference exactly — rows inside one card are separated by
 * hairlines, not by spacing. The LAST row in a section should have no
 * border, so `isLast` suppresses it.
 */
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { ChevronRight, LucideIcon } from 'lucide-react-native';
import { theme } from '@/lib/theme';


type Props = {
  icon: LucideIcon;
  label: string;
  value?: string;
  valueColor?: string;
  isLast?: boolean;
  onPress: () => void;
};

export function SettingsRow({ icon: Icon, label, value, valueColor, isLast, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        !isLast && styles.divider,
        pressed && styles.pressed,
      ]}
    >
      <Icon size={18} color={theme.colors.text.secondary} />
      <Text style={styles.label}>{label}</Text>
      <View style={styles.right}>
        {value ? (
          <Text style={[styles.value, valueColor ? { color: valueColor } : null]}>{value}</Text>
        ) : null}
        <ChevronRight size={18} color={theme.colors.text.tertiary} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.base,
    paddingHorizontal: theme.spacing.base,
  },
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.surface.border,
  },
  pressed: { backgroundColor: theme.colors.surface.cardElevated },
  label: { flex: 1, ...theme.typography.body, color: theme.colors.text.primary },
  right: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.xs },
  value: { ...theme.typography.caption, color: theme.colors.text.secondary },
});