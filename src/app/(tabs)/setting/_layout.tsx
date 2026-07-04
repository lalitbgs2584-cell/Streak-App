import { Stack } from 'expo-router';

export default function SettingStack() {
    return (
        <Stack screenOptions={{ contentStyle: { backgroundColor: 'transparent' } }}>
            <Stack.Screen name="index" options={{ title: 'Setting', headerShown: false }} />
            <Stack.Screen name="notification-permission" options={{ title: 'Permission', headerShown: false }} />
            <Stack.Screen name="notification-sound" options={{ title: 'Push Token', headerShown: false }} />
            <Stack.Screen name="language" options={{ title: 'Language', headerShown: false }} />
            <Stack.Screen name="about" options={{ title: 'About', headerShown: false }} />
            <Stack.Screen name="help-support" options={{ title: 'Help & Support', headerShown: false }} />
        </Stack>
    );
}
