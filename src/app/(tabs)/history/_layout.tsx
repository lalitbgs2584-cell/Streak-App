import { Stack } from "expo-router";

export default function HistoryStack() {
    return (
        <Stack screenOptions={{ contentStyle: { backgroundColor: 'transparent' } }}>
            <Stack.Screen name="index" options={{ title: 'History', headerShown: false }} />
        </Stack>
    );
}