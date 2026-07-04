export interface HabitDraft {
  title: string;
  category: string;
  frequency: string;
  reminderTime: string;
  repeatDays: number[]; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
}

let draft: HabitDraft = {
  title: '',
  category: 'water',
  frequency: 'Daily',
  reminderTime: '09:00 AM',
  repeatDays: [1, 2, 3, 4, 5], // Monday to Friday by default
};

export const getHabitDraft = (): HabitDraft => draft;

export const setHabitDraft = (newDraft: Partial<HabitDraft>): void => {
  draft = { ...draft, ...newDraft };
};

export const resetHabitDraft = (): void => {
  draft = {
    title: '',
    category: 'water',
    frequency: 'Daily',
    reminderTime: '09:00 AM',
    repeatDays: [1, 2, 3, 4, 5],
  };
};
