import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, MoonStar } from 'lucide-react-native';
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/lib/theme';

export default function QuietHoursScreen() {
  const router = useRouter();

  return (
    <Screen padded={false} edges={['top', 'bottom']}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.back()} activeOpacity={0.85}>
            <ChevronLeft size={22} color={theme.colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>Quiet Hours</Text>
          <View style={styles.iconButton} />
        </View>

        <View style={styles.card}>
          <View style={styles.hero}>
            <View style={styles.heroIcon}>
              <MoonStar size={28} color={theme.colors.accent.DEFAULT} />
            </View>
            <View style={styles.heroCopy}>
              <Text style={styles.heroTitle}>10:00 PM - 07:00 AM</Text>
              <Text style={styles.heroText}>Mute reminder noise during sleeping hours.</Text>
            </View>
          </View>

          <View style={styles.timeRow}>
            <View style={styles.timeBox}>
              <Text style={styles.timeLabel}>Starts</Text>
              <Text style={styles.timeValue}>10:00 PM</Text>
            </View>
            <View style={styles.timeBox}>
              <Text style={styles.timeLabel}>Ends</Text>
              <Text style={styles.timeValue}>07:00 AM</Text>
            </View>
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
  card: {
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    padding: theme.spacing.base,
    gap: theme.spacing.base,
  },
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  heroIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: theme.colors.accent.muted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroCopy: {
    flex: 1,
    gap: 4,
  },
  heroTitle: {
    ...theme.typography.heading,
    color: theme.colors.text.primary,
  },
  heroText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },
  timeRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  timeBox: {
    flex: 1,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    backgroundColor: 'rgba(255,255,255,0.03)',
    padding: theme.spacing.base,
    gap: 4,
  },
  timeLabel: {
    ...theme.typography.overline,
    color: theme.colors.text.tertiary,
  },
  timeValue: {
    ...theme.typography.heading,
    color: theme.colors.text.primary,
  },
});
