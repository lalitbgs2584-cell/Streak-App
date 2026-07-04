import React from 'react';
import { StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native';
import { theme } from '@/lib/theme';
import {
  Bell,
  Clock,
  Trash2,
  Pencil,
  Flame,
  Target,
  Check,
  Droplet,
  Activity,
  BookOpen,
  Brain,
  Moon,
  Book,
  GraduationCap,
  Code as CodeIcon,
  Utensils,
  Footprints,
  Accessibility,
} from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  Layout,
} from 'react-native-reanimated';

export type Habit = {
  id: string;
  title: string;
  description: string;
  reminder: string;
  startTime: string;
  endTime: string;
  priority: 'High' | 'Medium' | 'Low';
  streak: number;
  count: number;
  completed: boolean;
  category: keyof typeof theme.colors.habit;
};

// Map category to Lucide Icon
export const getCategoryIcon = (category: keyof typeof theme.colors.habit, size: number, color: string) => {
  switch (category) {
    case 'water':
      return <Droplet size={size} color={color} />;
    case 'workout':
      return <Activity size={size} color={color} />;
    case 'read':
      return <BookOpen size={size} color={color} />;
    case 'meditate':
      return <Brain size={size} color={color} />;
    case 'running':
      return <Flame size={size} color={color} />;
    case 'sleep':
      return <Moon size={size} color={color} />;
    case 'journal':
      return <Book size={size} color={color} />;
    case 'study':
      return <GraduationCap size={size} color={color} />;
    case 'code':
      return <CodeIcon size={size} color={color} />;
    case 'eating':
      return <Utensils size={size} color={color} />;
    case 'walking':
      return <Footprints size={size} color={color} />;
    case 'stretching':
      return <Accessibility size={size} color={color} />;
    default:
      return <Activity size={size} color={color} />;
  }
};

/**
 * -------------------------------------------------------------
 * MINIMIZED HABIT CARD (Default Export)
 * Renders on the main screen. Contains icon, title, and checkbox.
 * -------------------------------------------------------------
 */
type MinimizedCardProps = {
  habit: Habit;
  onPress: (id: string) => void;
  onToggleComplete: (id: string) => void;
};

export default function HabitCard({ habit, onPress, onToggleComplete }: MinimizedCardProps) {
  const scale = useSharedValue(1);
  const categoryColor = theme.colors.habit[habit.category] || theme.colors.accent.DEFAULT;

  const handlePressIn = () => {
    scale.value = withSpring(0.97);
  };
  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      layout={Layout.springify().mass(0.8).damping(15)}
      style={[styles.minCardContainer, animatedStyle]}
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => onPress(habit.id)}
        style={styles.minCardPressable}
      >
        <View style={styles.minLeftContent}>
          {/* Minimized Icon Container */}
          <View
            style={[
              styles.minIconBox,
              { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: habit.completed ? theme.colors.accent.DEFAULT : theme.colors.surface.border }
            ]}
          >
            {getCategoryIcon(habit.category, 22, categoryColor)}
          </View>

          {/* Title */}
          <Text
            style={[
              styles.minTitle,
              habit.completed && styles.completedText,
            ]}
            numberOfLines={1}
          >
            {habit.title}
          </Text>
        </View>

        {/* Checkbox Trigger */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onToggleComplete(habit.id)}
          style={styles.checkboxContainer}
        >
          <View
            style={[
              styles.checkboxCircle,
              { borderColor: theme.colors.accent.DEFAULT },
              habit.completed && { backgroundColor: theme.colors.accent.DEFAULT }
            ]}
          >
            {habit.completed && (
              <Check size={14} color={theme.colors.accent.text} strokeWidth={3.5} />
            )}
          </View>
        </TouchableOpacity>
      </Pressable>
    </Animated.View>
  );
}

/**
 * -------------------------------------------------------------
 * EXPANDED/DETAILED HABIT CARD (Named Export)
 * Renders on the stack details screen. Displays all stats & actions.
 * -------------------------------------------------------------
 */
type DetailedCardProps = {
  habit: Habit;
  onToggleComplete: (id: string) => void;
  onEdit?: (habit: Habit) => void;
  onDelete?: (id: string) => void;
};

