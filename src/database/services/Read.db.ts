import * as SQLite from 'expo-sqlite';

export const getUser = async (db: SQLite.SQLiteDatabase, id: string) => {
    try {
        const result = await db.getAllAsync('SELECT * FROM User WHERE id = ?', [id]);
        return result;
    } catch (error) {
        return error;
    }
};

export const getUserHabits = async (db: SQLite.SQLiteDatabase, userId: string) => {
    try {
        const result = await db.getAllAsync('SELECT * FROM Habit WHERE userId = ? AND isDeleted = FALSE', [userId]);
        return result;
    } catch (error) {
        return error;
    }
};

export const getUserHabitLog = async (db: SQLite.SQLiteDatabase, habitId: string) => {
    try {
        const result = await db.getAllAsync('SELECT * FROM HabitLog WHERE habitId = ?', [habitId]);
        return result;
    } catch (error) {
        return error;
    }
};

export const getUserNotificationLog = async (db: SQLite.SQLiteDatabase, reminderId: string) => {
    try {
        const result = await db.getAllAsync('SELECT * FROM NotificationLog WHERE reminderId=?', [reminderId])
        return result
    } catch (error) {
        return error
    }
}
export const getUserStatistics = async (db: SQLite.SQLiteDatabase, userId: string) => {
    try {
        const result = await db.getAllAsync('SELECT * FROM Statistics WHERE userId=?', [userId])
        return result
    } catch (error) {
        return error
    }
}

export const getUserReminders = async (db: SQLite.SQLiteDatabase, habitId: string) => {
    try {
        const result = await db.getAllAsync('SELECT * FROM HabitReminder WHERE habitId=? AND enabled = TRUE', [habitId])
        return result
    } catch (error) {
        return error
    }
}