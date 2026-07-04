import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { BookOpen, ChevronRight, Sparkles } from 'lucide-react-native';
import { Screen } from '@/components/layout/Screen';
import { HeroCard, AccentPill } from '@/lib/mock/habit-ui';
import { theme } from '@/lib/theme';

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <Screen padded={false} edges={['top', 'bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.kicker}>Habit Tracker</Text>
          <AccentPill label="UI-first build" active />
        </View>

        <HeroCard title="Build Better Habits" subtitle="Track your habits, keep streaks alive, and stay consistent.">
          <View style={styles.heroIcon}>
            <BookOpen size={54} color={theme.colors.accent.DEFAULT} />
          </View>
        </HeroCard>

        <View style={styles.copyBlock}>
          <Text style={styles.copyTitle}>A darker, faster mobile tracker</Text>
          <Text style={styles.copyText}>
            This build focuses on the visual experience, with routes and screens shaped around the habit database
            instead of auth-first onboarding.
          </Text>
        </View>

        <View style={styles.ctaRow}>
          <TouchableOpacity style={styles.primaryButton} activeOpacity={0.85} onPress={() => router.replace('/(tabs)/today')}>
            <Text style={styles.primaryText}>Get Started</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.85} onPress={() => router.push('/signup')}>
            <Text style={styles.secondaryText}>Profile Setup</Text>
            <ChevronRight size={18} color={theme.colors.accent.DEFAULT} />
          </TouchableOpacity>
        </View>

        <View style={styles.featureRow}>
          <View style={styles.featureCard}>
            <Sparkles size={18} color={theme.colors.accent.DEFAULT} />
            <Text style={styles.featureText}>Local reminders</Text>
          </View>
          <View style={styles.featureCard}>
            <Sparkles size={18} color={theme.colors.accent.DEFAULT} />
            <Text style={styles.featureText}>Push-ready UI</Text>
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
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.sm,
  },
  kicker: {
    ...theme.typography.overline,
    color: theme.colors.text.secondary,
  },
  heroIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.md,
  },
  copyBlock: {
    gap: 8,
  },
  copyTitle: {
    ...theme.typography.heading,
    color: theme.colors.text.primary,
  },
  copyText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },
  ctaRow: {
    gap: theme.spacing.sm,
  },
  primaryButton: {
    height: 52,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.accent.DEFAULT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.accent.text,
  },
  secondaryButton: {
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
  secondaryText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text.primary,
  },
  featureRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  featureCard: {
    flex: 1,
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    padding: theme.spacing.base,
    gap: 8,
    alignItems: 'flex-start',
  },
  featureText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text.primary,
  },
});
