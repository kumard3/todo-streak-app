import { Todo } from "../types";

/**
 * Calculates the streak of completed todos based on the given parameters.
 *
 * @param todo - The todo object to calculate the streak for.
 * @param currentDate - The current date to use as a reference for the streak calculation.
 * @returns The streak count as a number.
 */
export const calculateStreak = (todo: Todo, currentDate: Date): number => {
  const sortedCompletions = [...todo.completions].sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );
  let streak = 0;
  let lastDate = new Date(currentDate);

  for (const completion of sortedCompletions) {
    const completionDate = new Date(completion);

    if (todo.trackingType === "daily") {
      if (isConsecutiveDay(lastDate, completionDate, todo.scheduledDays)) {
        streak++;
        lastDate = completionDate;
      } else {
        break;
      }
    } else if (todo.trackingType === "weekly") {
      const completionsThisWeek = sortedCompletions.filter((c) =>
        isSameWeek(new Date(c), completionDate)
      ).length;

      if (completionsThisWeek >= (todo.weeklyGoal || 1)) {
        streak++;
        lastDate = new Date(lastDate.setDate(lastDate.getDate() - 7));
      } else {
        break;
      }
    }
  }

  return streak;
};

/**
 * Determines if two dates are consecutive days.
 *
 * @param date1 - The first date.
 * @param date2 - The second date.
 * @param scheduledDays - An optional array of scheduled days.
 * @returns A boolean indicating if the dates are consecutive.
 */
const isConsecutiveDay = (
  date1: Date,
  date2: Date,
  scheduledDays?: number[]
): boolean => {
  const diffTime = Math.abs(date1.getTime() - date2.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (scheduledDays && scheduledDays.length < 7) {
    let count = 0;
    const tempDate = new Date(date1);
    while (count < diffDays) {
      tempDate.setDate(tempDate.getDate() - 1);
      if (scheduledDays.includes(tempDate.getDay())) {
        count++;
      }
    }
    return count === 1;
  }

  return diffDays === 1;
};

/**
 * Checks if two dates fall within the same week.
 *
 * @param date1 - The first date.
 * @param date2 - The second date.
 * @returns A boolean indicating whether the two dates fall within the same week.
 */
const isSameWeek = (date1: Date, date2: Date): boolean => {
  const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  const dayOfWeek = d1.getDay();
  const diff = d1.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  const startOfWeek = new Date(d1.setDate(diff));
  const endOfWeek = new Date(d1.setDate(diff + 6));
  return d2 >= startOfWeek && d2 <= endOfWeek;
};
