import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Check } from 'lucide-react-native';
import { Screen } from '@/components/layout/Screen';
import { WEEKDAY_LONG } from '@/lib/mock/habit-ui';
import { theme } from '@/lib/theme';

export default function SelectDaysScreen() {
  const router = useRouter();
  const selected = [1, 2, 3, 4, 5];

  return (
    <Screen padded={false} edges={['top', 'bottom']}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.back()} activeOpacity={0.85}>
            <ChevronLeft size={22} color={theme.colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>Select Days</Text>
          <TouchableOpacity style={styles.doneButton} activeOpacity={0.85} onPress={() => router.back()}>
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.subtitle}>Choose the weekdays you want the reminder to repeat on.</Text>
          <View style={styles.list}>
            {WEEKDAY_LONG.map((day, index) => {
              const active = selected.includes(index);
              return (
                <View key={day} style={styles.dayRow}>
                  <Text style={[styles.dayText, active && styles.dayTextActive]}>{day}</Text>
                  <View style={[styles.check, active && styles.checkActive]}>
                    {active ? <Check size={14} color={theme.colors.accent.text} strokeWidth={3} /> : null}
                  </View>
                </View>
              );
            })}
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
  doneButton: {
    height: 40,
    justifyContent: 'center',
  },
  doneText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.accent.DEFAULT,
  },
  card: {
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    padding: theme.spacing.base,
    gap: theme.spacing.base,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },
  list: {
    gap: 10,
  },
  dayRow: {
    minHeight: 52,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    backgroundColor: 'rgba(255,255,255,0.03)',
    paddingHorizontal: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dayText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text.secondary,
  },
  dayTextActive: {
    color: theme.colors.text.primary,
  },
  check: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.surface.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkActive: {
    backgroundColor: theme.colors.accent.DEFAULT,
    borderColor: theme.colors.accent.DEFAULT,
  },
});
