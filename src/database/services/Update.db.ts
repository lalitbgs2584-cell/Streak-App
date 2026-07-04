import * as SQLite from 'expo-sqlite';

// ---------- USER ----------

export const updateUser = async (
    db: SQLite.SQLiteDatabase,
    id: string,
    fields: Partial<{
        name: string;
        notificationPermission: boolean;
        isActive: boolean;
        timeZone: string;
        language: string;
        vibrationEnabled: boolean;
    }>
) => {
    try {
        const keys = Object.keys(fields);
        if (keys.length === 0) return null;

        const setClause = keys.map((k) => `${k} = ?`).join(', ');
        const values = keys.map((k) => (fields as any)[k]);

        await db.runAsync(
            `UPDATE User SET ${setClause}, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
            [...values, id]
        );
        return true;
    } catch (error) {
        console.error('updateUser failed:', error);
        throw error;
    }
};

// ---------- HABIT ----------

export const updateHabit = async (
    db: SQLite.SQLiteDatabase,
    id: string,
    fields: Partial<{
        title: string;
        icon: string;
        type: string;
        startDate: string;
        endDate: string;
        status: string;
        reminderEnabled: boolean;
    }>
) => {
    try {
        const keys = Object.keys(fields);
        if (keys.length === 0) return null;

        const setClause = keys.map((k) => `${k} = ?`).join(', ');
        const values = keys.map((k) => (fields as any)[k]);

        await db.runAsync(
            `UPDATE Habit SET ${setClause}, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
            [...values, id]
        );
        return true;
    } catch (error) {
        console.error('updateHabit failed:', error);
        throw error;
    }
};

