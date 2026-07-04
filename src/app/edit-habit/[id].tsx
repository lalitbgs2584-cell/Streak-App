import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  Dimensions,
} from 'react-native';
import { useRouter, useFocusEffect, useLocalSearchParams } from 'expo-router';
import {
  ChevronLeft,
  ChevronRight,
  Droplet,
  Flame,
  BookOpen,
  Code as CodeIcon,
  Activity,
  Brain,
  Accessibility,
  Plus
} from 'lucide-react-native';
import { Screen } from '@/components/layout/Screen';
import { theme } from '@/lib/theme';
import { useHabits } from '@/context/HabitContext';
import { getHabitDraft, setHabitDraft, resetHabitDraft } from '@/lib/store/habit-draft';

const { width } = Dimensions.get('window');
const GRID_ITEM_WIDTH = (width - 40 - 24) / 4;

const PRESETS = [
  { label: 'Drink Water', category: 'water', title: 'Drink Water' },
  { label: 'Run', category: 'running', title: 'Running' },
  { label: 'Read', category: 'read', title: 'Read Books' },
  { label: 'Code', category: 'code', title: 'Code' },
  { label: 'Workout', category: 'workout', title: 'Workout' },
  { label: 'Meditate', category: 'meditate', title: 'Meditate' },
  { label: 'Stretch', category: 'stretching', title: 'Stretching' },
  { label: 'Custom', category: 'journal', title: '' },
];

const DAYS_SHORT = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

// Helper to parse reminder string back to list of day numbers
const parseReminderToDays = (reminder: string): number[] => {
  const cleaned = reminder.toLowerCase();
  if (cleaned === 'daily' || cleaned === 'every day') {
    return [0, 1, 2, 3, 4, 5, 6];
  }
  if (cleaned === 'weekdays') {
    return [1, 2, 3, 4, 5];
  }
  if (cleaned === 'weekends') {
    return [0, 6];
  }
  const abbrevs = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const parts = cleaned.split(',').map((s) => s.trim());
  const days: number[] = [];
  parts.forEach((p) => {
    const idx = abbrevs.findIndex((a) => p.startsWith(a));
    if (idx !== -1) {
      days.push(idx);
    }
  });
  return days.sort((a, b) => a - b);
};

