import * as SQLite from 'expo-sqlite';
import { randomUUID } from 'expo-crypto';
import {
  DEFAULT_EMOJIS,
  DEFAULT_PROFILE,
  DEFAULT_USER_ID,
  HabitCategory,
  HabitFrequency,
  HabitInput,
  HabitRecord,
  UserProfile,
  computeEndTime,
  frequencyFromDays,
  frequencyToLabel,
  habitToView,
  normalizeRepeatDays,
  parseTimeString,
  todayISODate,
} from './types';
import { theme } from '@/lib/theme';

type HabitRow = {
  id: string;
  userId: string;
  title: string;
  emoji: string;
  category: HabitCategory;
  description: string;
  frequencyKind: HabitFrequency['kind'];
  frequencyHour: number;
  frequencyMinute: number;
  repeatDays: string;
  reminderTime: string;
  notificationIds: string;
  streak: number;
  bestStreak: number;
  totalCompleted: number;
  lastCompletedISO: string | null;
  startDate: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: number;
};

type ProfileRow = UserProfile;

type HabitLogRow = {
  id: string;
  habitId: string;
  completedAt: string;
  completedDate: string;
  status: number;
  createdAt: string;
  updatedAt: string;
};

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

async function getDb() {
  if (!dbPromise) {
    dbPromise = SQLite.openDatabaseAsync('habit-tracker.db').then(async (db: SQLite.SQLiteDatabase) => {
      await db.execAsync(`
        PRAGMA journal_mode = WAL;
        PRAGMA foreign_keys = ON;

        CREATE TABLE IF NOT EXISTS app_profile (
          id TEXT PRIMARY KEY NOT NULL,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          timeZone TEXT NOT NULL,
          language TEXT NOT NULL,
          vibrationEnabled INTEGER NOT NULL DEFAULT 1,
          notificationPermission INTEGER NOT NULL DEFAULT 0,
          expoPushToken TEXT,
          createdAt TEXT NOT NULL,
          updatedAt TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS habits (
          id TEXT PRIMARY KEY NOT NULL,
          userId TEXT NOT NULL,
          title TEXT NOT NULL,
          emoji TEXT NOT NULL,
          category TEXT NOT NULL,
          description TEXT NOT NULL,
          frequencyKind TEXT NOT NULL,
          frequencyHour INTEGER NOT NULL,
          frequencyMinute INTEGER NOT NULL,
          repeatDays TEXT NOT NULL,
          reminderTime TEXT NOT NULL,
          notificationIds TEXT NOT NULL,
          streak INTEGER NOT NULL DEFAULT 0,
          bestStreak INTEGER NOT NULL DEFAULT 0,
          totalCompleted INTEGER NOT NULL DEFAULT 0,
          lastCompletedISO TEXT,
          startDate TEXT NOT NULL,
          createdAt TEXT NOT NULL,
          updatedAt TEXT NOT NULL,
          isDeleted INTEGER NOT NULL DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS habit_logs (
          id TEXT PRIMARY KEY NOT NULL,
          habitId TEXT NOT NULL,
          completedAt TEXT NOT NULL,
          completedDate TEXT NOT NULL,
          status INTEGER NOT NULL,
          createdAt TEXT NOT NULL,
          updatedAt TEXT NOT NULL
        );
      `);

      const profileCount = (await db.getFirstAsync('SELECT COUNT(*) as count FROM app_profile')) as { count: number } | null;
      if (!profileCount?.count) {
        const now = new Date().toISOString();
        await db.runAsync(
          `INSERT INTO app_profile
           (id, name, email, timeZone, language, vibrationEnabled, notificationPermission, expoPushToken, createdAt, updatedAt)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            DEFAULT_USER_ID,
            DEFAULT_PROFILE.name,
            DEFAULT_PROFILE.email,
            DEFAULT_PROFILE.timeZone,
            DEFAULT_PROFILE.language,
            DEFAULT_PROFILE.vibrationEnabled ? 1 : 0,
            DEFAULT_PROFILE.notificationPermission ? 1 : 0,
            DEFAULT_PROFILE.expoPushToken,
            now,
            now,
          ]
        );
      }

      const habitCount = (await db.getFirstAsync('SELECT COUNT(*) as count FROM habits')) as { count: number } | null;
      if (!habitCount?.count) {
        const now = new Date().toISOString();
        const seedHabitData: Array<Pick<HabitInput, 'title' | 'category' | 'reminderTime' | 'repeatDays'> & { description: string }> = [
          {
            title: 'Drink Water',
            category: 'water',
            reminderTime: '09:00 AM',
            repeatDays: [0, 1, 2, 3, 4, 5, 6],
            description: 'Stay hydrated and keep your focus sharp.',
          },
          {
            title: 'Code 1 Hour',
            category: 'code',
            reminderTime: '07:00 PM',
            repeatDays: [0, 1, 2, 3, 4, 5, 6],
            description: 'Ship one focused hour every day.',
          },
          {
            title: 'Read',
            category: 'read',
            reminderTime: '09:30 PM',
            repeatDays: [0, 1, 2, 3, 4, 5, 6],
            description: 'Read at least a few pages before bed.',
          },
        ];

        for (const item of seedHabitData) {
          const id = randomUUID();
          const repeatDays = normalizeRepeatDays(item.repeatDays);
          const frequency = frequencyFromDays(repeatDays, item.reminderTime);
          await db.runAsync(
            `INSERT INTO habits
             (id, userId, title, emoji, category, description, frequencyKind, frequencyHour, frequencyMinute,
              repeatDays, reminderTime, notificationIds, streak, bestStreak, totalCompleted, lastCompletedISO,
              startDate, createdAt, updatedAt, isDeleted)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              id,
              DEFAULT_USER_ID,
              item.title,
              DEFAULT_EMOJIS[item.category],
              item.category,
              item.description,
              frequency.kind,
              frequency.hour,
              frequency.minute,
              JSON.stringify(repeatDays),
              item.reminderTime,
              JSON.stringify([]),
              0,
              0,
              0,
              null,
              todayISODate(),
              now,
              now,
              0,
            ]
          );
        }
      }

      return db;
    });
  }

  return dbPromise;
}

