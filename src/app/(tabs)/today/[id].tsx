import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View,Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import {  ChevronLeft, EllipsisVertical, Flame, Pencil, Trash2, TimerReset } from 'lucide-react-native';
import { Screen } from '@/components/layout/Screen';
import {
  HabitBadge,
  MetricCard,
  getHabitColor,
  getHabitIcon,
} from '@/lib/mock/habit-ui';
import { theme } from '@/lib/theme';
import { useHabits } from '@/lib/hooks/use-habits';

export default function HabitDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const { getHabitById, toggleHabit, deleteHabit, loading } = useHabits();
  const habit = params.id ? getHabitById(params.id) : undefined;
  const accent = habit ? getHabitColor(habit.category) : theme.colors.accent.DEFAULT;

  if (loading && !habit) {
    return (
      <Screen padded={false} edges={['top', 'bottom']}>
        <View style={styles.loadingWrap}>
          <Text style={styles.loadingText}>Loading habit...</Text>
        </View>
      </Screen>
    );
  }

  if (!habit) {
    return (
      <Screen padded={false} edges={['top', 'bottom']}>
        <View style={styles.loadingWrap}>
          <Text style={styles.loadingText}>Habit not found.</Text>
          <TouchableOpacity style={styles.primaryButton} activeOpacity={0.85} onPress={() => router.replace('/(tabs)/today')}>
            <Text style={styles.primaryButtonText}>Back to Today</Text>
          </TouchableOpacity>
        </View>
      </Screen>
    );
  }

  return (
    <Screen padded={false} edges={['top', 'bottom']}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.85}>
            <ChevronLeft size={24} color={theme.colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Habit Detail</Text>
          <TouchableOpacity style={styles.backButton} activeOpacity={0.85}>
            <EllipsisVertical size={20} color={theme.colors.text.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.hero}>
          <HabitBadge category={habit.category} size={74} />
          <View style={styles.heroText}>
            <Text style={styles.heroTitle}>{habit.title}</Text>
            <Text style={styles.heroSubtitle}>{habit.subtitle}</Text>
            <View style={styles.heroMeta}>
              <View style={[styles.heroChip, { borderColor: accent }]}>
                {getHabitIcon(habit.category, 14, accent)}
                <Text style={[styles.heroChipText, { color: accent }]}>{habit.reminder}</Text>
              </View>
              <View style={styles.heroChip}>
                <Flame size={14} color={theme.colors.accent.DEFAULT} />
                <Text style={styles.heroChipText}>{habit.streak} day streak</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.metricsRow}>
          <MetricCard value={`${habit.streak}`} label="Current Streak" hint="days in a row" accent />
          <MetricCard value={`${habit.bestStreak}`} label="Best Streak" hint="all time" />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>About</Text>
          <Text style={styles.aboutText}>
            Stay hydrated and keep the streak going. This screen is wired for the habit detail route and can
            later receive the live record from the database.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Reminder Details</Text>
          <View style={styles.detailList}>
            <View style={styles.detailRow}>
              <Text style={styles.detailKey}>Reminder Time</Text>
              <Text style={styles.detailValue}>{habit.time}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailKey}>Frequency</Text>
              <Text style={styles.detailValue}>{habit.reminder}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailKey}>Notification ID</Text>
              <Text style={styles.detailValue}>{habit.notificationIds.length ? `${habit.notificationIds.length} stored` : 'Not scheduled'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.85}
            onPress={async () => {
              await toggleHabit(habit.id);
            }}
          >
            <Text style={styles.primaryButtonText}>{habit.completed ? 'Completed Today' : 'Mark as Done'}</Text>
          </TouchableOpacity>
          <View style={styles.secondaryRow}>
            <TouchableOpacity
              style={styles.secondaryButton}
              activeOpacity={0.85}
              onPress={() =>
                router.push({ pathname: '../../edit-habit/[id]', params: { id: habit.id } })
              }
            >
              <Pencil size={16} color={theme.colors.accent.DEFAULT} />
              <Text style={styles.secondaryButtonText}>Edit Habit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryButton}
              activeOpacity={0.85}
              onPress={async () => {
                Alert.alert('Delete Habit?', 'This will remove the habit and cancel only its reminders.', [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                      await deleteHabit(habit.id);
                      router.replace('/(tabs)/today');
                    },
                  },
                ]);
              }}
            >
              <Trash2 size={16} color={theme.colors.status.error} />
              <Text style={styles.secondaryButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.secondaryRow}>
            <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.85} onPress={() => router.push('/new-habit')}>
              <TimerReset size={16} color={theme.colors.accent.DEFAULT} />
              <Text style={styles.secondaryButtonText}>Reschedule</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.85} onPress={() => router.push('/streak-detail')}>
              <Text style={styles.secondaryButtonText}>Streak View</Text>
            </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.surface.card,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    ...theme.typography.heading,
    color: theme.colors.text.primary,
  },
  hero: {
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    padding: theme.spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  heroText: {
    flex: 1,
    gap: 4,
  },
  heroTitle: {
    ...theme.typography.heading,
    color: theme.colors.text.primary,
  },
  heroSubtitle: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },
  heroMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 6,
  },
  heroChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  heroChipText: {
    ...theme.typography.label,
    color: theme.colors.text.primary,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  card: {
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    padding: theme.spacing.base,
    gap: theme.spacing.sm,
  },
  sectionLabel: {
    ...theme.typography.overline,
    color: theme.colors.text.tertiary,
  },
  aboutText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },
  detailList: {
    gap: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailKey: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },
  detailValue: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text.primary,
  },
  actions: {
    gap: theme.spacing.sm,
  },
  primaryButton: {
    height: 52,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.accent.DEFAULT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.accent.text,
  },
  secondaryRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  secondaryButton: {
    flex: 1,
    height: 48,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    backgroundColor: theme.colors.surface.card,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  secondaryButtonText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text.primary,
  },
  loadingWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.base,
    gap: theme.spacing.sm,
  },
  loadingText: {
    ...theme.typography.heading,
    color: theme.colors.text.primary,
  },
});
