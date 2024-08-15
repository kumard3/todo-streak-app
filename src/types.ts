export interface Todo {
  id: string;
  title: string;
  trackingType: 'daily' | 'weekly';
  completions: string[];
  scheduledDays?: number[];
  weeklyGoal?: number;
  longestStreak: number;
}