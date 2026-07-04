import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
    const insets = useSafeAreaInsets();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#4ade80',
                tabBarInactiveTintColor: '#888',
                tabBarStyle: {
                    backgroundColor: '#0a0a0a',
                    borderTopWidth: 0,
                    height: 60 + insets.bottom,
                    paddingBottom: insets.bottom,
                    paddingTop: 8,
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '500',
                },
                sceneStyle: { backgroundColor: 'transparent' },
            }}>
            <Tabs.Screen
                name="today"
                options={{
                    title: "Today",
                    tabBarIcon: ({ color, size }) => <Ionicons name="today" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="habits"
                options={{
                    title: "Habits",
                    tabBarIcon: ({ color, size }) => <Ionicons name="repeat" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    title: "History",
                    tabBarIcon: ({ color, size }) => <Ionicons name="list" size={size} color={color} />,
                }}
            />
            
            <Tabs.Screen
                name="setting"
                options={{
                    title: "Setting",
                    tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} />,
                }}
            />
        </Tabs>
    );
}

