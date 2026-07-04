import React from 'react';
import {
  Activity,
  Accessibility,
  Book,
  BookOpen,
  ChevronRight,
  Code as CodeIcon,
  Droplet,
  Flame,
  Footprints,
  GraduationCap,
  Moon,
  PlayCircle,
  Sparkles,
  Target,
  Utensils,
  WandSparkles,
} from 'lucide-react-native';
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '@/lib/theme';

export type HabitCategory = keyof typeof theme.colors.habit;

export type HabitPreview = {
  id: string;
  title: string;
  subtitle: string;
  reminder: string;
  time: string;
  streak: number;
  bestStreak: number;
  completed: boolean;
  category: HabitCategory;
  progress?: number;
};

export const WEEKDAY_SHORT = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
export const WEEKDAY_LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const TODAY_HABITS: HabitPreview[] = [
  {
    id: 'drink-water',
    title: 'Drink Water',
    subtitle: '8 glasses a day',
    reminder: 'Daily',
    time: '09:00 AM',
    streak: 12,
    bestStreak: 18,
    completed: true,
    category: 'water',
    progress: 0.75,
  },
  {
    id: 'code-hour',
    title: 'Code 1 Hour',
    subtitle: 'Daily focus block',
    reminder: 'Daily',
    time: '07:00 PM',
    streak: 7,
    bestStreak: 11,
    completed: true,
    category: 'code',
    progress: 0.66,
  },
  {
    id: 'read',
    title: 'Read',
    subtitle: '20 pages',
    reminder: 'Daily',
    time: '09:30 PM',
    streak: 9,
    bestStreak: 14,
    completed: false,
    category: 'read',
    progress: 0.33,
  },
  {
    id: 'workout',
    title: 'Workout',
    subtitle: '30 mins',
    reminder: 'Mon, Wed, Fri',
    time: '06:00 AM',
    streak: 5,
    bestStreak: 8,
    completed: true,
    category: 'workout',
    progress: 0.8,
  },
  {
    id: 'meditate',
    title: 'Meditate',
    subtitle: '10 mins',
    reminder: 'Daily',
    time: '10:00 PM',
    streak: 3,
    bestStreak: 6,
    completed: false,
    category: 'meditate',
    progress: 0.2,
  },
];

export const ALL_HABITS = [
  {
    id: 'drink-water',
    title: 'Drink Water',
    subtitle: 'Daily - 09:00 AM',
    streak: 12,
    category: 'water' as HabitCategory,
  },
  {
    id: 'code-hour',
    title: 'Code 1 Hour',
    subtitle: 'Daily - 07:00 PM',
    streak: 7,
    category: 'code' as HabitCategory,
  },
  {
    id: 'read',
    title: 'Read',
    subtitle: 'Daily - 09:30 PM',
    streak: 9,
    category: 'read' as HabitCategory,
  },
  {
    id: 'workout',
    title: 'Workout',
    subtitle: 'Mon, Wed, Fri - 06:00 AM',
    streak: 5,
    category: 'workout' as HabitCategory,
  },
  {
    id: 'meditate',
    title: 'Meditate',
    subtitle: 'Daily - 10:00 PM',
    streak: 3,
    category: 'meditate' as HabitCategory,
  },
];

export const HISTORY_COMPLETED_DATES = [3, 5, 11, 12, 15, 18, 19, 21, 25, 26, 28];

export const HISTORY_GRID = [
  null, null, null, null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
];

export const SELECTABLE_HABITS = [
  { id: 'water', label: 'Drink Water', icon: Droplet },
  { id: 'running', label: 'Run', icon: Flame },
  { id: 'read', label: 'Read', icon: BookOpen },
  { id: 'code', label: 'Code', icon: CodeIcon },
  { id: 'workout', label: 'Workout', icon: Activity },
  { id: 'meditate', label: 'Meditate', icon: Sparkles },
  { id: 'stretching', label: 'Stretch', icon: Accessibility },
  { id: 'custom', label: 'Custom', icon: WandSparkles },
];

export const SETTINGS_PROFILE = {
  name: 'Aarav Mehta',
  email: 'aarav@example.com',
  timeZone: 'Asia/Kolkata',
  language: 'English',
};

