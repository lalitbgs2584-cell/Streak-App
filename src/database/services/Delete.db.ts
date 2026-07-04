import * as SQLite from 'expo-sqlite';

// ---------- USER ----------
// Hard delete — CASCADE se Habit, HabitLog, HabitReminder, NotificationLog, Statistics sab chala jayega
export const deleteUser = async (db: SQLite.SQLiteDatabase, id: string) => {
    try {
        await db.runAsync('DELETE FROM User WHERE id = ?', [id]);
        return true;
    } catch (error) {
        console.error('deleteUser failed:', error);
        throw error;
    }
};

// ---------- HABIT ----------

// Soft delete (recommended) — habit list se hata do but data rakho for stats/history
export const softDeleteHabit = async (db: SQLite.SQLiteDatabase, id: string) => {
    try {
        await db.runAsync(
            `UPDATE Habit SET isDeleted = TRUE, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
            [id]
        );
        return true;
    } catch (error) {
        console.error('softDeleteHabit failed:', error);
        throw error;
    }
};

// Hard delete — CASCADE se HabitLog, HabitReminder, NotificationLog (habitId wale) sab chale jayenge
// ⚠️ IMPORTANT: isko call karne SE PEHLE, schedule.ts mein us habit ke saare
// notificationIds ko Notifications.cancelScheduledNotificationAsync() se cancel kar lena.
// Assignment requirement: "only that habit's notifications should be cancelled, not all"
// Isliye cancel-logic yahan DB layer mein nahi, notification layer (schedule.ts) mein honi chahiye —
// pehle woh reminders fetch karo (getUserReminders), unke notificationId cancel karo, phir ye call karo.
export const deleteHabit = async (db: SQLite.SQLiteDatabase, id: string) => {
    try {
        await db.runAsync('DELETE FROM Habit WHERE id = ?', [id]);
        return true;
    } catch (error) {
        console.error('deleteHabit failed:', error);
        throw error;
    }
};

// ---------- HABIT LOG ----------

export const deleteHabitLog = async (db: SQLite.SQLiteDatabase, id: string) => {
    try {
        await db.runAsync('DELETE FROM HabitLog WHERE id = ?', [id]);
        return true;
    } catch (error) {
        console.error('deleteHabitLog failed:', error);
        throw error;
    }
};

// Ek habit ke saare logs clear karna (e.g. "reset progress" feature)
export const deleteAllHabitLogsForHabit = async (db: SQLite.SQLiteDatabase, habitId: string) => {
    try {
        await db.runAsync('DELETE FROM HabitLog WHERE habitId = ?', [habitId]);
        return true;
    } catch (error) {
        console.error('deleteAllHabitLogsForHabit failed:', error);
        throw error;
    }
};

// ---------- HABIT REMINDER ----------

// ⚠️ Isko call karne se pehle bhi notificationId Expo se cancel karna:
// await Notifications.cancelScheduledNotificationAsync(reminder.notificationId)
export const deleteHabitReminder = async (db: SQLite.SQLiteDatabase, id: string) => {
    try {
        await db.runAsync('DELETE FROM HabitReminder WHERE id = ?', [id]);
        return true;
    } catch (error) {
        console.error('deleteHabitReminder failed:', error);
        throw error;
    }
};

// Soft-disable karna (delete se better jab sirf temporarily band karna ho)
export const disableHabitReminder = async (db: SQLite.SQLiteDatabase, id: string) => {
    try {
        await db.runAsync(
            `UPDATE HabitReminder SET isActive = FALSE, enabled = FALSE, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
            [id]
        );
        return true;
    } catch (error) {
        console.error('disableHabitReminder failed:', error);
        throw error;
    }
};

// ---------- NOTIFICATION LOG ----------

export const deleteNotificationLog = async (db: SQLite.SQLiteDatabase, id: string) => {
    try {
        await db.runAsync('DELETE FROM NotificationLog WHERE id = ?', [id]);
        return true;
    } catch (error) {
        console.error('deleteNotificationLog failed:', error);
        throw error;
    }
};

// Purane logs cleanup karna (e.g. 90 din se purane — storage bloat rokne ke liye)
export const deleteOldNotificationLogs = async (db: SQLite.SQLiteDatabase, olderThanDays: number = 90) => {
    try {
        await db.runAsync(
            `DELETE FROM NotificationLog WHERE createdAt < datetime('now', '-' || ? || ' days')`,
            [olderThanDays]
        );
        return true;
    } catch (error) {
        console.error('deleteOldNotificationLogs failed:', error);
        throw error;
    }
};

// ---------- STATISTICS ----------

export const deleteStatistics = async (db: SQLite.SQLiteDatabase, userId: string) => {
    try {
        await db.runAsync('DELETE FROM Statistics WHERE userId = ?', [userId]);
        return true;
    } catch (error) {
        console.error('deleteStatistics failed:', error);
        throw error;
    }
};