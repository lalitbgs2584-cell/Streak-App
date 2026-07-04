import * as SQLite from 'expo-sqlite';

export const initDB = async () => {
  const db = await SQLite.openDatabaseAsync('streak_db.db');

  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS User (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      notificationPermission BOOLEAN NOT NULL DEFAULT FALSE,
      isActive BOOLEAN NOT NULL DEFAULT TRUE,
      timeZone TEXT NOT NULL DEFAULT 'Asia/Kolkata',
      language TEXT NOT NULL DEFAULT 'en',
      vibrationEnabled BOOLEAN NOT NULL DEFAULT TRUE,
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS Habit (
      id TEXT PRIMARY KEY NOT NULL,
      userId TEXT NOT NULL,
      title TEXT NOT NULL,
      icon TEXT,
      type TEXT NOT NULL DEFAULT 'daily',
      startDate TEXT NOT NULL,
      endDate TEXT,
      status TEXT NOT NULL DEFAULT 'active',
      reminderEnabled BOOLEAN NOT NULL DEFAULT FALSE,
      currentStreak INTEGER NOT NULL DEFAULT 0,
      bestStreak INTEGER NOT NULL DEFAULT 0,
      totalCompleted INTEGER NOT NULL DEFAULT 0,
      completionRate REAL NOT NULL DEFAULT 0,
      isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS HabitLog (
      id TEXT PRIMARY KEY NOT NULL,
      habitId TEXT NOT NULL,
      completedAt DATETIME NOT NULL,
      completedDate TEXT NOT NULL,
      status INTEGER NOT NULL,
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (habitId) REFERENCES Habit(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS HabitReminder (
      id TEXT PRIMARY KEY NOT NULL,
      habitId TEXT NOT NULL,
      enabled BOOLEAN NOT NULL DEFAULT FALSE,
      reminderTime TEXT NOT NULL,
      repeatType TEXT NOT NULL DEFAULT 'daily',
      repeatDays TEXT NOT NULL DEFAULT '[]',
      intervalHours INTEGER,
      notificationId TEXT,
      snoozeEnabled BOOLEAN NOT NULL DEFAULT FALSE,
      snoozeMinutes INTEGER NOT NULL DEFAULT 10,
      maxReminderPerDay INTEGER NOT NULL DEFAULT 1,
      snoozeCount INTEGER NOT NULL DEFAULT 0,
      reminderCount INTEGER NOT NULL DEFAULT 0,
      isActive BOOLEAN NOT NULL DEFAULT TRUE,
      isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (habitId) REFERENCES Habit(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS Statistics (
      id TEXT PRIMARY KEY NOT NULL,
      userId TEXT NOT NULL,
      totalHabits INTEGER NOT NULL DEFAULT 0,
      totalCompleted INTEGER NOT NULL DEFAULT 0,
      totalSkipped INTEGER NOT NULL DEFAULT 0,
      totalMissed INTEGER NOT NULL DEFAULT 0,
      longestStreak INTEGER NOT NULL DEFAULT 0,
      totalReminderSent INTEGER NOT NULL DEFAULT 0,
      totalReminderMissed INTEGER NOT NULL DEFAULT 0,
      totalReminderSnoozed INTEGER NOT NULL DEFAULT 0,
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS NotificationLog (
      id TEXT PRIMARY KEY NOT NULL,
      reminderId TEXT NOT NULL,
      habitId TEXT NOT NULL,
      notificationId TEXT,              
      scheduledFor DATETIME NOT NULL,   
      firedAt DATETIME,                 
      status TEXT NOT NULL DEFAULT 'scheduled', -- scheduled / delivered / tapped / snoozed / dismissed / missed
      snoozedTo DATETIME,               
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (reminderId) REFERENCES HabitReminder(id) ON DELETE CASCADE,
      FOREIGN KEY (habitId) REFERENCES Habit(id) ON DELETE CASCADE
  );
  `);

  return db;
};