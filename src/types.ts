import React from "react";

export interface Todo {
  id: string;
  title: string;
  type: "daily" | "weekly";
  streak: number;
  longestStreak: number;
  scheduledDays?: string[];
  weeklyGoal?: number;
}

export interface CompletionHistory {
  [id: string]: { [date: string]: boolean };
}
export type SetTodosFunction = React.Dispatch<React.SetStateAction<Todo[]>>;
export type SetCompletionHistoryFunction = React.Dispatch<
  React.SetStateAction<CompletionHistory>
>;
