import { AppBackground } from "@/components/layout/AppBackground";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { HabitProvider } from "@/context/HabitContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <HabitProvider>
        <AppBackground>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: 'transparent' },
            }}>
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
    </SafeAreaProvider>
  );
}

