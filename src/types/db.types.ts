export type CreateUserInput = {
  name: string;
  timeZone?: string;
  language?: string;
  vibrationEnabled?: boolean;
  notificationPermission?: boolean;
};

export type CreateHabitInput = {
  userId: string;
  title: string;
  emoji: string;
  icon?: string;
  type?: string; // 'daily' | 'weekly'
  startDate: string; // 'YYYY-MM-DD'
  endDate?: string;
  reminderEnabled?: boolean;
};

export type CreateHabitLogInput = {
  habitId: string;
  completedAt: string; // ISO datetime
  completedDate: string; // 'YYYY-MM-DD'
  status: number; // 0 = missed, 1 = completed, 2 = skipped (tu decide kar)
};

export type CreateHabitReminderInput = {
  habitId: string;
  reminderTime: string; // e.g. '08:00 AM'
  repeatType?: string; // 'daily' | 'weekly' | 'interval'
  repeatDays?: string[]; // ['Mon','Wed']
  intervalHours?: number;
  snoozeEnabled?: boolean;
  snoozeMinutes?: number;
  maxReminderPerDay?: number;
};
export type CreateNotificationLogInput = {
  reminderId: string;
  habitId: string;
  notificationId?: string;
  scheduledFor: string; // ISO datetime
};

export type CreateStatisticsInput = {
  userId: string;
};