import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { Screen } from '@/components/layout/Screen';
import {
  HabitBadge,
  ScreenTitle,
  getHabitColor,
} from '@/lib/mock/habit-ui';
import { theme } from '@/lib/theme';
import { useHabits } from '@/lib/hooks/use-habits';

export default function HabitsScreen() {
  const router = useRouter();
  const { habits, loading } = useHabits();

  return (
    <Screen padded={false} edges={['top', 'bottom']}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <ScreenTitle title="All Habits" subtitle="A compact view of every habit in the stack." />
          <TouchableOpacity style={styles.addButton} activeOpacity={0.85} onPress={() => router.push('../../new-habit')}>
            <Plus size={18} color={theme.colors.accent.text} strokeWidth={3} />
          </TouchableOpacity>
        </View>

        <View style={styles.heroCard}>
          <Text style={styles.heroKicker}>Database-aligned fields</Text>
          <Text style={styles.heroTitle}>Name, icon, reminder time, frequency, streak and status.</Text>
          <Text style={styles.heroSubtitle}>
            This screen mirrors the habit table layout with a cleaner, faster list layout.
          </Text>
        </View>

        <View style={styles.list}>
          {loading ? (
            <View style={styles.loadingCard}>
              <Text style={styles.loadingText}>Loading habits...</Text>
            </View>
          ) : habits.length ? habits.map((habit) => (
            <TouchableOpacity
              key={habit.id}
              activeOpacity={0.85}
              style={styles.habitCard}
              onPress={() => router.push({ pathname: '../today/[id]', params: { id: habit.id } })}
            >
              <HabitBadge category={habit.category} size={56} />
              <View style={styles.habitBody}>
                <Text style={styles.habitTitle}>{habit.title}</Text>
                <Text style={styles.habitSubtitle}>{habit.subtitle}</Text>
              </View>
              <View style={[styles.streakBadge, { borderColor: getHabitColor(habit.category) }]}>
                <Text style={styles.streakValue}>{habit.streak}</Text>
                <Text style={styles.streakLabel}>streak</Text>
              </View>
            </TouchableOpacity>
          )) : (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>No habits found</Text>
              <Text style={styles.emptyText}>Tap the plus button to create your first habit.</Text>
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
    alignItems: 'flex-end',
    gap: theme.spacing.sm,
    paddingTop: theme.spacing.sm,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.accent.DEFAULT,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  heroCard: {
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    padding: theme.spacing.base,
    gap: 6,
  },
  heroKicker: {
    ...theme.typography.overline,
    color: theme.colors.text.tertiary,
  },
  heroTitle: {
    ...theme.typography.heading,
    color: theme.colors.text.primary,
  },
  heroSubtitle: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },
  list: {
    gap: theme.spacing.sm,
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
  habitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
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
  streakBadge: {
    width: 72,
    height: 60,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  streakValue: {
    ...theme.typography.heading,
    color: theme.colors.text.primary,
  },
  streakLabel: {
    ...theme.typography.label,
    color: theme.colors.text.secondary,
    marginTop: -2,
  },
  emptyCard: {
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    padding: theme.spacing.base,
    gap: 6,
  },
  emptyTitle: {
    ...theme.typography.heading,
    color: theme.colors.text.primary,
  },
  emptyText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },
});
