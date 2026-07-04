import { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import { registerForPushNotificationsAsync, setupNotificationChannel } from '@/lib/notifications/setup.notifications';
import { normalizeTapTarget } from '@/lib/notifications/habit-notifications';

type PushStatus = 'loading' | 'granted' | 'denied' | 'unavailable';

export function usePushNotifications() {
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<PushStatus>('loading');

  useEffect(() => {
    let isMounted = true;

    const routeFromResponse = (response: Notifications.NotificationResponse | null) => {
      if (!response) {
        return;
      }

      const target = normalizeTapTarget(response.notification.request.content.data);
      if (target) {
        router.push(target);
      }
    };

    const bootstrap = async () => {
      try {
        await setupNotificationChannel();
        const pushToken = await registerForPushNotificationsAsync();
        if (isMounted) {
          setToken(pushToken);
          setStatus('granted');
        }
      } catch {
        if (isMounted) {
          setStatus('denied');
        }
      }

      const lastResponse = await Notifications.getLastNotificationResponseAsync();
      routeFromResponse(lastResponse);
    };

    void bootstrap();

    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      routeFromResponse(response);
    });

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);

  return { token, status };
}
