import { AppBackground } from '@/components/layout/AppBackground';
import { HabitProvider } from '@/context/HabitContext';
import { TokenProvider, useToken } from '@/lib/context/Token.context';
import { usePushNotifications } from '@/lib/hooks/use-push-notifications';
import { Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useHabits } from '@/lib/hooks/use-habits';

function NotificationBootstrapper() {
  const { token, status } = usePushNotifications();
  const { setToken } = useToken();
  const { updateUserProfile } = useHabits();

  useEffect(() => {
    if (token) {
      setToken(token);
    }
  }, [setToken, token]);

  useEffect(() => {
    void updateUserProfile({
      notificationPermission: status === 'granted',
      expoPushToken: token,
    });
  }, [status, token, updateUserProfile]);

  return null;
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <TokenProvider>
        <HabitProvider>
          <NotificationBootstrapper />
          <AppBackground>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: 'transparent' },
              }}
            >
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="new-habit" options={{ headerShown: false, presentation: 'modal' }} />
              <Stack.Screen name="select-days" options={{ headerShown: false }} />
              <Stack.Screen name="edit-habit/[id]" options={{ headerShown: false, presentation: 'modal' }} />
              <Stack.Screen name="onboarding" options={{ headerShown: false }} />
              <Stack.Screen name="signup" options={{ headerShown: false }} />
              <Stack.Screen name="streak-detail" options={{ headerShown: false }} />
            </Stack>
          </AppBackground>
        </HabitProvider>
      </TokenProvider>
    </SafeAreaProvider>
  );
}
