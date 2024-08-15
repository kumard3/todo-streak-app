import { Todo, CompletionHistory } from "../types";

export const calculateStreak = (
  todo: Todo,
  completionHistory: CompletionHistory,
  currentDate: Date
): number => {
  let streak = 0;
  let date = new Date(currentDate);
  const history = completionHistory[todo.id] || {};

  if (todo.type === "daily") {
    while (history[date.toISOString().split("T")[0]]) {
      if (todo.scheduledDays && todo.scheduledDays.length > 0) {
        const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
        if (todo.scheduledDays.includes(dayName)) {
          streak++;
        }
      } else {
        streak++;
      }
      date.setDate(date.getDate() - 1);
    }
  } else if (todo.type === "weekly") {
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());

    while (true) {
      const weekCompletions = Array(7)
        .fill(null)
        .map((_, i) => {
          const day = new Date(weekStart);
          day.setDate(weekStart.getDate() + i);
          return history[day.toISOString().split("T")[0]] ? 1 : 0;
        })
        .reduce((a: number, b: number) => a + b, 0);

      if (weekCompletions >= (todo.weeklyGoal || 1)) {
        streak++;
        weekStart.setDate(weekStart.getDate() - 7);
      } else {
        break;
      }
    }
  }

  return streak;
};
