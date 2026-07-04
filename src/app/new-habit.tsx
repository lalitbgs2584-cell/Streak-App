import React, { useState } from 'react';
import { Dimensions, FlatList, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { ChevronLeft, ChevronRight, Droplet, Flame, BookOpen, Code as CodeIcon, Activity, Brain, Accessibility, Plus } from 'lucide-react-native';
import { Screen } from '@/components/layout/Screen';
import { AccentPill, WEEKDAY_SHORT } from '@/lib/mock/habit-ui';
import { theme } from '@/lib/theme';
import { useHabits } from '@/lib/hooks/use-habits';
import { getHabitDraft, resetHabitDraft, setHabitDraft } from '@/lib/store/habit-draft';
import { DEFAULT_EMOJIS, HabitCategory,  parseTimeString } from '@/lib/habits/types';
import { formatReminderLabel } from '@/lib/habits/storage';

const { width } = Dimensions.get('window');
const GRID_ITEM_WIDTH = (width - 40 - 24) / 4;

const PRESETS = [
  { label: 'Drink Water', category: 'water', title: 'Drink Water' },
  { label: 'Run', category: 'running', title: 'Running' },
  { label: 'Read', category: 'read', title: 'Read' },
  { label: 'Code', category: 'code', title: 'Code' },
  { label: 'Workout', category: 'workout', title: 'Workout' },
  { label: 'Meditate', category: 'meditate', title: 'Meditate' },
  { label: 'Stretch', category: 'stretching', title: 'Stretching' },
  { label: 'Custom', category: 'journal', title: '' },
];

export default function NewHabitScreen() {
  const router = useRouter();
  const { addHabit } = useHabits();
  const [selectedHabit, setSelectedHabit] = useState<HabitCategory>('water');
  const [habitName, setHabitName] = useState('Drink Water');
  const [repeatDays, setRepeatDays] = useState<number[]>([1, 2, 3, 4, 5]);
  const [reminderTime, setReminderTime] = useState('09:00 AM');
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [pickerHour, setPickerHour] = useState('09');
  const [pickerMinute, setPickerMinute] = useState('00');
  const [pickerAmpm, setPickerAmpm] = useState('AM');

  useFocusEffect(
    React.useCallback(() => {
      const draft = getHabitDraft();
      setHabitName(draft.title || 'Drink Water');
      setSelectedHabit((draft.category as HabitCategory) || 'water');
      setRepeatDays(draft.repeatDays.length ? draft.repeatDays : [1, 2, 3, 4, 5]);
      setReminderTime(draft.reminderTime || '09:00 AM');
    }, [])
  );

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

  const getPresetColor = (presetCategory: string) => {
    return (theme.colors.habit as any)[presetCategory] || theme.colors.accent.DEFAULT;
  };

  const handleSelectPreset = (preset: typeof PRESETS[0]) => {
    setSelectedHabit((preset.category === 'journal' ? 'journal' : preset.category) as HabitCategory);
    setHabitName(preset.title || habitName);
    setHabitDraft({ title: preset.title, category: preset.category });
  };

  const handleNavigateToSelectDays = () => {
    setHabitDraft({
      title: habitName,
      category: selectedHabit,
      reminderTime,
      repeatDays,
    });
    router.push('/select-days');
  };

  const handleOpenTimePicker = () => {
    const { hour, minute } = parseTimeString(reminderTime);
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    setPickerHour(String(hour12).padStart(2, '0'));
    setPickerMinute(String(minute).padStart(2, '0'));
    setPickerAmpm(period);
    setTimePickerVisible(true);
  };

  const handleSaveTime = () => {
    const nextTime = `${pickerHour}:${pickerMinute} ${pickerAmpm}`;
    setReminderTime(nextTime);
    setHabitDraft({ reminderTime: nextTime });
    setTimePickerVisible(false);
  };

  const handleSaveHabit = async () => {
    const title = habitName.trim();
    if (!title) {
      return;
    }

    await addHabit({
      title,
      category: selectedHabit,
      emoji: DEFAULT_EMOJIS[selectedHabit],
      description: `Stay consistent with ${title.toLowerCase()}.`,
      reminderTime,
      repeatDays,
    });
    resetHabitDraft();
    router.replace('/(tabs)/today');
  };

  const hoursList = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const minutesList = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0'));
  const ampmList = ['AM', 'PM'];
  const currentTime = parseTimeString(reminderTime);
  const currentHour12 = currentTime.hour % 12 === 0 ? 12 : currentTime.hour % 12;
  const currentMinute = currentTime.minute;
  const frequencyLabel = formatReminderLabel(repeatDays);

  return (
    <Screen scroll keyboardAvoiding padded={false} edges={['top', 'bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.back()} activeOpacity={0.85}>
            <ChevronLeft size={22} color={theme.colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>New Habit</Text>
          <TouchableOpacity style={styles.saveButton} activeOpacity={0.85} onPress={handleSaveHabit}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.heroCard}>
          <Text style={styles.heroKicker}>Choose a habit type</Text>
          <View style={styles.presetGrid}>
            {PRESETS.map((preset, index) => {
              const active = selectedHabit === (preset.category === 'journal' ? 'journal' : preset.category);
              const Icon = () => renderPresetIcon(preset.category, active ? getPresetColor(preset.category) : theme.colors.text.secondary);

              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.presetWrapper, active && styles.presetWrapperActive]}
                  onPress={() => handleSelectPreset(preset)}
                  activeOpacity={0.8}
                >
                  <View style={styles.presetBox}>
                    <Icon />
                  </View>
                  <Text style={[styles.presetLabel, active && styles.presetLabelActive]} numberOfLines={1}>
                    {preset.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.fieldLabel}>Habit Name</Text>
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.input}
              value={habitName}
              onChangeText={(text) => {
                setHabitName(text);
                setHabitDraft({ title: text });
              }}
              placeholder="e.g. Drink Water"
              placeholderTextColor={theme.colors.text.tertiary}
            />
          </View>

          <TouchableOpacity style={styles.rowButton} onPress={handleNavigateToSelectDays} activeOpacity={0.85}>
            <Text style={styles.rowLabel}>Frequency</Text>
            <View style={styles.rowValue}>
              <Text style={styles.rowValueText}>{frequencyLabel}</Text>
              <ChevronRight size={18} color={theme.colors.text.secondary} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.rowButton} onPress={handleOpenTimePicker} activeOpacity={0.85}>
            <Text style={styles.rowLabel}>Reminder Time</Text>
            <View style={styles.rowValue}>
              <Text style={styles.rowValueText}>{reminderTime}</Text>
              <ChevronRight size={18} color={theme.colors.text.secondary} />
            </View>
          </TouchableOpacity>

          <View style={styles.repeatContainer}>
            <Text style={styles.repeatLabel}>Repeat</Text>
            <View style={styles.repeatRow}>
              {WEEKDAY_SHORT.map((day, idx) => {
                const isActive = repeatDays.includes(idx);
                return (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => {
                      const next = isActive ? repeatDays.filter((d) => d !== idx) : [...repeatDays, idx].sort((a, b) => a - b);
                      setRepeatDays(next);
                      setHabitDraft({ repeatDays: next });
                    }}
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

          <View style={styles.previewContainer}>
            <Text style={styles.previewLabel}>Notification Preview</Text>
            <View style={styles.previewBox}>
              <View style={styles.previewHeaderRow}>
                <Text style={styles.previewHeaderTitle}>Streak Notification</Text>
                <Text style={styles.previewHeaderTime}>now</Text>
              </View>
              <Text style={styles.previewText}>
                Time to {habitName.trim() || 'drink water'} {DEFAULT_EMOJIS[selectedHabit]}
              </Text>
              <Text style={styles.previewSubtitle}>Tap to log it.</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal visible={timePickerVisible} transparent animationType="slide" onRequestClose={() => setTimePickerVisible(false)}>
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.modalScrim} activeOpacity={1} onPress={() => setTimePickerVisible(false)} />
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Reminder Time</Text>
              <TouchableOpacity onPress={handleSaveTime} activeOpacity={0.7}>
                <Text style={styles.modalDoneText}>Done</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.pickerContainer}>
              <View style={styles.pickerColumn}>
                <Text style={styles.pickerColumnLabel}>Hour</Text>
                <FlatList
                  data={hoursList}
                  keyExtractor={(item) => item}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.columnScrollContent}
                  renderItem={({ item }) => {
                    const isSelected = item === String(currentHour12).padStart(2, '0');
                    return (
                      <TouchableOpacity style={[styles.pickerItem, isSelected && styles.pickerItemActive]} onPress={() => setPickerHour(item)}>
                        <Text style={[styles.pickerItemText, isSelected && { color: theme.colors.accent.DEFAULT, fontWeight: '800' }]}>{item}</Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>

              <View style={styles.pickerColumn}>
                <Text style={styles.pickerColumnLabel}>Min</Text>
                <FlatList
                  data={minutesList}
                  keyExtractor={(item) => item}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.columnScrollContent}
                  renderItem={({ item }) => {
                    const isSelected = item === String(currentMinute).padStart(2, '0');
                    return (
                      <TouchableOpacity style={[styles.pickerItem, isSelected && styles.pickerItemActive]} onPress={() => setPickerMinute(item)}>
                        <Text style={[styles.pickerItemText, isSelected && { color: theme.colors.accent.DEFAULT, fontWeight: '800' }]}>{item}</Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>

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
                      <TouchableOpacity style={[styles.pickerItem, isSelected && styles.pickerItemActive]} onPress={() => setPickerAmpm(item)}>
                        <Text style={[styles.pickerItemText, isSelected && { color: theme.colors.accent.DEFAULT, fontWeight: '800' }]}>{item}</Text>
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
  content: {
    paddingHorizontal: 20,
    paddingBottom: theme.spacing.xxxl,
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
  saveButton: {
    height: 40,
    justifyContent: 'center',
  },
  saveText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.accent.DEFAULT,
  },
  heroCard: {
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    padding: theme.spacing.base,
    gap: theme.spacing.md,
  },
  heroKicker: {
    ...theme.typography.overline,
    color: theme.colors.text.tertiary,
  },
  presetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
  },
  presetWrapper: {
    width: GRID_ITEM_WIDTH,
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  presetWrapperActive: {
    opacity: 1,
  },
  presetBox: {
    width: GRID_ITEM_WIDTH - 4,
    height: GRID_ITEM_WIDTH - 4,
    borderRadius: theme.radius.md,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    borderColor: theme.colors.surface.border,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  presetLabel: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    color: theme.colors.text.secondary,
  },
  presetLabelActive: {
    color: theme.colors.text.primary,
    fontWeight: '700',
  },
  formCard: {
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    padding: theme.spacing.base,
    gap: theme.spacing.md,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: -6,
  },
  inputWrap: {
    backgroundColor: theme.colors.surface.input,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    paddingHorizontal: theme.spacing.md,
    height: 52,
    justifyContent: 'center',
  },
  input: {
    color: theme.colors.text.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  rowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    minHeight: 52,
  },
  rowLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  rowValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    maxWidth: '65%',
  },
  rowValueText: {
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
    flexWrap: 'wrap',
    gap: 8,
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
});
