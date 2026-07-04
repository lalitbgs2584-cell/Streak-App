import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Bell, ChevronRight, Plus, Sparkles } from 'lucide-react-native';
import { Screen } from '@/components/layout/Screen';
import {
  AccentPill,
  HabitBadge,
  ScreenTitle,
  WEEKDAY_SHORT,
  getHabitColor,
} from '@/lib/mock/habit-ui';
import { theme } from '@/lib/theme';
import { useHabits } from '@/lib/hooks/use-habits';

export default function TodayScreen() {
  const router = useRouter();
  const { habits, loading } = useHabits();
  const completedCount = habits.filter((habit) => habit.completed).length;
  const progress = habits.length ? Math.round((completedCount / habits.length) * 100) : 0;
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Screen padded={false} edges={['top', 'bottom']}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Today</Text>
            <Text style={styles.subtitle}>{currentDate}</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity activeOpacity={0.85} style={styles.iconButton}>
              <Bell size={18} color={theme.colors.text.primary} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.85} style={styles.addButton} onPress={() => router.push('/new-habit')}>
              <Plus size={18} color={theme.colors.accent.text} strokeWidth={3} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.calendarCard}>
          <View style={styles.calendarTopRow}>
            <Text style={styles.calendarLabel}>Mon, May 3</Text>
            <AccentPill label="3 reminders" active />
          </View>
          <View style={styles.weekStrip}>
            {WEEKDAY_SHORT.map((day, index) => (
              <View key={`${day}-${index}`} style={[styles.weekDay, index === 1 && styles.weekDayActive]}>
                <Text style={[styles.weekDayLabel, index === 1 && styles.weekDayLabelActive]}>{day}</Text>
                <Text style={[styles.weekDayNumber, index === 1 && styles.weekDayNumberActive]}>{index + 1}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressCopy}>
            <Text style={styles.sectionKicker}>Today&apos;s Progress</Text>
            <Text style={styles.progressTitle}>
              {completedCount} / {habits.length} habits completed
            </Text>
            <Text style={styles.progressSubtitle}>Keep the streak alive and stay on the path.</Text>
          </View>
          <View style={styles.progressBarTrack}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
          </View>
        </View>

        <ScreenTitle
          title="Habits"
          subtitle="Tap a card to open habit detail"
          right={<ChevronRight size={18} color={theme.colors.text.tertiary} />}
        />

        <View style={styles.listWrap}>
          {loading ? (
            <View style={styles.loadingCard}>
              <Text style={styles.loadingText}>Loading your habits...</Text>
            </View>
          ) : habits.length ? habits.map((habit) => (
            <TouchableOpacity
              key={habit.id}
              activeOpacity={0.85}
              onPress={() => router.push({ pathname: '/(tabs)/today/[id]', params: { id: habit.id } })}
              style={styles.habitRow}
            >
              <HabitBadge category={habit.category} size={54} />
              <View style={styles.habitBody}>
                <Text style={styles.habitTitle}>{habit.title}</Text>
                <Text style={styles.habitSubtitle}>{habit.subtitle}</Text>
                <View style={styles.metaRow}>
                  <AccentPill label={habit.reminder} active={habit.completed} />
                  <Text style={styles.timeText}>{habit.time}</Text>
                </View>
              </View>
              <View style={styles.habitRight}>
                <View style={[styles.streakChip, { borderColor: getHabitColor(habit.category) }]}>
                  <Text style={styles.streakNumber}>{habit.streak}</Text>
                  <Text style={styles.streakLabel}>streak</Text>
                </View>
                {habit.completed ? (
                  <View style={styles.completedDot}>
                    <Sparkles size={14} color={theme.colors.accent.text} />
                  </View>
                ) : null}
              </View>
            </TouchableOpacity>
          )) : (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>No habits yet</Text>
              <Text style={styles.emptyText}>Create your first habit and it will appear here.</Text>
              <TouchableOpacity style={styles.emptyButton} activeOpacity={0.85} onPress={() => router.push('/new-habit')}>
                <Text style={styles.emptyButtonText}>Create Habit</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: theme.spacing.base,
    paddingBottom: theme.spacing.xxl,
    gap: theme.spacing.base,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.sm,
  },
  title: {
    ...theme.typography.display,
    color: theme.colors.text.primary,
  },
  subtitle: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginTop: 4,
  },
  headerActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.surface.card,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.accent.DEFAULT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarCard: {
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    padding: theme.spacing.base,
    gap: theme.spacing.md,
  },
  calendarTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  calendarLabel: {
    ...theme.typography.heading,
    color: theme.colors.text.primary,
  },
  weekStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  weekDay: {
    width: 40,
    height: 56,
    borderRadius: theme.radius.md,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  weekDayActive: {
    backgroundColor: theme.colors.accent.muted,
    borderColor: theme.colors.accent.DEFAULT,
  },
  weekDayLabel: {
    ...theme.typography.label,
    color: theme.colors.text.secondary,
  },
  weekDayLabelActive: {
    color: theme.colors.accent.DEFAULT,
  },
  weekDayNumber: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text.primary,
  },
  weekDayNumberActive: {
    color: theme.colors.accent.DEFAULT,
  },
  progressCard: {
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    padding: theme.spacing.base,
    gap: theme.spacing.md,
  },
  progressCopy: {
    gap: 6,
  },
  sectionKicker: {
    ...theme.typography.overline,
    color: theme.colors.text.tertiary,
  },
  progressTitle: {
    ...theme.typography.heading,
    color: theme.colors.text.primary,
  },
  progressSubtitle: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  progressBarTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.06)',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: theme.colors.accent.DEFAULT,
  },
  loadingCard: {
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    padding: theme.spacing.base,
  },
  loadingText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },
  listWrap: {
    gap: theme.spacing.sm,
  },
  habitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    padding: theme.spacing.md,
  },
  habitBody: {
    flex: 1,
    gap: 4,
  },
  habitTitle: {
    ...theme.typography.subheading,
    color: theme.colors.text.primary,
  },
  habitSubtitle: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginTop: 4,
  },
  timeText: {
    ...theme.typography.caption,
    color: theme.colors.text.tertiary,
  },
  habitRight: {
    alignItems: 'flex-end',
    gap: 8,
  },
  streakChip: {
    minWidth: 62,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  streakNumber: {
    ...theme.typography.heading,
    color: theme.colors.text.primary,
  },
  streakLabel: {
    ...theme.typography.label,
    color: theme.colors.text.secondary,
    marginTop: -2,
  },
  completedDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: theme.colors.accent.DEFAULT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCard: {
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    padding: theme.spacing.base,
    gap: 8,
  },
  emptyTitle: {
    ...theme.typography.heading,
    color: theme.colors.text.primary,
  },
  emptyText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },
  emptyButton: {
    height: 48,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.accent.DEFAULT,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  emptyButtonText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.accent.text,
  },
});
