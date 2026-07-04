import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/lib/theme';

export default function HistoryScreen() {
  const insets = useSafeAreaInsets();

  // Completed calendar date markers for visual display
  const completedDates = [1, 2, 3, 4, 11, 12, 13, 14, 15, 16, 18, 19, 21, 25, 26];

  // Calendar dates layout grid for May 2025
  // May 1st 2025 is a Thursday (so starts at col index 4)
  const CALENDAR_DAYS = [
    // blank spaces for offset
    null, null, null, null,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
  ];

  const weekLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <Screen padded={false} edges={['bottom']}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + theme.spacing.md }]}>
        <Text style={styles.headerTitle}>History</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Month Header */}
        <View style={styles.calendarHeader}>
          <Text style={styles.monthLabel}>May 2025</Text>
        </View>

        {/* Calendar Box */}
        <View style={styles.calendarBox}>
          {/* Weekdays Row */}
          <View style={styles.weekLabelsRow}>
            {weekLabels.map((lbl, idx) => (
              <Text key={idx} style={styles.weekLabelText}>{lbl}</Text>
            ))}
          </View>

          {/* Dates Grid */}
          <View style={styles.datesGrid}>
            {CALENDAR_DAYS.map((day, idx) => {
              if (day === null) {
                return <View key={`empty-${idx}`} style={styles.dateCell} />;
              }

              const isCompleted = completedDates.includes(day);

              return (
                <View key={`day-${day}`} style={styles.dateCell}>
                  <View
                    style={[
                      styles.dateCircle,
                      isCompleted && {
                        backgroundColor: theme.colors.accent.DEFAULT,
                        borderColor: theme.colors.accent.DEFAULT
                      }
                    ]}
                  >
                    <Text
                      style={[
                        styles.dateText,
                        isCompleted && { color: theme.colors.accent.text, fontWeight: '800' }
                      ]}
                    >
                      {day}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryCardTitle}>Summary</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryCol}>
              <Text style={styles.summaryValue}>18 days</Text>
              <Text style={styles.summaryLabel}>Longest Streak</Text>
            </View>
            <View style={styles.summaryCol}>
              <Text style={styles.summaryValue}>78%</Text>
              <Text style={styles.summaryLabel}>Completion Rate</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingBottom: theme.spacing.md,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: theme.colors.text.primary,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.xxxl,
  },
  calendarHeader: {
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  monthLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text.primary,
  },
  calendarBox: {
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  weekLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  weekLabelText: {
    flex: 1,
    textAlign: 'center',
    color: theme.colors.text.tertiary,
    fontSize: 12,
    fontWeight: '700',
  },
  datesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  dateCell: {
    width: '14.28%', // 7 days in a row
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  summaryCard: {
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    padding: theme.spacing.base,
  },
  summaryCardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryCol: {
    flex: 1,
  },
  summaryValue: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.text.secondary,
  },
});