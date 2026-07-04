import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Flame } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/lib/theme';

export default function StreakDetailScreen() {
  const router = useRouter();

  // Mock streak details for visual display
  const currentStreak = 12;
  const bestStreak = 18;
  const totalCompleted = 36;
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <Screen padded={false} edges={['top', 'bottom']}>
      {/* Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <ChevronLeft size={28} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Streak Detail</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Streak Main Panel */}
        <View style={styles.streakPanel}>
          <LinearGradient
            colors={[theme.colors.illustration.purpleTop, theme.colors.illustration.purpleBottom]}
            style={styles.illustrationGradient}
          >
            {/* Left Graphic Avatar */}
            <View style={styles.avatarBox}>
              <Flame size={44} color={theme.colors.accent.DEFAULT} />
            </View>

            {/* Right Streak info */}
            <View style={styles.streakInfo}>
              <Text style={styles.streakNumber}>{currentStreak}</Text>
              <Text style={styles.streakTitle}>Current Streak</Text>
              <Text style={styles.streakSubtitle}>Keep it up! 🔥</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Double Stats Grid */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Best Streak</Text>
            <Text style={styles.statValue}>{bestStreak} days</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total Completed</Text>
            <Text style={styles.statValue}>{totalCompleted} days</Text>
          </View>
        </View>

        {/* Completed on Calendar strip */}
        <View style={styles.cardSection}>
          <Text style={styles.sectionLabel}>Completed on</Text>
          <Text style={styles.dateRange}>May 3, 2025</Text>
          
          <View style={styles.weekRow}>
            {weekDays.map((day, idx) => (
              <View
                key={idx}
                style={[
                  styles.dayCircle,
                  { backgroundColor: theme.colors.accent.DEFAULT, borderColor: theme.colors.accent.DEFAULT }
                ]}
              >
                <Text style={styles.dayCircleText}>{day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Action Callout */}
        <Text style={styles.warningCallout}>Don&apos;t break the chain!</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
  backButton: {
    padding: theme.spacing.xs,
    marginLeft: -theme.spacing.xs,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.text.primary,
  },
  headerPlaceholder: {
    width: 40,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: theme.spacing.md,
    gap: theme.spacing.lg,
  },
  streakPanel: {
    width: '100%',
    height: 150,
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
  },
  illustrationGradient: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 20,
  },
  avatarBox: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(198,255,79,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(198,255,79,0.3)',
    shadowColor: theme.colors.accent.DEFAULT,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  streakInfo: {
    flex: 1,
  },
  streakNumber: {
    fontSize: 32,
    fontWeight: '900',
    color: theme.colors.accent.DEFAULT,
  },
  streakTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginTop: 2,
  },
  streakSubtitle: {
    fontSize: 13,
    color: theme.colors.text.secondary,
    fontWeight: '600',
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    padding: theme.spacing.md,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.text.tertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.text.primary,
  },
  cardSection: {
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    padding: theme.spacing.base,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.text.tertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dateRange: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.text.primary,
    marginTop: 4,
    marginBottom: theme.spacing.md,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayCircleText: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.accent.text,
  },
  warningCallout: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginTop: theme.spacing.md,
  },
});
