import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Check } from 'lucide-react-native';
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/lib/theme';
import { getHabitDraft, setHabitDraft } from '@/lib/store/habit-draft';

const DAYS_OF_WEEK = [
  { label: 'Sunday', value: 0 },
  { label: 'Monday', value: 1 },
  { label: 'Tuesday', value: 2 },
  { label: 'Wednesday', value: 3 },
  { label: 'Thursday', value: 4 },
  { label: 'Friday', value: 5 },
  { label: 'Saturday', value: 6 },
];

export default function SelectDaysScreen() {
  const router = useRouter();
  const draft = getHabitDraft();
  
  // Local state for toggled days initialized from draft store
  const [selectedDays, setSelectedDays] = useState<number[]>(draft.repeatDays);

  const handleToggleDay = (dayValue: number) => {
    setSelectedDays((prev) =>
      prev.includes(dayValue)
        ? prev.filter((d) => d !== dayValue)
        : [...prev, dayValue].sort((a, b) => a - b)
    );
  };

  const handleDone = () => {
    // Save to the draft store
    setHabitDraft({
      repeatDays: selectedDays,
    });
    router.back();
  };

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
        <Text style={styles.headerTitle}>Select Days</Text>
        <TouchableOpacity
          onPress={handleDone}
          style={styles.doneButton}
          activeOpacity={0.7}
        >
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>Choose days you want to be reminded</Text>

        <View style={styles.listContainer}>
          {DAYS_OF_WEEK.map((day) => {
            const isSelected = selectedDays.includes(day.value);
            return (
              <TouchableOpacity
                key={day.value}
                style={[
                  styles.dayRow,
                  isSelected && styles.dayRowActive
                ]}
                onPress={() => handleToggleDay(day.value)}
                activeOpacity={0.7}
              >
                <Text style={[styles.dayLabel, isSelected && styles.dayLabelActive]}>
                  {day.label}
                </Text>
                
                <View
                  style={[
                    styles.checkboxCircle,
                    isSelected
                      ? { backgroundColor: theme.colors.accent.DEFAULT, borderColor: theme.colors.accent.DEFAULT }
                      : { borderColor: theme.colors.surface.border }
                  ]}
                >
                  {isSelected && (
                    <Check size={14} color={theme.colors.accent.text} strokeWidth={4} />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
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
    textAlign: 'center',
  },
  doneButton: {
    padding: theme.spacing.xs,
  },
  doneText: {
    color: theme.colors.accent.DEFAULT,
    fontSize: 16,
    fontWeight: '700',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  subtitle: {
    fontSize: 18,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xxl,
    paddingHorizontal: theme.spacing.xl,
    lineHeight: 24,
    fontWeight: '500',
  },
  listContainer: {
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    overflow: 'hidden',
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface.border,
  },
  dayRowActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
  },
  dayLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.secondary,
  },
  dayLabelActive: {
    color: theme.colors.text.primary,
    fontWeight: '700',
  },
  checkboxCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