// Habit ko "done" mark karna — streak logic yahan handle hoti hai
export const markHabitDone = async (
    db: SQLite.SQLiteDatabase,
    habitId: string,
    completedDate: string // 'YYYY-MM-DD'
) => {
    try {
        const habit = await db.getFirstAsync<{
            currentStreak: number;
            bestStreak: number;
            totalCompleted: number;
            updatedAt: string;
        }>('SELECT currentStreak, bestStreak, totalCompleted, updatedAt FROM Habit WHERE id = ?', [habitId]);

        if (!habit) throw new Error('Habit not found');

        // last completed date nikalne ke liye latest HabitLog dekho
        const lastLog = await db.getFirstAsync<{ completedDate: string }>(
            `SELECT completedDate FROM HabitLog WHERE habitId = ? AND status = 1
             ORDER BY completedDate DESC LIMIT 1`,
            [habitId]
        );

        let newStreak = 1;
        if (lastLog) {
            const last = new Date(lastLog.completedDate);
            const today = new Date(completedDate);
            const diffDays = Math.round((today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                newStreak = habit.currentStreak + 1; // consecutive day
            } else if (diffDays === 0) {
                newStreak = habit.currentStreak; // already marked today, no change
            } else {
                newStreak = 1; // gap → streak reset
            }
        }

        const newBest = Math.max(habit.bestStreak, newStreak);
        const newTotal = habit.totalCompleted + 1;

        await db.runAsync(
            `UPDATE Habit SET currentStreak = ?, bestStreak = ?, totalCompleted = ?, updatedAt = CURRENT_TIMESTAMP
             WHERE id = ?`,
            [newStreak, newBest, newTotal, habitId]
        );

        return { currentStreak: newStreak, bestStreak: newBest, totalCompleted: newTotal };
    } catch (error) {
        console.error('markHabitDone failed:', error);
        throw error;
    }
};

// Missed day detect hone par streak reset karne ke liye (e.g. app open hone par cron-jaisa check)
export const resetHabitStreak = async (db: SQLite.SQLiteDatabase, habitId: string) => {
    try {
        await db.runAsync(
            `UPDATE Habit SET currentStreak = 0, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
            [habitId]
        );
        return true;
    } catch (error) {
        console.error('resetHabitStreak failed:', error);
        throw error;
    }
};

// ---------- HABIT LOG ----------

export const updateHabitLog = async (
    db: SQLite.SQLiteDatabase,
    id: string,
    fields: Partial<{ status: number; completedAt: string; completedDate: string }>
) => {
    try {
        const keys = Object.keys(fields);
        if (keys.length === 0) return null;

        const setClause = keys.map((k) => `${k} = ?`).join(', ');
        const values = keys.map((k) => (fields as any)[k]);

        await db.runAsync(
            `UPDATE HabitLog SET ${setClause}, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
            [...values, id]
        );
        return true;
    } catch (error) {
        console.error('updateHabitLog failed:', error);
        throw error;
    }
};

// ---------- HABIT REMINDER ----------
// NOTE: notification cancel/reschedule (Expo side) schedule.ts mein hoga.
// Ye sirf DB update karta hai — naya notificationId already schedule ho chuka hoga jab tu ye call karega.

export const updateHabitReminder = async (
    db: SQLite.SQLiteDatabase,
    id: string,
    fields: Partial<{
        enabled: boolean;
        reminderTime: string;
        repeatType: string;
        repeatDays: string[];
        intervalHours: number;
        notificationId: string;
        snoozeEnabled: boolean;
        snoozeMinutes: number;
        maxReminderPerDay: number;
        isActive: boolean;
    }>
) => {
    try {
        const keys = Object.keys(fields);
        if (keys.length === 0) return null;

        const setClause = keys.map((k) => `${k} = ?`).join(', ');
        const values = keys.map((k) =>
            k === 'repeatDays' ? JSON.stringify((fields as any)[k]) : (fields as any)[k]
        );

        await db.runAsync(
            `UPDATE HabitReminder SET ${setClause}, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
            [...values, id]
        );
        return true;
    } catch (error) {
        console.error('updateHabitReminder failed:', error);
        throw error;
    }
};

export const incrementReminderCount = async (db: SQLite.SQLiteDatabase, id: string) => {
    try {
        await db.runAsync(
            `UPDATE HabitReminder SET reminderCount = reminderCount + 1, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
            [id]
        );
        return true;
    } catch (error) {
        console.error('incrementReminderCount failed:', error);
        throw error;
    }
};

export const incrementSnoozeCount = async (db: SQLite.SQLiteDatabase, id: string) => {
    try {
        await db.runAsync(
            `UPDATE HabitReminder SET snoozeCount = snoozeCount + 1, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
            [id]
        );
        return true;
    } catch (error) {
        console.error('incrementSnoozeCount failed:', error);
        throw error;
    }
};

// ---------- NOTIFICATION LOG ----------

export const updateNotificationStatus = async (
    db: SQLite.SQLiteDatabase,
    notificationId: string,
    status: 'delivered' | 'tapped' | 'snoozed' | 'dismissed' | 'missed',
    extra?: { firedAt?: string; snoozedTo?: string }
) => {
    try {
        await db.runAsync(
            `UPDATE NotificationLog
             SET status = ?, firedAt = COALESCE(?, firedAt), snoozedTo = COALESCE(?, snoozedTo)
             WHERE notificationId = ?`,
            [status, extra?.firedAt ?? null, extra?.snoozedTo ?? null, notificationId]
        );
        return true;
    } catch (error) {
        console.error('updateNotificationStatus failed:', error);
        throw error;
    }
};

// ---------- STATISTICS ----------

export const updateStatistics = async (
    db: SQLite.SQLiteDatabase,
    userId: string,
    fields: Partial<{
        totalHabits: number;
        totalCompleted: number;
        totalSkipped: number;
        totalMissed: number;
        longestStreak: number;
        totalReminderSent: number;
        totalReminderMissed: number;
        totalReminderSnoozed: number;
    }>
) => {
    try {
        const keys = Object.keys(fields);
        if (keys.length === 0) return null;

        const setClause = keys.map((k) => `${k} = ?`).join(', ');
        const values = keys.map((k) => (fields as any)[k]);

        await db.runAsync(
            `UPDATE Statistics SET ${setClause}, updatedAt = CURRENT_TIMESTAMP WHERE userId = ?`,
            [...values, userId]
        );
        return true;
    } catch (error) {
        console.error('updateStatistics failed:', error);
        throw error;
    }
};

// Recompute karke Statistics table refresh karna (poore user ke liye)
export const recalculateStatistics = async (db: SQLite.SQLiteDatabase, userId: string) => {
    try {
        await db.runAsync(
            `UPDATE Statistics SET
                totalHabits = (SELECT COUNT(*) FROM Habit WHERE userId = ? AND isDeleted = FALSE),
                totalCompleted = (SELECT COALESCE(SUM(totalCompleted), 0) FROM Habit WHERE userId = ?),
                longestStreak = (SELECT COALESCE(MAX(bestStreak), 0) FROM Habit WHERE userId = ?),
                updatedAt = CURRENT_TIMESTAMP
             WHERE userId = ?`,
            [userId, userId, userId, userId]
        );
        return true;
    } catch (error) {
        console.error('recalculateStatistics failed:', error);
        throw error;
    }
};