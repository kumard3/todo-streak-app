import React, { useState } from "react";
import { Todo } from "../types";

interface TodoFormProps {
  addTodo: (todo: Todo) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [title, setTitle] = useState("");
  const [trackingType, setTrackingType] = useState<"daily" | "weekly">("daily");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      title: title.trim(),
      trackingType,
      completions: [],
      scheduledDays:
        trackingType === "daily" ? [0, 1, 2, 3, 4, 5, 6] : undefined,
      weeklyGoal: trackingType === "weekly" ? 1 : undefined,
      longestStreak: 0, // Add this line
    };

    addTodo(newTodo);
    setTitle("");
    setTrackingType("daily");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter todo title"
        required
      />
      <select
        value={trackingType}
        onChange={(e) => setTrackingType(e.target.value as "daily" | "weekly")}
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
      </select>
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;
