import React from "react";
import { Todo } from "../types";
import { HabitSettings } from "./HabitSettings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Define the props for the TodoItem component
interface TodoItemProps {
  todo: Todo;
  onComplete: (id: string) => void;
  onUpdateSettings: (id: string, updates: Partial<Todo>) => void;
  onDelete: (id: string) => void;
}

/**
 * Renders a TodoItem component.
 *
 * @component
 * @example
 * ```tsx
 * <TodoItem
 *   todo={todo}
 *   onComplete={handleComplete}
 *   onUpdateSettings={handleUpdateSettings}
 *   onDelete={handleDelete}
 * />
 * ```
 *
 * @param {TodoItemProps} props - The component props.
 * @param {Todo} props.todo - The todo object.
 * @param {Function} props.onComplete - The function to handle todo completion.
 * @param {Function} props.onUpdateSettings - The function to handle todo settings update.
 * @param {Function} props.onDelete - The function to handle todo deletion.
 * @returns {JSX.Element} The rendered TodoItem component.
 */
export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onComplete,
  onUpdateSettings,
  onDelete,
}) => {
  return (
    <Card className="shadow-lg rounded-lg p-4 mb-4">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{todo.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div>
            {/* Display the current streak of the todo */}
            <p className="text-sm">Current Streak: {todo.streak}</p>
            {/* Display the longest streak of the todo */}
            <p className="text-sm">Longest Streak: {todo.longestStreak}</p>
          </div>
          <div className="flex space-x-2">
            {/* Button for completing the todo */}
            <Button
              onClick={() => onComplete(todo.id)}
              className="bg-green-500 text-white"
            >
              Complete
            </Button>
            {/* Button for deleting the todo */}
            <Button
              onClick={() => onDelete(todo.id)}
              className="bg-red-500 text-white"
            >
              Delete
            </Button>
          </div>
        </div>
        {/* HabitSettings component for updating the todo settings */}
        <HabitSettings todo={todo} onUpdateSettings={onUpdateSettings} />
      </CardContent>
    </Card>
  );
};
