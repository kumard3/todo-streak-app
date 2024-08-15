/**
 * Formats a date into a string representation.
 * 
 * @param date - The date to format.
 * @returns The formatted date string.
 */
export const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

/**
 * Returns the abbreviated name of the day for the given date.
 * 
 * @param date - The date for which to get the day name.
 * @returns The abbreviated name of the day.
 */
export const getDayName = (date: Date): string => {
  return date.toLocaleDateString("en-US", { weekday: "short" });
};
