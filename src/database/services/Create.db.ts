import * as SQLite from 'expo-sqlite';
import { randomUUID } from 'expo-crypto';
import { CreateHabitInput, CreateHabitLogInput, CreateHabitReminderInput, CreateNotificationLogInput, CreateStatisticsInput, CreateUserInput } from '@/types/db.types';



// ---------- CREATE FUNCTIONS ----------

export const createUser = async (db: SQLite.SQLiteDatabase, input: CreateUserInput) => {
  const id = randomUUID();
  await db.runAsync(
    `INSERT INTO User (id, name,  timeZone, language, vibrationEnabled, notificationPermission)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      id,
      input.name,
      input.timeZone ?? 'Asia/Kolkata',
      input.language ?? 'en',
      input.vibrationEnabled ?? true,
      input.notificationPermission ?? false,
    ]
  );
  return id;
};

export const createHabit = async (db: SQLite.SQLiteDatabase, input: CreateHabitInput) => {
  const id = randomUUID();
  await db.runAsync(
    `INSERT INTO Habit
     (id, userId, title, emoji,   type, startDate, endDate, reminderEnabled)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      input.userId,
      input.title,
      input.emoji,
      input.type ?? 'daily',
      input.startDate,
      input.endDate ?? null,
      input.reminderEnabled ?? false,
    ]
  );
  return id;
};

export const createHabitLog = async (db: SQLite.SQLiteDatabase, input: CreateHabitLogInput) => {
  const id = randomUUID();
  await db.runAsync(
    `INSERT INTO HabitLog (id, habitId, completedAt, completedDate, status)
     VALUES (?, ?, ?, ?, ?)`,
    [
      id,
      input.habitId,
      input.completedAt,
      input.completedDate,
      input.status,
    ]
  );
  return id;
};

export const createHabitReminder = async (db: SQLite.SQLiteDatabase, input: CreateHabitReminderInput) => {
  const id = randomUUID();
  await db.runAsync(
    `INSERT INTO HabitReminder
     (id, habitId, reminderTime, repeatType, repeatDays, intervalHours, snoozeEnabled, snoozeMinutes, maxReminderPerDay)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      input.habitId,
      input.reminderTime,
      input.repeatType ?? 'daily',
      JSON.stringify(input.repeatDays ?? []),
      input.intervalHours ?? null,
      input.snoozeEnabled ?? false,
      input.snoozeMinutes ?? 10,
      input.maxReminderPerDay ?? 1,
    ]
  );
  return id;
};

export const createNotificationLog = async (db: SQLite.SQLiteDatabase, input: CreateNotificationLogInput) => {
  const id = randomUUID();
  await db.runAsync(
    `INSERT INTO NotificationLog (id, reminderId, habitId, notificationId, scheduledFor, status)
     VALUES (?, ?, ?, ?, ?, 'scheduled')`,
    [id, input.reminderId, input.habitId, input.notificationId ?? null, input.scheduledFor]
  );
  return id;
};

export const createStatistics = async (db: SQLite.SQLiteDatabase, input: CreateStatisticsInput) => {
  const id = randomUUID();
  await db.runAsync(
    `INSERT INTO Statistics (id, userId)
     VALUES (?, ?)`,
    [id, input.userId]
  );
  return id;
};