export function DetailedHabitCard({ habit, onToggleComplete, onEdit, onDelete }: DetailedCardProps) {
  const categoryColor = theme.colors.habit[habit.category] || theme.colors.accent.DEFAULT;

  return (
    <View style={styles.detailedCardContainer}>
      {/* Top Header Row */}
      <View style={styles.headerRow}>
        <View style={styles.leftHeader}>
          {/* Icon Box */}
          <View
            style={[
              styles.iconBox,
              { borderColor: habit.completed ? theme.colors.accent.DEFAULT : theme.colors.surface.border },
              habit.completed && { backgroundColor: 'rgba(198,255,79,0.1)' }
            ]}
          >
            {habit.completed ? (
              <View style={[styles.checkedCircle, { backgroundColor: theme.colors.accent.DEFAULT }]}>
                <Check size={16} color={theme.colors.accent.text} strokeWidth={3} />
              </View>
            ) : (
              getCategoryIcon(habit.category, 28, categoryColor)
            )}
          </View>

          {/* Title & Description */}
          <View style={styles.titleContainer}>
            <Text
              style={[
                styles.title,
                habit.completed && styles.completedText,
              ]}
              numberOfLines={1}
            >
              {habit.title}
            </Text>
            <Text
              style={[
                styles.description,
                habit.completed && styles.completedText,
              ]}
              numberOfLines={2}
            >
              {habit.description}
            </Text>
          </View>
        </View>

        {/* Action Buttons (Edit/Delete) */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => onEdit?.(habit)}
            activeOpacity={0.7}
          >
            <Pencil size={18} color={theme.colors.accent.DEFAULT} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => onDelete?.(habit.id)}
            activeOpacity={0.7}
          >
            <Trash2 size={18} color={theme.colors.status.error} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Middle Details Grid */}
      <View style={styles.detailsGrid}>
        {/* Row 1 */}
        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <View style={styles.detailLabelRow}>
              <Bell size={14} color={theme.colors.accent.DEFAULT} style={styles.detailIcon} />
              <Text style={styles.detailLabel}>REMINDER</Text>
            </View>
            <Text style={[styles.detailValue, habit.completed && styles.completedText]}>
              {habit.reminder}
            </Text>
          </View>

          <View style={styles.detailItem}>
            <View style={styles.detailLabelRow}>
              <Clock size={14} color={theme.colors.accent.DEFAULT} style={styles.detailIcon} />
              <Text style={styles.detailLabel}>START TIME</Text>
            </View>
            <Text style={[styles.detailValue, habit.completed && styles.completedText]}>
              {habit.startTime}
            </Text>
          </View>

          <View style={styles.detailItem}>
            <View style={styles.detailLabelRow}>
              <Clock size={14} color={theme.colors.accent.DEFAULT} style={styles.detailIcon} />
              <Text style={styles.detailLabel}>END TIME</Text>
            </View>
            <Text style={[styles.detailValue, habit.completed && styles.completedText]}>
              {habit.endTime}
            </Text>
          </View>
        </View>

        {/* Row 2 */}
        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <View style={styles.detailLabelRow}>
              <View style={styles.priorityDot} />
              <Text style={styles.detailLabel}>PRIORITY</Text>
            </View>
            <Text style={[styles.detailValue, habit.completed && styles.completedText]}>
              {habit.priority}
            </Text>
          </View>

          <View style={styles.detailItem}>
            <View style={styles.detailLabelRow}>
              <Flame size={14} color={theme.colors.accent.DEFAULT} style={styles.detailIcon} />
              <Text style={styles.detailLabel}>STREAK</Text>
            </View>
            <Text style={[styles.detailValue, habit.completed && styles.completedText]}>
              {habit.streak} days
            </Text>
          </View>

          <View style={styles.detailItem}>
            <View style={styles.detailLabelRow}>
              <Target size={14} color={theme.colors.accent.DEFAULT} style={styles.detailIcon} />
              <Text style={styles.detailLabel}>COUNT</Text>
            </View>
            <Text style={[styles.detailValue, habit.completed && styles.completedText]}>
              {habit.count} times
            </Text>
          </View>
        </View>
      </View>

      {/* Complete Action Button */}
      <TouchableOpacity
        onPress={() => onToggleComplete(habit.id)}
        activeOpacity={0.9}
        style={[
          styles.actionButton,
          habit.completed ? styles.completedButton : styles.markDoneButton,
        ]}
      >
        {habit.completed ? (
          <View style={styles.completedBtnContent}>
            <Check size={18} color={theme.colors.accent.DEFAULT} style={styles.btnIcon} strokeWidth={3} />
            <Text style={styles.completedBtnText}>Completed</Text>
          </View>
        ) : (
          <View style={styles.markDoneBtnContent}>
            <View style={styles.btnOutlineCircle} />
            <Text style={styles.markDoneBtnText}>Mark as Done</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  // Minimized styles
  minCardContainer: {
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    marginBottom: theme.spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  minCardPressable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.base,
  },
  minLeftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  minIconBox: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  minTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text.primary,
    flex: 1,
  },
  checkboxContainer: {
    padding: theme.spacing.xs,
  },
  checkboxCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Detailed styles
  detailedCardContainer: {
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    padding: theme.spacing.base,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  checkedCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: theme.colors.text.secondary,
    lineHeight: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.45,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  editButton: {
    width: 38,
    height: 38,
    borderRadius: theme.radius.sm,
    backgroundColor: 'rgba(198,255,79,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    width: 38,
    height: 38,
    borderRadius: theme.radius.sm,
    backgroundColor: 'rgba(255,92,92,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.surface.border,
    marginVertical: theme.spacing.md,
    opacity: 0.6,
  },
  detailsGrid: {
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flex: 1,
  },
  detailLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailIcon: {
    marginRight: 4,
  },
  detailLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: theme.colors.text.tertiary,
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.text.primary,
    paddingLeft: 2,
  },
  priorityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.accent.DEFAULT,
    marginRight: 6,
  },
  actionButton: {
    height: 48,
    borderRadius: theme.radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markDoneButton: {
    backgroundColor: theme.colors.accent.DEFAULT,
  },
  completedButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(198,255,79,0.2)',
  },
  markDoneBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  btnOutlineCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: theme.colors.accent.text,
    opacity: 0.7,
  },
  markDoneBtnText: {
    color: theme.colors.accent.text,
    fontSize: 15,
    fontWeight: '700',
  },
  completedBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  btnIcon: {
    marginTop: 1,
  },
  completedBtnText: {
    color: theme.colors.accent.DEFAULT,
    fontSize: 15,
    fontWeight: '700',
  },
});