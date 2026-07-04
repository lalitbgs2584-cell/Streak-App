import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { CalendarDays, ChevronRight, Flame } from 'lucide-react-native';
import { Screen } from '@/components/layout/Screen';
import { ScreenTitle, WEEKDAY_SHORT } from '@/lib/mock/habit-ui';
import { theme } from '@/lib/theme';
import { useHabits } from '@/lib/hooks/use-habits';
import { getHabitLogs, getHistorySummary } from '@/lib/habits/storage';

export default function HistoryScreen() {
  const router = useRouter();
  const { habits } = useHabits();
  const [completedDates, setCompletedDates] = React.useState<string[]>([]);
  const [summary, setSummary] = React.useState({ bestStreak: 0, completionRate: 0, totalCompleted: 0 });

  React.useEffect(() => {
    let active = true;

    const load = async () => {
      const logs = await Promise.all(habits.map((habit) => getHabitLogs(habit.id)));
      const dates = logs.flat().filter((log) => log.status === 1).map((log) => log.completedDate);
      const nextSummary = await getHistorySummary();

      if (active) {
        setCompletedDates(Array.from(new Set(dates)));
        setSummary(nextSummary);
      }
    };

    void load();

    return () => {
      active = false;
    };
  }, [habits]);

  const now = new Date();
  const monthTitle = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const grid = [
    ...Array.from({ length: firstDayOfMonth }).map(() => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  const monthKey = now.toISOString().slice(0, 7);

  return (
    <Screen padded={false} edges={['top', 'bottom']}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <ScreenTitle
          title="History"
          subtitle="A simple calendar-style summary of completed days."
          right={
            <TouchableOpacity style={styles.iconButton} activeOpacity={0.85} onPress={() => router.push('/streak-detail')}>
              <ChevronRight size={18} color={theme.colors.text.primary} />
            </TouchableOpacity>
          }
        />

        <View style={styles.calendarCard}>
          <View style={styles.calendarHeader}>
            <Text style={styles.monthTitle}>{monthTitle}</Text>
            <View style={styles.monthBadge}>
              <CalendarDays size={16} color={theme.colors.accent.DEFAULT} />
              <Text style={styles.monthBadgeText}>Completion heatmap</Text>
            </View>
          </View>

          <View style={styles.weekRow}>
            {WEEKDAY_SHORT.map((label, index) => (
              <Text key={`weekday-${index}`} style={styles.weekLabel}>
                {label}
              </Text>
            ))}
          </View>

          <View style={styles.grid}>
            {grid.map((day, index) => {
              if (day === null) {
                return <View key={`empty-${index}`} style={styles.cell} />;
              }

              const isoDate = `${monthKey}-${String(day).padStart(2, '0')}`;
              const completed = completedDates.includes(isoDate);
              return (
                <View key={day} style={styles.cell}>
                  <View style={[styles.dayBubble, completed && styles.dayBubbleActive]}>
                    <Text style={[styles.dayText, completed && styles.dayTextActive]}>{day}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.sectionLabel}>Summary</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{summary.bestStreak} days</Text>
              <Text style={styles.summaryLabel}>Longest streak</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{summary.completionRate}%</Text>
              <Text style={styles.summaryLabel}>Completion rate</Text>
            </View>
          </View>
          <View style={styles.summaryHint}>
            <Flame size={16} color={theme.colors.accent.DEFAULT} />
            <Text style={styles.summaryHintText}>{summary.totalCompleted} logged completions across all habits.</Text>
          </View>
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
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: theme.colors.surface.card,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
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
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
  },
  monthTitle: {
    ...theme.typography.heading,
    color: theme.colors.text.primary,
  },
  monthBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: theme.colors.surface.cardElevated,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
  },
  monthBadgeText: {
    ...theme.typography.label,
    color: theme.colors.text.secondary,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weekLabel: {
    width: '14.2%',
    textAlign: 'center',
    ...theme.typography.label,
    color: theme.colors.text.tertiary,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: '14.28%',
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayBubble: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayBubbleActive: {
    backgroundColor: theme.colors.accent.DEFAULT,
    borderColor: theme.colors.accent.DEFAULT,
  },
  dayText: {
    ...theme.typography.label,
    color: theme.colors.text.primary,
  },
  dayTextActive: {
    color: theme.colors.accent.text,
  },
  summaryCard: {
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    padding: theme.spacing.base,
    gap: theme.spacing.base,
  },
  sectionLabel: {
    ...theme.typography.overline,
    color: theme.colors.text.tertiary,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  summaryItem: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    padding: theme.spacing.base,
    gap: 4,
  },
  summaryValue: {
    ...theme.typography.heading,
    color: theme.colors.text.primary,
  },
  summaryLabel: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  summaryHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  summaryHintText: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    flex: 1,
  },
});
