import React from "react";
import { Todo } from "../types";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  title: string;
  todos: Todo[];
  onComplete: (id: string) => void;
  onUpdateSettings: (id: string, updates: Partial<Todo>) => void;
  onDelete: (id: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  title,
  todos,
  onComplete,
  onUpdateSettings,
  onDelete,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
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
