import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export async function setupNotificationChannel() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('habit-reminders', {
      name: 'Habit Reminders',
      importance: Notifications.AndroidImportance.HIGH, // pop-up + sound
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#4ade80',
    });
  }
}

// Foreground handler — controls what happens if a notif fires while app is OPEN
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function requestPermissions() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus; // 'granted' | 'denied' | 'undetermined'
}