function rowToProfile(row: ProfileRow): UserProfile {
  return {
    ...row,
    vibrationEnabled: Boolean(row.vibrationEnabled),
    notificationPermission: Boolean(row.notificationPermission),
  };
}

function rowToHabit(row: HabitRow): HabitRecord {
  return {
    id: row.id,
    userId: row.userId,
    title: row.title,
    emoji: row.emoji,
    category: row.category,
    description: row.description,
    frequency: {
      kind: row.frequencyKind,
      hour: row.frequencyHour,
      minute: row.frequencyMinute,
      ...(row.frequencyKind === 'weekly' ? { weekdays: JSON.parse(row.repeatDays) as number[] } : {}),
    } as HabitFrequency,
    repeatDays: JSON.parse(row.repeatDays) as number[],
    reminderTime: row.reminderTime,
    notificationIds: JSON.parse(row.notificationIds) as string[],
    streak: row.streak,
    bestStreak: row.bestStreak,
    totalCompleted: row.totalCompleted,
    lastCompletedISO: row.lastCompletedISO,
    startDate: row.startDate,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    isDeleted: Boolean(row.isDeleted),
  };
}

async function refreshHabitIfStale(db: SQLite.SQLiteDatabase, habit: HabitRecord) {
  const lastCompleted = habit.lastCompletedISO;
  if (!lastCompleted) {
    return habit;
  }

  const today = todayISODate();
  if (lastCompleted === today) {
    return habit;
  }

  const [year, month, day] = lastCompleted.split('-').map(Number);
  const last = new Date(year, month - 1, day);
  const now = new Date();
  const current = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffDays = Math.floor((current.getTime() - last.getTime()) / 86400000);

  if (diffDays > 1 && habit.streak !== 0) {
    const updatedAt = new Date().toISOString();
    await db.runAsync(
      `UPDATE habits SET streak = 0, updatedAt = ?, lastCompletedISO = NULL WHERE id = ?`,
      [updatedAt, habit.id]
    );
    return { ...habit, streak: 0, lastCompletedISO: null, updatedAt };
  }

  return habit;
}

export async function ensureHabitStorage() {
  await getDb();
}

export async function getProfile() {
  const db = await getDb();
  const row = await db.getFirstAsync<ProfileRow>('SELECT * FROM app_profile LIMIT 1');
  return row ? rowToProfile(row) : rowToProfile(DEFAULT_PROFILE);
}

