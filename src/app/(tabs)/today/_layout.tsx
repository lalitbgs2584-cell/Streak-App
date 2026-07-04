import { Stack } from 'expo-router';

export default function TodayStack() {
    return (
        <Stack screenOptions={{ contentStyle: { backgroundColor: 'transparent' } }}>
            <Stack.Screen name="index" options={{ title: 'Today', headerShown: false }} />
            <Stack.Screen name="[id]" options={{ title: 'Habit Details', headerShown: false }} />
        </Stack>
    );
}