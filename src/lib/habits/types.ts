import { theme } from '@/lib/theme';

export type HabitCategory = keyof typeof theme.colors.habit;

export type HabitFrequency =
  | {
      kind: 'daily';
      hour: number;
      minute: number;
    }
  | {
      kind: 'weekly';
      weekdays: number[];
      hour: number;
      minute: number;
    };

export type HabitRecord = {
  id: string;
  userId: string;
  title: string;
  emoji: string;
  category: HabitCategory;
  description: string;
  frequency: HabitFrequency;
  repeatDays: number[];
  reminderTime: string;
  notificationIds: string[];
  streak: number;
  bestStreak: number;
  totalCompleted: number;
  lastCompletedISO: string | null;
  startDate: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
};

export type HabitView = HabitRecord & {
  reminder: string;
  subtitle: string;
  startTime: string;
  endTime: string;
  count: number;
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low';
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  timeZone: string;
  language: string;
  vibrationEnabled: boolean;
  notificationPermission: boolean;
  expoPushToken: string | null;
  createdAt: string;
  updatedAt: string;
};

export type HabitInput = {
  id?: string;
  title: string;
  emoji?: string;
  category: HabitCategory;
  description?: string;
  reminderTime: string;
  repeatDays: number[];
  frequencyKind?: HabitFrequency['kind'];
  notificationIds?: string[];
  userId?: string;
};

export const DEFAULT_USER_ID = 'local-user';

export const DEFAULT_PROFILE: UserProfile = {
  id: DEFAULT_USER_ID,
  name: 'Your Name',
  email: 'you@example.com',
  timeZone: 'Asia/Kolkata',
  language: 'English',
  vibrationEnabled: true,
  notificationPermission: false,
  expoPushToken: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const DEFAULT_EMOJIS: Record<HabitCategory, string> = {
  water: '💧',
  workout: '💪',
  read: '📚',
  meditate: '🧘',
  running: '🏃',
  sleep: '🌙',
  journal: '✍️',
  study: '🎓',
  code: '💻',
  eating: '🍽️',
  walking: '👣',
  stretching: '🤸',
};

export function formatTime(hour: number, minute: number) {
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const normalizedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${String(normalizedHour).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${suffix}`;
}

export function parseTimeString(time: string) {
  const match = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) {
    return { hour: 9, minute: 0 };
  }

  let hour = Number(match[1]);
  const minute = Number(match[2]);
  const period = match[3].toUpperCase();

  if (period === 'PM' && hour !== 12) hour += 12;
  if (period === 'AM' && hour === 12) hour = 0;
  return { hour, minute };
}

export function computeEndTime(time: string, durationMinutes = 30) {
  const { hour, minute } = parseTimeString(time);
  const totalMinutes = hour * 60 + minute + durationMinutes;
  const normalizedHour = Math.floor((totalMinutes % (24 * 60)) / 60);
  const normalizedMinute = totalMinutes % 60;
  return formatTime(normalizedHour, normalizedMinute);
}

export function normalizeRepeatDays(days: number[]) {
  return Array.from(new Set(days)).sort((a, b) => a - b);
}

export function frequencyFromDays(repeatDays: number[], reminderTime: string): HabitFrequency {
  const { hour, minute } = parseTimeString(reminderTime);
  const days = normalizeRepeatDays(repeatDays);
  return days.length === 7
    ? { kind: 'daily', hour, minute }
    : { kind: 'weekly', weekdays: days.length ? days : [1, 2, 3, 4, 5], hour, minute };
}

export function frequencyToLabel(frequency: HabitFrequency) {
  const parts = frequency.kind === 'daily' ? ['Daily'] : frequency.weekdays.map((day) => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day]);
  return frequency.kind === 'daily' ? 'Daily' : parts.join(', ');
}

export function habitToView(habit: HabitRecord): HabitView {
  const isCompletedToday = habit.lastCompletedISO === todayISODate();
  return {
    ...habit,
    reminder: frequencyToLabel(habit.frequency),
    subtitle: habit.description,
    startTime: habit.reminderTime,
    endTime: computeEndTime(habit.reminderTime),
    count: habit.totalCompleted,
    completed: isCompletedToday,
    priority: habit.category === 'water' || habit.category === 'workout' ? 'High' : habit.category === 'read' ? 'Medium' : 'Low',
  };
}

export function todayISODate(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function isSameDay(aISO: string | null, bISO: string) {
  return aISO === bISO;
}
