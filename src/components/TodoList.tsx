import React from "react";
import { Todo } from "../types";
import { TodoItem } from "./TodoItem";
import { Skeleton } from "./ui/skeleton";

interface TodoListProps {
  title: string;
  isLoading: boolean;
  todos: Todo[];
  onComplete: (id: string) => void;
  onUpdateSettings: (id: string, updates: Partial<Todo>) => void;
  onDelete: (id: string) => void;
}

/**
 * Renders a list of todos.
 *
 * @component
 * @param {TodoListProps} props - The props for the TodoList component.
 * @param {string} props.title - The title of the todo list.
 * @param {boolean} props.isLoading - Indicates whether the todos are currently being loaded.
 * @param {Todo[]} props.todos - The array of todos to be rendered.
 * @param {Function} props.onComplete - The function to be called when a todo is completed.
 * @param {Function} props.onUpdateSettings - The function to be called when updating todo settings.
 * @param {Function} props.onDelete - The function to be called when deleting a todo.
 * @returns {JSX.Element} The rendered TodoList component.
 */
export const TodoList: React.FC<TodoListProps> = ({
  title,
  isLoading,
  todos,
  onComplete,
  onUpdateSettings,
  onDelete,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {isLoading && (
        <div className="p-4 border rounded mb-4">
          <Skeleton className="h-6 w-1/2 mb-2" />
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      )}
      {todos?.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onComplete={onComplete}
          onUpdateSettings={onUpdateSettings}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
