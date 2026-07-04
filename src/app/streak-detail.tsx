import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Flame } from 'lucide-react-native';
import { Screen } from '@/components/layout/Screen';
import { MetricCard, WEEKDAY_SHORT } from '@/lib/mock/habit-ui';
import { theme } from '@/lib/theme';

export default function StreakDetailScreen() {
  const router = useRouter();

  return (
    <Screen padded={false} edges={['top', 'bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.back()} activeOpacity={0.85}>
            <ChevronLeft size={22} color={theme.colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>Streak Detail</Text>
          <View style={styles.iconButton} />
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroCircle}>
            <Flame size={46} color={theme.colors.accent.DEFAULT} />
          </View>
          <Text style={styles.heroNumber}>12</Text>
          <Text style={styles.heroText}>Current streak</Text>
          <Text style={styles.heroSubtext}>Keep it up and don&apos;t break the chain.</Text>
        </View>

        <View style={styles.metricsRow}>
          <MetricCard value="18 days" label="Best streak" accent />
          <MetricCard value="36 days" label="Total completed" />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Completed on</Text>
          <Text style={styles.dayLine}>May 3, 2025</Text>
          <View style={styles.weekRow}>
            {WEEKDAY_SHORT.map((day) => (
              <View key={day} style={styles.dayBubble}>
                <Text style={styles.dayBubbleText}>{day}</Text>
              </View>
            ))}
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
  title: {
    ...theme.typography.heading,
    color: theme.colors.text.primary,
  },
  heroCard: {
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    padding: theme.spacing.base,
    alignItems: 'center',
    gap: 6,
  },
  heroCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(198,255,79,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(198,255,79,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  heroNumber: {
    fontSize: 44,
    fontWeight: '900',
    color: theme.colors.accent.DEFAULT,
  },
  heroText: {
    ...theme.typography.heading,
    color: theme.colors.text.primary,
  },
  heroSubtext: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    textAlign: 'center',
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
  dayLine: {
    ...theme.typography.heading,
    color: theme.colors.text.primary,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  dayBubble: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.accent.DEFAULT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayBubbleText: {
    ...theme.typography.label,
    color: theme.colors.accent.text,
  },
});