export async function updateProfile(fields: Partial<Pick<UserProfile, 'name' | 'email' | 'timeZone' | 'language' | 'vibrationEnabled' | 'notificationPermission' | 'expoPushToken'>>) {
  const db = await getDb();
  const profile = await getProfile();
  const next = {
    ...profile,
    ...fields,
    updatedAt: new Date().toISOString(),
  };

  await db.runAsync(
    `UPDATE app_profile
     SET name = ?, email = ?, timeZone = ?, language = ?, vibrationEnabled = ?, notificationPermission = ?, expoPushToken = ?, updatedAt = ?
     WHERE id = ?`,
    [
      next.name,
      next.email,
      next.timeZone,
      next.language,
      next.vibrationEnabled ? 1 : 0,
      next.notificationPermission ? 1 : 0,
      next.expoPushToken,
      next.updatedAt,
      next.id,
    ]
  );

  return next;
}

export async function listHabits() {
  const db = await getDb();
  const rows = await db.getAllAsync<HabitRow>('SELECT * FROM habits WHERE isDeleted = 0 ORDER BY updatedAt DESC');
  const habits = [];
  for (const row of rows) {
    const habit = await refreshHabitIfStale(db, rowToHabit(row));
    habits.push(habit);
  }
  return habits.map((habit) => habitToView(habit));
}

export async function getHabitById(id: string) {
  const db = await getDb();
  const row = await db.getFirstAsync<HabitRow>('SELECT * FROM habits WHERE id = ? AND isDeleted = 0 LIMIT 1', [id]);
  if (!row) {
    return null;
  }
  const habit = await refreshHabitIfStale(db, rowToHabit(row));
  return habitToView(habit);
}

export async function createHabit(input: HabitInput) {
  const db = await getDb();
  const now = new Date().toISOString();
  const id = input.id ?? randomUUID();
  const repeatDays = normalizeRepeatDays(input.repeatDays);
  const frequency = frequencyFromDays(repeatDays, input.reminderTime);

  await db.runAsync(
    `INSERT INTO habits
     (id, userId, title, emoji, category, description, frequencyKind, frequencyHour, frequencyMinute,
      repeatDays, reminderTime, notificationIds, streak, bestStreak, totalCompleted, lastCompletedISO,
      startDate, createdAt, updatedAt, isDeleted)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)`,
    [
      id,
      input.userId ?? DEFAULT_USER_ID,
      input.title,
      input.emoji ?? DEFAULT_EMOJIS[input.category],
      input.category,
      input.description ?? `Time to focus on ${input.title.toLowerCase()}.`,
      frequency.kind,
      frequency.hour,
      frequency.minute,
      JSON.stringify(repeatDays),
      input.reminderTime,
      JSON.stringify(input.notificationIds ?? []),
      0,
      0,
      0,
      null,
      todayISODate(),
      now,
      now,
    ]
  );

  return getHabitById(id);
}

export async function updateHabitRecord(id: string, input: HabitInput) {
  const db = await getDb();
  const existing = await db.getFirstAsync<HabitRow>('SELECT * FROM habits WHERE id = ? AND isDeleted = 0 LIMIT 1', [id]);
  if (!existing) {
    throw new Error('Habit not found');
  }

  const now = new Date().toISOString();
  const repeatDays = normalizeRepeatDays(input.repeatDays);
  const frequency = frequencyFromDays(repeatDays, input.reminderTime);
  await db.runAsync(
    `UPDATE habits SET
      title = ?,
      emoji = ?,
      category = ?,
      description = ?,
      frequencyKind = ?,
      frequencyHour = ?,
      frequencyMinute = ?,
      repeatDays = ?,
      reminderTime = ?,
      notificationIds = ?,
      updatedAt = ?
     WHERE id = ?`,
    [
      input.title,
      input.emoji ?? DEFAULT_EMOJIS[input.category],
      input.category,
      input.description ?? `Time to focus on ${input.title.toLowerCase()}.`,
      frequency.kind,
      frequency.hour,
      frequency.minute,
      JSON.stringify(repeatDays),
      input.reminderTime,
      JSON.stringify(input.notificationIds ?? JSON.parse(existing.notificationIds || '[]')),
      now,
      id,
    ]
  );

  return getHabitById(id);
}

export async function setHabitNotificationIds(id: string, notificationIds: string[]) {
  const db = await getDb();
  const now = new Date().toISOString();
  await db.runAsync(
    `UPDATE habits SET notificationIds = ?, updatedAt = ? WHERE id = ?`,
    [JSON.stringify(notificationIds), now, id]
  );
  return getHabitById(id);
}

