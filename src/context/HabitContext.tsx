import React, { createContext, useContext, useState, ReactNode } from 'react';
import { theme } from '@/lib/theme';

export type Habit = {
  id: string;
  title: string;
  description: string;
  reminder: string;
  startTime: string;
  endTime: string;
  priority: 'High' | 'Medium' | 'Low';
  streak: number;
  count: number;
  completed: boolean;
  category: keyof typeof theme.colors.habit;
};

type HabitContextType = {
  habits: Habit[];
  toggleHabit: (id: string) => void;
  deleteHabit: (id: string) => void;
  addHabit: (habit: Omit<Habit, 'id' | 'streak' | 'count' | 'completed'>) => void;
  updateHabit: (habit: Habit) => void;
};

const HabitContext = createContext<HabitContextType | undefined>(undefined);

const INITIAL_HABITS: Habit[] = [
  {
    id: '1',
    title: 'Drink Water',
    description: 'Stay hydrated and drink enough water.',
    reminder: 'Every day',
    startTime: '09:00 AM',
    endTime: '09:30 AM',
    priority: 'High',
    streak: 12,
    count: 18,
    completed: false,
    category: 'water',
  },
  {
    id: '2',
    title: 'Morning Running',
    description: 'Keep up the cardiovascular health.',
    reminder: 'Mon, Wed, Fri',
    startTime: '07:00 AM',
    endTime: '07:45 AM',
    priority: 'High',
    streak: 5,
    count: 8,
    completed: false,
    category: 'running',
  },
  {
    id: '3',
    title: 'Read Books',
    description: 'Read at least 10 pages of a book.',
    reminder: 'Every day',
    startTime: '09:00 PM',
    endTime: '09:30 PM',
    priority: 'Medium',
    streak: 24,
    count: 30,
    completed: true,
    category: 'read',
  },
];

export function HabitProvider({ children }: { children: ReactNode }) {
  const [habits, setHabits] = useState<Habit[]>(() => {
    // Sort initially: incomplete first, completed last
    return [...INITIAL_HABITS].sort((a, b) => (a.completed ? 1 : 0) - (b.completed ? 1 : 0));
  });

  const toggleHabit = (id: string) => {
    setHabits((prev) => {
      const updated = prev.map((h) => {
        if (h.id === id) {
          const isCompleting = !h.completed;
          return {
            ...h,
            completed: isCompleting,
            streak: isCompleting ? h.streak + 1 : Math.max(0, h.streak - 1),
            count: isCompleting ? h.count + 1 : Math.max(0, h.count - 1),
          };
        }
        return h;
      });
      return [...updated].sort((a, b) => (a.completed ? 1 : 0) - (b.completed ? 1 : 0));
    });
  };

  const deleteHabit = (id: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  const addHabit = (newHabitData: Omit<Habit, 'id' | 'streak' | 'count' | 'completed'>) => {
    setHabits((prev) => {
      const newHabit: Habit = {
        ...newHabitData,
        id: Math.random().toString(),
        streak: 0,
        count: 0,
        completed: false,
      };
      const updated = [newHabit, ...prev];
      return [...updated].sort((a, b) => (a.completed ? 1 : 0) - (b.completed ? 1 : 0));
    });
  };

  const updateHabit = (updatedHabit: Habit) => {
    setHabits((prev) => {
      const updated = prev.map((h) => (h.id === updatedHabit.id ? updatedHabit : h));
      return [...updated].sort((a, b) => (a.completed ? 1 : 0) - (b.completed ? 1 : 0));
    });
  };

  return (
    <HabitContext.Provider value={{ habits, toggleHabit, deleteHabit, addHabit, updateHabit }}>
      {children}
    </HabitContext.Provider>
  );
}

export function useHabits() {
  const context = useContext(HabitContext);
  if (context === undefined) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
}
