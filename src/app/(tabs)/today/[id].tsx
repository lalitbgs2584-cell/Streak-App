import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ChevronLeft,
  MoreVertical,
  Clock,
  Calendar,
  Bell,
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

const { width } = Dimensions.get('window');

// Dynamic category illustration with neon gradients and background glows
const HabitIllustration = ({ category, color }: { category: string; color: string }) => {
  const renderBigIcon = () => {
    const size = 64;
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

  return (
    <View style={styles.illustrationContainer}>
      <LinearGradient
        colors={[theme.colors.illustration.purpleTop, theme.colors.illustration.purpleBottom]}
        style={styles.illustrationGradient}
      >
        {/* Dynamic decorative backdrop rings/blobs */}
        <View style={[styles.glowCircle, { backgroundColor: color, opacity: 0.18 }]} />
        <View style={[styles.glowCircleSecondary, { borderColor: color, opacity: 0.12 }]} />
        <View style={[styles.glowCircleTertiary, { borderColor: color, opacity: 0.08 }]} />

        {/* Central Graphic Icon */}
        <View style={[styles.illustrationIconBox, { shadowColor: color }]}>
          {renderBigIcon()}
        </View>
      </LinearGradient>
    </View>
  );
};

export default function HabitDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { habits, toggleHabit, deleteHabit } = useHabits();

  const [optionsVisible, setOptionsVisible] = useState(false);

  const habit = habits.find((h) => h.id === id);

  if (!habit) {
    return (
      <Screen>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Habit not found</Text>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backBtnText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </Screen>
    );
  }

  const categoryColor = theme.colors.habit[habit.category] || theme.colors.accent.DEFAULT;

  const handleDelete = () => {
    setOptionsVisible(false);
    deleteHabit(habit.id);
    router.back();
  };

  const handleEdit = () => {
    setOptionsVisible(false);
    router.push({
      pathname: '/edit-habit/[id]',
      params: { id: habit.id },
    });
  };

  // Helper to map category to Lucide Icon
  const getHeaderCategoryIcon = (cat: string, size: number, color: string) => {
    switch (cat) {
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

  return (
    <Screen scroll padded={false} edges={['top', 'bottom']}>
      {/* Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <ChevronLeft size={28} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Habit Detail</Text>
        <TouchableOpacity
          onPress={() => setOptionsVisible(true)}
          style={styles.optionsButton}
          activeOpacity={0.7}
        >
          <MoreVertical size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
      </View>

      {/* Main Content Area */}
      <View style={styles.content}>
        {/* Habit Card header (Icon, Name, Subdescription) */}
        <View style={styles.cardHeader}>
          <View
            style={[
              styles.iconBox,
              {
                borderColor: categoryColor,
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
              },
            ]}
          >
            {getHeaderCategoryIcon(habit.category, 26, categoryColor)}
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.habitTitle}>{habit.title}</Text>
            <Text style={styles.habitSubtitle}>{habit.description || 'Stay on track!'}</Text>
          </View>
        </View>

        {/* Large Styled Custom Illustration */}
        <HabitIllustration category={habit.category} color={categoryColor} />

        {/* Streak Stats Side by Side */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{habit.streak}</Text>
            <Text style={styles.statLabel}>Current Streak</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {habit.completed ? Math.max(habit.streak, habit.count) : habit.count}
            </Text>
            <Text style={styles.statLabel}>Best Streak</Text>
          </View>
        </View>

        {/* About Card */}
        <View style={styles.cardSection}>
          <Text style={styles.sectionLabel}>About</Text>
          <Text style={styles.aboutText}>
            {habit.description || 'Make this habit a part of your daily routine to stay consistent and healthy.'}
          </Text>
        </View>

        {/* Information Table Menu */}
        <View style={styles.infoMenu}>
          {/* Reminder Time Row */}
          <View style={styles.infoRow}>
            <View style={styles.infoLeft}>
              <Clock size={20} color={theme.colors.text.secondary} />
              <Text style={styles.infoLabel}>Reminder Time</Text>
            </View>
            <Text style={styles.infoValue}>{habit.startTime}</Text>
          </View>

          {/* Frequency Row */}
          <TouchableOpacity
            style={styles.infoRow}
            onPress={handleEdit}
            activeOpacity={0.7}
          >
            <View style={styles.infoLeft}>
              <Calendar size={20} color={theme.colors.text.secondary} />
              <Text style={styles.infoLabel}>Frequency</Text>
            </View>
            <Text style={styles.infoValue}>{habit.reminder} &gt;</Text>
          </TouchableOpacity>

          {/* Notifications Row */}
          <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
            <View style={styles.infoLeft}>
              <Bell size={20} color={theme.colors.text.secondary} />
              <Text style={styles.infoLabel}>Notifications</Text>
            </View>
            <Text style={styles.infoValue}>1 scheduled</Text>
          </View>
        </View>

        {/* Mark as Done / Toggle Button */}
        <TouchableOpacity
          onPress={() => toggleHabit(habit.id)}
          activeOpacity={0.8}
          style={[
            styles.actionButton,
            habit.completed
              ? { backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: theme.colors.surface.border }
              : { backgroundColor: theme.colors.accent.DEFAULT },
          ]}
        >
          <Text
            style={[
              styles.actionButtonText,
              habit.completed ? { color: theme.colors.text.secondary } : { color: theme.colors.accent.text },
            ]}
          >
            {habit.completed ? 'Completed' : 'Mark as Done'}
          </Text>
        </TouchableOpacity>

        {/* Deletion Link */}
        <TouchableOpacity onPress={handleDelete} activeOpacity={0.7} style={styles.deleteLink}>
          <Text style={styles.deleteLinkText}>Delete Habit</Text>
        </TouchableOpacity>
      </View>

      {/* Options Menu Modal Sheet */}
      <Modal
        visible={optionsVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setOptionsVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalScrim}
            activeOpacity={1}
            onPress={() => setOptionsVisible(false)}
          />
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Habit Options</Text>

            <TouchableOpacity style={styles.modalItem} onPress={handleEdit} activeOpacity={0.7}>
              <Text style={styles.modalItemText}>Edit Habit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalItem}
              onPress={handleDelete}
              activeOpacity={0.7}
            >
              <Text style={[styles.modalItemText, { color: theme.colors.status.error }]}>
                Delete Habit
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalItem, { borderBottomWidth: 0, marginTop: 8 }]}
              onPress={() => setOptionsVisible(false)}
              activeOpacity={0.7}
            >
              <Text style={[styles.modalItemText, { color: theme.colors.text.secondary, textAlign: 'center' }]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
  backButton: {
    padding: theme.spacing.xs,
    marginLeft: -theme.spacing.xs,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.text.primary,
    textAlign: 'center',
  },
  optionsButton: {
    padding: theme.spacing.xs,
    marginRight: -theme.spacing.xs,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xxl,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: theme.radius.md,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  titleContainer: {
    flex: 1,
  },
  habitTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  habitSubtitle: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    fontWeight: '500',
  },
  // Illustration Styles
  illustrationContainer: {
    width: '100%',
    height: 200,
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
    marginBottom: theme.spacing.lg,
  },
  illustrationGradient: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  glowCircle: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  glowCircleSecondary: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 1,
  },
  glowCircleTertiary: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 1,
  },
  illustrationIconBox: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 10,
  },
  // Stats Row
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statNumber: {
    fontSize: 26,
    fontWeight: '800',
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.text.secondary,
  },
  // Sections
  cardSection: {
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    padding: theme.spacing.base,
    marginBottom: theme.spacing.lg,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: theme.spacing.xs,
  },
  aboutText: {
    fontSize: 15,
    color: theme.colors.text.primary,
    lineHeight: 20,
    fontWeight: '500',
  },
  // Info list
  infoMenu: {
    backgroundColor: theme.colors.surface.card,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
    marginBottom: theme.spacing.xl,
    overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface.border,
  },
  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  infoLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text.secondary,
  },
  // Action Buttons
  actionButton: {
    height: 52,
    borderRadius: theme.radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '800',
  },
  deleteLink: {
    paddingVertical: theme.spacing.sm,
    alignSelf: 'center',
  },
  deleteLinkText: {
    color: theme.colors.status.error,
    fontSize: 15,
    fontWeight: '700',
  },
  // Error state
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: theme.colors.text.primary,
    fontSize: 18,
    marginBottom: theme.spacing.lg,
  },
  backBtn: {
    backgroundColor: theme.colors.accent.DEFAULT,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.md,
  },
  backBtnText: {
    color: theme.colors.accent.text,
    fontWeight: '700',
  },
  // Options Sheet Modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.overlay.scrim,
  },
  modalContent: {
    backgroundColor: theme.colors.surface.cardElevated,
    borderTopLeftRadius: theme.radius.lg,
    borderTopRightRadius: theme.radius.lg,
    paddingHorizontal: 20,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
    borderWidth: 1,
    borderColor: theme.colors.surface.border,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  modalItem: {
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface.border,
  },
  modalItemText: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text.primary,
    textAlign: 'center',
  },
});
