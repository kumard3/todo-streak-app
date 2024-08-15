import React from "react";
import { Todo } from "../types";
import { HabitSettings } from "./HabitSettings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TodoItemProps {
  todo: Todo;
  onComplete: (id: string) => void;
  onUpdateSettings: (id: string, updates: Partial<Todo>) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onComplete,
  onUpdateSettings,
}) => {
  return (
    <Card className="shadow-lg rounded-lg p-4 mb-4">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{todo.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm">Current Streak: {todo.streak}</p>
            <p className="text-sm">Longest Streak: {todo.longestStreak}</p>
          </div>
          <Button
            onClick={() => onComplete(todo.id)}
            className="bg-green-500 text-white"
          >
            Complete
          </Button>
        </div>
        <HabitSettings todo={todo} onUpdateSettings={onUpdateSettings} />
      </CardContent>
    </Card>
  );
};
