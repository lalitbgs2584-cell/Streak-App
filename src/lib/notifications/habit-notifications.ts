import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { HabitFrequency, HabitRecord, HabitView, frequencyToLabel } from '@/lib/habits/types';
import { Href } from 'expo-router';

const REMINDER_CHANNEL_ID = 'habit-reminders';

export function getHabitNotificationRoute(habitId: string) {
  return {
    screen: '/(tabs)/today/[id]',
    habitId,
  };
}

export function buildHabitNotificationContent(habit: HabitRecord | HabitView) {
  return {
    title: `${habit.emoji ?? '💡'} ${habit.title}`,
    body: `Time for ${frequencyToLabel(habit.frequency)}. Tap to open the habit.`,
    data: getHabitNotificationRoute(habit.id),
    sound: 'notification.wav',
  };
}

export async function scheduleHabitNotifications(habit: HabitRecord | HabitView) {
  const content = buildHabitNotificationContent(habit);
  const scheduledIds: string[] = [];

  if (habit.frequency.kind === 'daily') {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content,
      trigger: {
        channelId: REMINDER_CHANNEL_ID,
        hour: habit.frequency.hour,
        minute: habit.frequency.minute,
        repeats: true,
      },
    });
    scheduledIds.push(notificationId);
    return scheduledIds;
  }

  for (const weekday of habit.frequency.weekdays) {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content,
      trigger: {
        channelId: REMINDER_CHANNEL_ID,
        weekday: weekday + 1,
        hour: habit.frequency.hour,
        minute: habit.frequency.minute,
        repeats: true,
      },
    });
    scheduledIds.push(notificationId);
  }

  return scheduledIds;
}

export async function cancelHabitNotifications(notificationIds: string[] = []) {
  for (const notificationId of notificationIds) {
    try {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
    } catch {
      // Ignore already-cancelled IDs.
    }
  }
}

export async function rescheduleHabitNotifications(habit: HabitRecord | HabitView, previousNotificationIds: string[] = []) {
  await cancelHabitNotifications(previousNotificationIds);
  const nextIds = await scheduleHabitNotifications(habit);
  return nextIds;
}

export function isNotificationTapData(value: unknown): value is { screen?: string; habitId?: string } {
  return typeof value === 'object' && value !== null;
}



const NOTIFICATION_SCREENS = {
  today: '../../../(tabs)/today/[id]',
  habit: '../../../(tabs)/habit/[id]',
} as const satisfies Record<string, Href>;

type NotificationScreenKey = keyof typeof NOTIFICATION_SCREENS;

function isNotificationScreenKey(value: string): value is NotificationScreenKey {
  return value in NOTIFICATION_SCREENS;
}

export function normalizeTapTarget(data: unknown): Href | null {
  if (!isNotificationTapData(data)) {
    return null;
  }

  if (typeof data.screen === 'string' && data.habitId && isNotificationScreenKey(data.screen)) {
    return {
      pathname: NOTIFICATION_SCREENS[data.screen],
      params: { id: data.habitId },
    } as Href;
  }

  if (typeof data.habitId === 'string') {
    return {
      pathname: '/(tabs)/today/[id]',
      params: { id: data.habitId },
    } as Href;
  }

  return null;
}

export async function setupNotificationChannel() {
  if (Platform.OS !== 'android') {
    return;
  }

  await Notifications.setNotificationChannelAsync(REMINDER_CHANNEL_ID, {
    name: 'Habit Reminders',
    importance: Notifications.AndroidImportance.HIGH,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#C6FF4F',
    sound: 'notification.wav',
  });
}

export const HABIT_NOTIFICATION_CHANNEL_ID = REMINDER_CHANNEL_ID;