export default function EditHabitScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { habits, updateHabit } = useHabits();

  const habit = habits.find((h) => h.id === id);

  // Local Form States
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('water');
  const [reminderTime, setReminderTime] = useState('09:00 AM');
  const [repeatDays, setRepeatDays] = useState<number[]>([1, 2, 3, 4, 5]);

  // Time Picker Modal States
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [pickerHour, setPickerHour] = useState('09');
  const [pickerMinute, setPickerMinute] = useState('00');
  const [pickerAmpm, setPickerAmpm] = useState('AM');

  // Initialize draft store once when dynamic habit is retrieved
  useEffect(() => {
    if (habit) {
      const parsedDays = parseReminderToDays(habit.reminder);
      setHabitDraft({
        title: habit.title,
        category: habit.category,
        reminderTime: habit.startTime,
        repeatDays: parsedDays,
      });
      setTitle(habit.title);
      setCategory(habit.category);
      setReminderTime(habit.startTime);
      setRepeatDays(parsedDays);
    }
  }, [id, habit]);

  // Synchronize local states with draft store on focus (when returning from select-days)
  useFocusEffect(
    React.useCallback(() => {
      const draft = getHabitDraft();
      // Ensure we don't clear if draft is empty on first load (the useEffect above runs first)
      if (draft.title || draft.repeatDays.length > 0) {
        setTitle(draft.title || '');
        setCategory(draft.category || 'water');
        setReminderTime(draft.reminderTime || '09:00 AM');
        setRepeatDays(draft.repeatDays || [1, 2, 3, 4, 5]);
      }
    }, [])
  );

  const getFrequencyText = (days: number[]) => {
    if (days.length === 7) return 'Daily';
    if (days.length === 0) return 'Select Days';

    const weekdays = [1, 2, 3, 4, 5];
    const weekends = [0, 6];

    const isWeekdays = weekdays.every((d) => days.includes(d)) && days.length === 5;
    if (isWeekdays) return 'Weekdays';

    const isWeekends = weekends.every((d) => days.includes(d)) && days.length === 2;
    if (isWeekends) return 'Weekends';

    const dayAbbrev = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days.map((d) => dayAbbrev[d]).join(', ');
  };

  const handleNavigateToSelectDays = () => {
    setHabitDraft({
      title,
      category,
      reminderTime,
      repeatDays,
    });
    router.push('/select-days');
  };

  const handleToggleDayDirectly = (dayIndex: number) => {
    setRepeatDays((prev) => {
      const next = prev.includes(dayIndex)
        ? prev.filter((d) => d !== dayIndex)
        : [...prev, dayIndex].sort((a, b) => a - b);
      setHabitDraft({ repeatDays: next });
      return next;
    });
  };

  const handleSelectPreset = (preset: typeof PRESETS[0]) => {
    setTitle(preset.title);
    setCategory(preset.category);
    setHabitDraft({
      title: preset.title,
      category: preset.category,
    });
  };

  const renderPresetIcon = (presetCategory: string, color: string) => {
    const size = 26;
    switch (presetCategory) {
      case 'water':
        return <Droplet size={size} color={color} />;
      case 'running':
        return <Flame size={size} color={color} />;
      case 'read':
        return <BookOpen size={size} color={color} />;
      case 'code':
        return <CodeIcon size={size} color={color} />;
      case 'workout':
        return <Activity size={size} color={color} />;
      case 'meditate':
        return <Brain size={size} color={color} />;
      case 'stretching':
        return <Accessibility size={size} color={color} />;
      case 'journal':
        return <Plus size={size} color={color} />;
      default:
        return <Plus size={size} color={color} />;
    }
  };

  const getCategoryEmoji = (presetCategory: string) => {
    switch (presetCategory) {
      case 'water':
        return '💧';
      case 'running':
        return '🏃';
      case 'read':
        return '📚';
      case 'code':
        return '💻';
      case 'workout':
        return '💪';
      case 'meditate':
        return '🧘';
      case 'stretching':
        return '🤸';
      default:
        return '✨';
    }
  };

  const calculateEndTime = (startTimeStr: string) => {
    try {
      const match = startTimeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (!match) return startTimeStr;

      let hours = parseInt(match[1]);
      let minutes = parseInt(match[2]);
      const ampm = match[3].toUpperCase();

      minutes += 30;
      if (minutes >= 60) {
        minutes -= 60;
        hours += 1;
        if (hours > 12) {
          hours = 1;
        }
      }

      const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
      return `${formattedHours}:${formattedMinutes} ${ampm}`;
    } catch (e) {
      return startTimeStr;
    }
  };

  const handleOpenTimePicker = () => {
    const match = reminderTime.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (match) {
      setPickerHour(match[1]);
      setPickerMinute(match[2]);
      setPickerAmpm(match[3].toUpperCase());
    }
    setTimePickerVisible(true);
  };

  const handleSaveTime = () => {
    const newTime = `${pickerHour}:${pickerMinute} ${pickerAmpm}`;
    setReminderTime(newTime);
    setHabitDraft({ reminderTime: newTime });
    setTimePickerVisible(false);
  };

  const handleSaveHabit = () => {
    if (!habit || !title.trim()) return;

    const updatedHabit = {
      ...habit,
      title: title.trim(),
      description: `Time to focus on ${title.trim()}!`,
      reminder: getFrequencyText(repeatDays),
      startTime: reminderTime,
      endTime: calculateEndTime(reminderTime),
      category: category as any,
    };

    updateHabit(updatedHabit);
    resetHabitDraft();
    router.back();
  };

  if (!habit) {
    return (
      <Screen>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Habit not found</Text>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backBtnText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </Screen>
    );
  }

  const isPresetSelected = (preset: typeof PRESETS[0]) => {
    if (preset.label === 'Custom') {
      return !PRESETS.slice(0, 7).some((p) => p.title === title) && title !== '';
    }
    return title === preset.title && category === preset.category;
  };

  const getPresetColor = (presetCategory: string) => {
    return (theme.colors.habit as any)[presetCategory] || theme.colors.accent.DEFAULT;
  };

  const hoursList = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const minutesList = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0'));
  const ampmList = ['AM', 'PM'];

  return (
    <Screen scroll keyboardAvoiding padded={false} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            resetHabitDraft();
            router.back();
          }}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <ChevronLeft size={28} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Habit</Text>
        <TouchableOpacity
          onPress={handleSaveHabit}
          disabled={!title.trim()}
          style={styles.saveButton}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.saveText,
              !title.trim() && { color: theme.colors.text.tertiary, opacity: 0.5 },
            ]}
          >
            Save
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Presets Grid */}
        <View style={styles.presetsContainer}>
          {PRESETS.map((preset, index) => {
            const isSelected = isPresetSelected(preset);
            const presetColor = getPresetColor(preset.category);

            return (
              <TouchableOpacity
                key={index}
                style={styles.presetWrapper}
                onPress={() => handleSelectPreset(preset)}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.presetBox,
                    {
                      borderColor: isSelected ? presetColor : theme.colors.surface.border,
                      backgroundColor: isSelected ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)',
                    },
                  ]}
                >
                  {renderPresetIcon(preset.category, isSelected ? presetColor : theme.colors.text.secondary)}
                </View>
                <Text
                  style={[
                    styles.presetLabel,
                    isSelected ? { color: theme.colors.text.primary, fontWeight: '700' } : { color: theme.colors.text.secondary },
                  ]}
                  numberOfLines={1}
                >
                  {preset.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Inputs */}
        <View style={styles.formContainer}>
          {/* Habit Name Input */}
          <Text style={styles.inputLabel}>Habit Name</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              value={title}
              onChangeText={(text) => {
                setTitle(text);
                setHabitDraft({ title: text });
              }}
              placeholder="e.g. Drink Water"
              placeholderTextColor={theme.colors.text.tertiary}
            />
          </View>

          {/* Frequency Button */}
          <TouchableOpacity
            style={styles.menuRow}
            onPress={handleNavigateToSelectDays}
            activeOpacity={0.7}
          >
            <Text style={styles.menuRowLabel}>Frequency</Text>
            <View style={styles.menuRowValueContainer}>
              <Text style={styles.menuRowValue} numberOfLines={1}>
                {getFrequencyText(repeatDays)}
              </Text>
              <ChevronRight size={18} color={theme.colors.text.secondary} />
            </View>
          </TouchableOpacity>

          {/* Reminder Time Button */}
          <TouchableOpacity
            style={styles.menuRow}
            onPress={handleOpenTimePicker}
            activeOpacity={0.7}
          >
            <Text style={styles.menuRowLabel}>Reminder Time</Text>
            <View style={styles.menuRowValueContainer}>
              <Text style={styles.menuRowValue}>{reminderTime}</Text>
              <ChevronRight size={18} color={theme.colors.text.secondary} />
            </View>
          </TouchableOpacity>

          {/* Direct Repeat Days Toggles */}
          <View style={styles.repeatContainer}>
            <Text style={styles.repeatLabel}>Repeat</Text>
            <View style={styles.repeatRow}>
              {DAYS_SHORT.map((day, idx) => {
                const isActive = repeatDays.includes(idx);
                return (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => handleToggleDayDirectly(idx)}
                    style={[
                      styles.dayCircle,
                      isActive
                        ? { backgroundColor: theme.colors.accent.DEFAULT, borderColor: theme.colors.accent.DEFAULT }
                        : { borderColor: theme.colors.surface.border },
                    ]}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.dayCircleText,
                        isActive ? { color: theme.colors.accent.text, fontWeight: '700' } : { color: theme.colors.text.secondary },
                      ]}
                    >
                      {day}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Notification Preview */}
          <View style={styles.previewContainer}>
            <Text style={styles.previewLabel}>Notification Preview</Text>
            <View style={styles.previewBox}>
              <View style={styles.previewHeaderRow}>
                <Text style={styles.previewHeaderTitle}>Streak Notification</Text>
                <Text style={styles.previewHeaderTime}>now</Text>
              </View>
              <Text style={styles.previewText}>
                Time to {title.trim() || 'drink water'} {getCategoryEmoji(category)}
              </Text>
              <Text style={styles.previewSubtitle}>Tap to log it.</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Time Picker Slide-up Modal */}
      <Modal
        visible={timePickerVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setTimePickerVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalScrim}
            activeOpacity={1}
            onPress={() => setTimePickerVisible(false)}
          />
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Reminder Time</Text>
              <TouchableOpacity onPress={handleSaveTime} activeOpacity={0.7}>
                <Text style={styles.modalDoneText}>Done</Text>
              </TouchableOpacity>
            </View>

            {/* Selection Grid */}
            <View style={styles.pickerContainer}>
              {/* Hour Column */}
              <View style={styles.pickerColumn}>
                <Text style={styles.pickerColumnLabel}>Hour</Text>
                <FlatList
                  data={hoursList}
                  keyExtractor={(item) => item}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.columnScrollContent}
                  renderItem={({ item }) => {
                    const isSelected = pickerHour === item;
                    return (
                      <TouchableOpacity
                        style={[styles.pickerItem, isSelected && styles.pickerItemActive]}
                        onPress={() => setPickerHour(item)}
                      >
                        <Text
                          style={[
                            styles.pickerItemText,
                            isSelected && { color: theme.colors.accent.DEFAULT, fontWeight: '800' },
                          ]}
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>

              {/* Minute Column */}
              <View style={styles.pickerColumn}>
                <Text style={styles.pickerColumnLabel}>Min</Text>
                <FlatList
                  data={minutesList}
                  keyExtractor={(item) => item}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.columnScrollContent}
                  renderItem={({ item }) => {
                    const isSelected = pickerMinute === item;
                    return (
                      <TouchableOpacity
                        style={[styles.pickerItem, isSelected && styles.pickerItemActive]}
                        onPress={() => setPickerMinute(item)}
                      >
                        <Text
                          style={[
                            styles.pickerItemText,
                            isSelected && { color: theme.colors.accent.DEFAULT, fontWeight: '800' },
                          ]}
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>

              {/* AM/PM Column */}
              <View style={styles.pickerColumn}>
                <Text style={styles.pickerColumnLabel}>Period</Text>
                <FlatList
                  data={ampmList}
                  keyExtractor={(item) => item}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.columnScrollContent}
                  renderItem={({ item }) => {
                    const isSelected = pickerAmpm === item;
                    return (
                      <TouchableOpacity
                        style={[styles.pickerItem, isSelected && styles.pickerItemActive]}
                        onPress={() => setPickerAmpm(item)}
                      >
                        <Text
                          style={[
                            styles.pickerItemText,
                            isSelected && { color: theme.colors.accent.DEFAULT, fontWeight: '800' },
                          ]}
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
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
  saveButton: {
    padding: theme.spacing.xs,
  },
  saveText: {
    color: theme.colors.accent.DEFAULT,
    fontSize: 16,
    fontWeight: '700',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: theme.spacing.md,
  },
  presetsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
  },
  presetWrapper: {
    width: GRID_ITEM_WIDTH,
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  presetBox: {
    width: GRID_ITEM_WIDTH - 4,
    height: GRID_ITEM_WIDTH - 4,
    borderRadius: theme.radius.md,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  presetLabel: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  formContainer: {
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xxxl,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: -6,
  },
  inputWrapper: {
    backgroundColor: theme.colors.surface.input,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    paddingHorizontal: theme.spacing.md,
    height: 52,
    justifyContent: 'center',
  },
  textInput: {
    color: theme.colors.text.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    height: 52,
  },
  menuRowLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  menuRowValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    maxWidth: '65%',
  },
  menuRowValue: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.text.secondary,
  },
  repeatContainer: {
    gap: theme.spacing.sm,
  },
  repeatLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  repeatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayCircleText: {
    fontSize: 13,
    fontWeight: '600',
  },
  previewContainer: {
    gap: theme.spacing.sm,
    marginTop: theme.spacing.xs,
  },
  previewLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  previewBox: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    padding: theme.spacing.md,
  },
  previewHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  previewHeaderTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.colors.text.tertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  previewHeaderTime: {
    fontSize: 11,
    color: theme.colors.text.tertiary,
  },
  previewText: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: 2,
  },
  previewSubtitle: {
    fontSize: 13,
    color: theme.colors.text.secondary,
  },
  // Time Picker Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.overlay.scrim,
  },
  modalContent: {
    backgroundColor: theme.colors.surface.cardElevated,
    borderTopLeftRadius: theme.radius.lg,
    borderTopRightRadius: theme.radius.lg,
    paddingHorizontal: 20,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xxl,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.text.primary,
  },
  modalDoneText: {
    color: theme.colors.accent.DEFAULT,
    fontSize: 16,
    fontWeight: '700',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 180,
  },
  pickerColumn: {
    flex: 1,
    alignItems: 'center',
  },
  pickerColumnLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.text.tertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: theme.spacing.sm,
  },
  columnScrollContent: {
    paddingBottom: theme.spacing.lg,
  },
  pickerItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: theme.radius.sm,
    width: '100%',
    alignItems: 'center',
    marginBottom: 4,
  },
  pickerItemActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  pickerItemText: {
    fontSize: 18,
    color: theme.colors.text.secondary,
    fontWeight: '600',
  },
  // Error state
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: theme.colors.text.primary,
    fontSize: 18,
    marginBottom: theme.spacing.lg,
  },
  backBtn: {
    backgroundColor: theme.colors.accent.DEFAULT,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.md,
  },
  backBtnText: {
    color: theme.colors.accent.text,
    fontWeight: '700',
  },
});
