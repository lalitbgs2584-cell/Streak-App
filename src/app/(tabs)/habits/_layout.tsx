import { Stack } from "expo-router";

export default function HabitStack() {
    return (
        <Stack screenOptions={{ contentStyle: { backgroundColor: 'transparent' } }}>
            <Stack.Screen name="index" options={{ title: 'Habits', headerShown: false }} />
        </Stack>
    );
}