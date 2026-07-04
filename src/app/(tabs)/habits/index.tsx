import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Plus,
  Droplet,
  Flame,
  BookOpen,
  Code as CodeIcon,
  Activity,
  Brain,
  Accessibility,
  Book,
  GraduationCap,
  Moon,
  Utensils,
  Footprints,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen } from '@/components/layout/Screen';
import { useHabits } from '@/context/HabitContext';
import { theme } from '@/lib/theme';

// Dynamic Card Illustration showing a stylized vector matching the category
const HabitCardIllustration = ({ category, color }: { category: string; color: string }) => {
  const renderIcon = () => {
    const size = 24;
    switch (category) {
      case 'water':
        return <Droplet size={size} color={color} />;
      case 'running':
        return <Flame size={size} color={color} />;
      case 'read':
        return <BookOpen size={size} color={color} />;
      case 'code':
        return <CodeIcon size={size} color={color} />;
      case 'workout':
        return <Activity size={size} color={color} />;
      case 'meditate':
        return <Brain size={size} color={color} />;
      case 'stretching':
        return <Accessibility size={size} color={color} />;
      case 'journal':
        return <Book size={size} color={color} />;
      case 'study':
        return <GraduationCap size={size} color={color} />;
      case 'sleep':
        return <Moon size={size} color={color} />;
      case 'eating':
        return <Utensils size={size} color={color} />;
      case 'walking':
        return <Footprints size={size} color={color} />;
      default:
        return <Activity size={size} color={color} />;
    }
  };

  /**
   * NOTE FOR DYNAMIC ILLUSTRATIONS:
   * Currently, illustrations are drawn using vector icons (Lucide) inside stylized gradients.
   * If you want to load dynamic local PNGs/illustrations from the directory, you can swap this with:
   * 
   *   const illustrationImages = {
   *     water: require('@/assets/images/illustrations/water.png'),
   *     running: require('@/assets/images/illustrations/running.png'),
   *     // etc.
   *   };
   *   return <Image source={illustrationImages[category]} style={styles.imageIllustration} />
   */
  return (
    <View style={styles.illustrationBox}>
      <LinearGradient
        colors={[theme.colors.illustration.purpleTop, theme.colors.illustration.purpleBottom]}
        style={styles.illustrationGradient}
      >
        <View style={[styles.glowBlob, { backgroundColor: color, opacity: 0.15 }]} />
        <View style={styles.iconContainer}>{renderIcon()}</View>
      </LinearGradient>
    </View>
  );
};

export default function AllHabitsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { habits } = useHabits();

  const handleCardPress = (id: string) => {
    // Navigate back to the TodayStack dynamic route where the redesigned HabitDetail is rendered
    router.push({
      pathname: '/(tabs)/today/[id]',
      params: { id },
    });
  };

  const handleAddHabit = () => {
    router.push('/new-habit');
  };

  return (
    <Screen padded={false} edges={['bottom']}>
      {/* Header Bar */}
      <View style={[styles.header, { paddingTop: insets.top + theme.spacing.md }]}>
        <Text style={styles.headerTitle}>All Habits</Text>
        <TouchableOpacity
          onPress={handleAddHabit}
          style={styles.plusButton}
          activeOpacity={0.8}
        >
          <Plus size={20} color={theme.colors.accent.text} strokeWidth={3.5} />
        </TouchableOpacity>
      </View>

      {/* Scrollable Habits List */}
      <ScrollView
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      >
        {habits.map((habit) => {
          const categoryColor = theme.colors.habit[habit.category] || theme.colors.accent.DEFAULT;

          return (
            <TouchableOpacity
              key={habit.id}
              style={styles.habitCard}
              onPress={() => handleCardPress(habit.id)}
              activeOpacity={0.8}
            >
              {/* Left Column: Curved category illustration */}
              <HabitCardIllustration category={habit.category} color={categoryColor} />

              {/* Middle Column: Habit details */}
              <View style={styles.detailsContainer}>
                <Text style={styles.habitName} numberOfLines={1}>
                  {habit.title}
                </Text>
                <Text style={styles.habitSchedule} numberOfLines={1}>
                  {habit.reminder} - {habit.startTime}
                </Text>
              </View>

              {/* Right Column: Streak counter */}
              <View style={styles.streakContainer}>
                <Text style={styles.streakValue}>{habit.streak}</Text>
                <Text style={styles.streakLabel}>streak</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: theme.spacing.md,
    backgroundColor: 'transparent',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: theme.colors.text.primary,
  },
  plusButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: theme.colors.accent.DEFAULT,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.accent.DEFAULT,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xxxl,
  },
  habitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    height: 90,
  },
  illustrationBox: {
    width: 58,
    height: 58,
    borderRadius: theme.radius.md,
    overflow: 'hidden',
    marginRight: theme.spacing.md,
  },
  illustrationGradient: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  glowBlob: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
  },
  habitName: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  habitSchedule: {
    fontSize: 13,
    color: theme.colors.text.secondary,
    fontWeight: '500',
  },
  streakContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 50,
  },
  streakValue: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.accent.DEFAULT,
  },
  streakLabel: {
    fontSize: 11,
    color: theme.colors.text.secondary,
    fontWeight: '600',
    marginTop: -2,
    textTransform: 'lowercase',
  },
});