export const getHabitColor = (category: HabitCategory) => theme.colors.habit[category] ?? theme.colors.accent.DEFAULT;

export const getHabitIcon = (category: HabitCategory, size = 22, color = theme.colors.accent.DEFAULT) => {
  switch (category) {
    case 'water':
      return <Droplet size={size} color={color} />;
    case 'workout':
      return <Activity size={size} color={color} />;
    case 'read':
      return <BookOpen size={size} color={color} />;
    case 'meditate':
      return <Sparkles size={size} color={color} />;
    case 'running':
      return <Flame size={size} color={color} />;
    case 'sleep':
      return <Moon size={size} color={color} />;
    case 'journal':
      return <Book size={size} color={color} />;
    case 'study':
      return <GraduationCap size={size} color={color} />;
    case 'code':
      return <CodeIcon size={size} color={color} />;
    case 'eating':
      return <Utensils size={size} color={color} />;
    case 'walking':
      return <Footprints size={size} color={color} />;
    case 'stretching':
      return <Accessibility size={size} color={color} />;
    default:
      return <Target size={size} color={color} />;
  }
};

export function ScreenTitle({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <View style={styles.titleRow}>
      <View style={styles.titleCopy}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {right}
    </View>
  );
}

export function AccentPill({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <View style={[styles.pill, active && styles.pillActive]}>
      <Text style={[styles.pillText, active && styles.pillTextActive]}>{label}</Text>
    </View>
  );
}

export function MetricCard({
  value,
  label,
  hint,
  accent = false,
}: {
  value: string;
  label: string;
  hint?: string;
  accent?: boolean;
}) {
  return (
    <View style={[styles.metricCard, accent && styles.metricCardAccent]}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
      {hint ? <Text style={styles.metricHint}>{hint}</Text> : null}
    </View>
  );
}

export function HabitBadge({
  category,
  size = 52,
  gradient = [theme.colors.illustration.purpleTop, theme.colors.illustration.purpleBottom] as [string, string],
}: {
  category: HabitCategory;
  size?: number;
  gradient?: [string, string];
}) {
  const color = getHabitColor(category);
  return (
    <View style={[styles.badgeWrap, { width: size, height: size, borderRadius: size / 2 }]}>
      <LinearGradient colors={gradient} style={styles.badgeGradient}>
        <View style={[styles.badgeCore, { borderColor: color }]}>
          {getHabitIcon(category, Math.round(size * 0.42), color)}
        </View>
      </LinearGradient>
    </View>
  );
}

export function ActionChip({
  label,
  icon,
  onPress,
  active = false,
}: {
  label: string;
  icon?: React.ReactNode;
  onPress?: () => void;
  active?: boolean;
}) {
  const Wrapper = onPress ? TouchableOpacity : View;
  return (
    <Wrapper {...(onPress ? { onPress, activeOpacity: 0.85 } : null)} style={[styles.actionChip, active && styles.actionChipActive]}>
      {icon ? <View style={styles.actionChipIcon}>{icon}</View> : null}
      <Text style={[styles.actionChipText, active && styles.actionChipTextActive]}>{label}</Text>
    </Wrapper>
  );
}

export function ListRow({
  label,
  value,
  rightIcon,
  onPress,
  valueColor,
  compact = false,
}: {
  label: string;
  value?: string;
  rightIcon?: React.ReactNode;
  onPress?: () => void;
  valueColor?: string;
  compact?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.listRow, compact && styles.listRowCompact, pressed && styles.listRowPressed]}
    >
      <Text style={styles.listRowLabel}>{label}</Text>
      <View style={styles.listRowRight}>
        {value ? <Text style={[styles.listRowValue, valueColor ? { color: valueColor } : null]}>{value}</Text> : null}
        {rightIcon ?? <ChevronRight size={18} color={theme.colors.text.tertiary} />}
      </View>
    </Pressable>
  );
}

