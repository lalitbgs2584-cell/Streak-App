import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'

import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { PrimaryButton } from '../../common/PrimaryButton';
import DateStrip from './date';
import { theme } from '@/lib/theme';

const TodayHeader = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formattedDate = selectedDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.titleRow}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Today</Text>
          <Text style={styles.headerSubtitle}>{formattedDate}</Text>
        </View>
        <View style={styles.addHabitButton}>
          <PrimaryButton onPress={() => router.push('/new-habit')}>Add Habit</PrimaryButton>
        </View>
      </View>
      <DateStrip selectedDate={selectedDate} onDateChange={setSelectedDate} />
    </View>
  )
}

export default TodayHeader

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.lg,
  },
  headerContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  headerText: {
    fontSize: 30,
    color: theme.colors.text.primary,
    fontWeight: "800",
  },
  headerSubtitle: {
    fontSize: 15,
    color: theme.colors.text.secondary,
    fontWeight: "400",
  },
  addHabitButton: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flex: 1,
    borderRadius: 50,
  },
})
