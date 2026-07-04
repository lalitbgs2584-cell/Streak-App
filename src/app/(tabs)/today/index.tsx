import { StyleSheet, View, ScrollView } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import TodayHeader from '@/components/ui/Today/Header/header';
import Progress from '@/components/ui/Today/Hero/hero';
import HabitCard from '@/components/ui/common/Card';
import { useHabits } from '@/context/HabitContext';
import { theme } from '@/lib/theme';

const Index = () => {
  const router = useRouter();
  const { habits, toggleHabit } = useHabits();

  const handleCardPress = (id: string) => {
    router.push({
      pathname: '/(tabs)/today/[id]',
      params: { id },
    });
  };

  const completedCount = habits.filter((h) => h.completed).length;
  const totalCount = habits.length;

  return (
    <View style={styles.container}>
      <TodayHeader />
      <Progress completed={completedCount} total={totalCount} />
      <ScrollView
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      >
        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            onPress={handleCardPress}
            onToggleComplete={toggleHabit}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xxxl,
  },
});