export function HeroCard({
  title,
  subtitle,
  children,
  gradient = [theme.colors.illustration.purpleTop, theme.colors.illustration.purpleBottom] as [string, string],
}: {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  gradient?: [string, string];
}) {
  return (
    <View style={styles.heroOuter}>
      <LinearGradient colors={gradient} style={styles.heroInner}>
        <View style={styles.heroGlowLeft} />
        <View style={styles.heroGlowRight} />
        <View style={styles.heroContent}>
          {title ? <Text style={styles.heroTitle}>{title}</Text> : null}
          {subtitle ? <Text style={styles.heroSubtitle}>{subtitle}</Text> : null}
          {children}
        </View>
      </LinearGradient>
    </View>
  );
}

export function EmptyState({ title, subtitle, actionLabel, onAction }: { title: string; subtitle: string; actionLabel: string; onAction?: () => void }) {
  return (
    <View style={styles.emptyWrap}>
      <HeroCard title={title} subtitle={subtitle}>
        <View style={styles.emptyIllustration}>
          <PlayCircle size={58} color={theme.colors.accent.DEFAULT} />
        </View>
        <TouchableOpacity onPress={onAction} activeOpacity={0.85} style={styles.emptyButton}>
          <Text style={styles.emptyButtonText}>{actionLabel}</Text>
        </TouchableOpacity>
      </HeroCard>
    </View>
  );
}

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  titleCopy: {
    flex: 1,
  },
  title: {
    ...theme.typography.title,
    color: theme.colors.text.primary,
  },
  subtitle: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginTop: 4,
  },
  pill: {
    minHeight: 28,
    borderRadius: 999,
    paddingHorizontal: 12,
    justifyContent: 'center',
    backgroundColor: theme.colors.surface.card,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
  },
  pillActive: {
    backgroundColor: theme.colors.accent.muted,
    borderColor: theme.colors.accent.DEFAULT,
  },
  pillText: {
    ...theme.typography.label,
    color: theme.colors.text.secondary,
  },
  pillTextActive: {
    color: theme.colors.accent.DEFAULT,
  },
  metricCard: {
    flex: 1,
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    padding: theme.spacing.base,
    gap: 4,
  },
  metricCardAccent: {
    borderColor: theme.colors.accent.DEFAULT,
    backgroundColor: 'rgba(198,255,79,0.06)',
  },
  metricLabel: {
    ...theme.typography.overline,
    color: theme.colors.text.tertiary,
  },
  metricValue: {
    ...theme.typography.heading,
    color: theme.colors.text.primary,
  },
  metricHint: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  badgeWrap: {
    overflow: 'hidden',
  },
  badgeGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeCore: {
    width: '72%',
    height: '72%',
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    minHeight: 38,
    borderRadius: 999,
    paddingHorizontal: 14,
    backgroundColor: theme.colors.surface.card,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
  },
  actionChipActive: {
    backgroundColor: theme.colors.accent.muted,
    borderColor: theme.colors.accent.DEFAULT,
  },
  actionChipIcon: {
    marginRight: 2,
  },
  actionChipText: {
    ...theme.typography.label,
    color: theme.colors.text.secondary,
  },
  actionChipTextActive: {
    color: theme.colors.accent.DEFAULT,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 52,
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.surface.border,
  },
  listRowCompact: {
    minHeight: 48,
  },
  listRowPressed: {
    backgroundColor: theme.colors.surface.cardElevated,
  },
  listRowLabel: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
    flex: 1,
  },
  listRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  listRowValue: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  heroOuter: {
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    backgroundColor: theme.colors.surface.card,
  },
  heroInner: {
    padding: theme.spacing.base,
    minHeight: 170,
  },
  heroGlowLeft: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(198,255,79,0.08)',
    top: -60,
    right: -30,
  },
  heroGlowRight: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.04)',
    left: -50,
    bottom: -60,
  },
  heroContent: {
    flex: 1,
    justifyContent: 'center',
    gap: theme.spacing.xs,
  },
  heroTitle: {
    ...theme.typography.heading,
    color: theme.colors.text.primary,
  },
  heroSubtitle: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },
  emptyWrap: {
    padding: theme.spacing.base,
  },
  emptyIllustration: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: theme.spacing.md,
  },
  emptyButton: {
    marginTop: theme.spacing.sm,
    backgroundColor: theme.colors.accent.DEFAULT,
    height: 48,
    borderRadius: theme.radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyButtonText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.accent.text,
  },
});
