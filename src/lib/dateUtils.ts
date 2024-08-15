export const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

export const getDayName = (date: Date): string => {
  return date.toLocaleDateString("en-US", { weekday: "short" });
};
