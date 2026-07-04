import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  HabitInput,
  HabitRecord,
  HabitView,
  UserProfile,
  createHabit,
  deleteHabitRecord,
  completeHabit,
  ensureHabitStorage,
  getProfile,
  listHabits,
  setHabitNotificationIds,
  updateHabitRecord,
  updateProfile,
  toHabitInputFromRecord,
} from '@/lib/habits/storage';
import { cancelHabitNotifications, rescheduleHabitNotifications } from '@/lib/notifications/habit-notifications';

type HabitContextType = {
  habits: HabitView[];
  profile: UserProfile | null;
  loading: boolean;
  refresh: () => Promise<void>;
  toggleHabit: (id: string) => Promise<void>;
  deleteHabit: (id: string) => Promise<void>;
  addHabit: (habit: HabitInput) => Promise<void>;
  updateHabit: (habit: HabitInput & { id: string }) => Promise<void>;
  updateUserProfile: (fields: Partial<Pick<UserProfile, 'name' | 'email' | 'timeZone' | 'language' | 'vibrationEnabled' | 'notificationPermission' | 'expoPushToken'>>) => Promise<void>;
  getHabitById: (id: string) => HabitView | undefined;
};

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export function HabitProvider({ children }: { children: ReactNode }) {
  const [habits, setHabits] = useState<HabitView[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    await ensureHabitStorage();
    const [nextHabits, nextProfile] = await Promise.all([listHabits(), getProfile()]);
    setHabits(nextHabits);
    setProfile(nextProfile);
    setLoading(false);
  };

  useEffect(() => {
    void refresh();
  }, []);

  const syncHabits = async () => {
    const nextHabits = await listHabits();
    setHabits(nextHabits);
  };

  const addHabit = async (habit: HabitInput) => {
    const created = await createHabit(habit);
    if (!created) {
      return;
    }

    const nextNotificationIds = await rescheduleHabitNotifications(created, []);
    await setHabitNotificationIds(created.id, nextNotificationIds);
    await syncHabits();
  };

  const updateHabit = async (habit: HabitInput & { id: string }) => {
    const current = habits.find((item) => item.id === habit.id);
    const updated = await updateHabitRecord(habit.id, habit);
    if (!updated) {
      return;
    }

    const nextNotificationIds = await rescheduleHabitNotifications(updated, current?.notificationIds ?? []);
    await setHabitNotificationIds(updated.id, nextNotificationIds);
    await syncHabits();
  };

  const deleteHabit = async (id: string) => {
    const current = habits.find((item) => item.id === id);
    if (current) {
      await cancelHabitNotifications(current.notificationIds);
    }
    await deleteHabitRecord(id);
    await syncHabits();
  };

  const toggleHabit = async (id: string) => {
    await completeHabit(id);
    await syncHabits();
  };

  const updateUserProfile = async (
    fields: Partial<Pick<UserProfile, 'name' | 'email' | 'timeZone' | 'language' | 'vibrationEnabled' | 'notificationPermission' | 'expoPushToken'>>
  ) => {
    const next = await updateProfile(fields);
    setProfile(next);
  };

  const getHabitById = (id: string) => habits.find((habit) => habit.id === id);

  return (
    <HabitContext.Provider
      value={{
        habits,
        profile,
        loading,
        refresh,
        toggleHabit,
        deleteHabit,
        addHabit,
        updateHabit,
        updateUserProfile,
        getHabitById,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
}

export function useHabits() {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
}

export type { HabitInput, HabitRecord, HabitView, UserProfile } from '@/lib/habits/types';
