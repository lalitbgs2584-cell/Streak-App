import * as SQLite from 'expo-sqlite';

export const initDB = async () => {
  const db = await SQLite.openDatabaseAsync('streak_db.db');

  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS User (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      currentStreak INTEGER NOT NULL,
      maxStreak INTEGER NOT NULL,
      theme TEXT NOT NULL,
      remindersEnabled BOOLEAN NOT NULL,
      reminders
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL
      );

      
      `);

  return db;
};