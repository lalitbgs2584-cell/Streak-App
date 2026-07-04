import React, { useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { theme } from '@/lib/theme';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;
const SCREEN_WIDTH = Dimensions.get('window').width;
const DAY_CELL_SIZE = (SCREEN_WIDTH - 40) / 7; // 20px padding on each side

type DateStripProps = {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
};

/**
 * Returns the 7 days of the week (Sun–Sat) that contains `date`.
 */
function getWeekDays(date: Date): Date[] {
  const day = date.getDay(); // 0 = Sun
  const sunday = new Date(date);
  sunday.setDate(date.getDate() - day);
  sunday.setHours(0, 0, 0, 0);

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(sunday);
    d.setDate(sunday.getDate() + i);
    return d;
  });
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function DateStrip({ selectedDate, onDateChange }: DateStripProps) {
  const weekDays = useMemo(() => getWeekDays(selectedDate), [selectedDate]);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  return (
    <View style={styles.container}>
      {weekDays.map((day) => {
        const isSelected = isSameDay(day, selectedDate);
        const isToday = isSameDay(day, today);
        const dayIndex = day.getDay();

        return (
          <TouchableOpacity
            key={day.toISOString()}
            style={[
              styles.dayCell,
              isSelected && styles.selectedCell,
            ]}
            onPress={() => onDateChange(day)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.dayLabel,
                isSelected && styles.selectedDayLabel,
                !isSelected && isToday && styles.todayDayLabel,
              ]}
            >
              {DAYS[dayIndex]}
            </Text>
            <Text
              style={[
                styles.dayNumber,
                isSelected && styles.selectedDayNumber,
                !isSelected && isToday && styles.todayDayNumber,
              ]}
            >
              {day.getDate()}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.lg,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.xs,
    marginTop: theme.spacing.base,
  },
  dayCell: {
    width: DAY_CELL_SIZE - 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.md,
  },
  selectedCell: {
    backgroundColor: theme.colors.accent.DEFAULT,
  },
  dayLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: theme.colors.text.secondary,
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  selectedDayLabel: {
    color: theme.colors.accent.text,
    fontWeight: '700',
  },
  todayDayLabel: {
    color: theme.colors.accent.DEFAULT,
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  selectedDayNumber: {
    color: theme.colors.accent.text,
    fontWeight: '800',
  },
  todayDayNumber: {
    color: theme.colors.accent.DEFAULT,
  },
});