export async function deleteHabitRecord(id: string) {
  const db = await getDb();
  await db.runAsync(`UPDATE habits SET isDeleted = 1, updatedAt = ? WHERE id = ?`, [new Date().toISOString(), id]);
  return true;
}

export async function completeHabit(habitId: string) {
  const db = await getDb();
  const row = await db.getFirstAsync<HabitRow>('SELECT * FROM habits WHERE id = ? AND isDeleted = 0 LIMIT 1', [habitId]);
  if (!row) {
    throw new Error('Habit not found');
  }

  const habit = rowToHabit(row);
  const today = todayISODate();
  if (habit.lastCompletedISO === today) {
    return habitToView(habit);
  }

  const [year, month, day] = (habit.lastCompletedISO ?? '').split('-').map(Number);
  let nextStreak = 1;
  if (habit.lastCompletedISO) {
    const last = new Date(year, month - 1, day);
    const current = new Date();
    const currentDay = new Date(current.getFullYear(), current.getMonth(), current.getDate());
    const diffDays = Math.floor((currentDay.getTime() - last.getTime()) / 86400000);
    if (diffDays === 1) {
      nextStreak = habit.streak + 1;
    } else if (diffDays === 0) {
      nextStreak = habit.streak;
    } else if (diffDays > 1) {
      nextStreak = 1;
    }
  }

  const bestStreak = Math.max(habit.bestStreak, nextStreak);
  const totalCompleted = habit.totalCompleted + 1;
  const now = new Date().toISOString();

  await db.runAsync(
    `UPDATE habits SET streak = ?, bestStreak = ?, totalCompleted = ?, lastCompletedISO = ?, updatedAt = ? WHERE id = ?`,
    [nextStreak, bestStreak, totalCompleted, today, now, habitId]
  );

  await db.runAsync(
    `INSERT INTO habit_logs
     (id, habitId, completedAt, completedDate, status, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [randomUUID(), habitId, now, today, 1, now, now]
  );

  const updated = await getHabitById(habitId);
  return updated;
}

export async function getTodayStats() {
  const habits = await listHabits();
  const completedCount = habits.filter((habit) => habit.completed).length;
  const totalCount = habits.length;
  const bestStreak = habits.reduce((max, habit) => Math.max(max, habit.streak), 0);
  const longest = habits.reduce((max, habit) => Math.max(max, habit.bestStreak), 0);
  return {
    completedCount,
    totalCount,
    progress: totalCount ? Math.round((completedCount / totalCount) * 100) : 0,
    bestStreak,
    longest,
  };
}

export async function getHistorySummary() {
  const habits = await listHabits();
  const totalCompleted = habits.reduce((sum, habit) => sum + habit.totalCompleted, 0);
  const bestStreak = habits.reduce((max, habit) => Math.max(max, habit.bestStreak), 0);
  const completionRate = habits.length ? Math.round((totalCompleted / Math.max(habits.length * 10, 1)) * 100) : 0;
  return {
    totalCompleted,
    bestStreak,
    completionRate,
  };
}

export async function getHabitLogs(habitId: string) {
  const db = await getDb();
  return db.getAllAsync<HabitLogRow>('SELECT * FROM habit_logs WHERE habitId = ? ORDER BY completedDate DESC', [habitId]);
}

export function toHabitInputFromRecord(habit: HabitRecord): HabitInput {
  return {
    id: habit.id,
    title: habit.title,
    category: habit.category,
    emoji: habit.emoji,
    description: habit.description,
    reminderTime: habit.reminderTime,
    repeatDays: habit.repeatDays,
    notificationIds: habit.notificationIds,
    userId: habit.userId,
  };
}

export function defaultEmojiForCategory(category: HabitCategory) {
  return DEFAULT_EMOJIS[category];
}

export function defaultDescriptionForTitle(title: string) {
  return `Time to focus on ${title.toLowerCase()}.`;
}

export function formatReminderLabel(days: number[]) {
  const normalized = normalizeRepeatDays(days);
  if (normalized.length === 7) {
    return 'Daily';
  }

  const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return normalized.map((day) => labels[day]).join(', ');
}

export function buildHabitInputFromForm({
  title,
  category,
  reminderTime,
  repeatDays,
  emoji,
  description,
  notificationIds,
  id,
}: HabitInput & { id?: string }) {
  return {
    id,
    title,
    category,
    reminderTime,
    repeatDays,
    emoji,
    description,
    notificationIds,
  };
}
