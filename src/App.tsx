import React, { useState, useEffect } from "react";
import { AddTodo } from "@/components/AddTodo";
import { TodoList } from "@/components/TodoList";
import { DateChanger } from "@/components/DateChanger";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Todo, CompletionHistory } from "@/types";
import { calculateStreak } from "@/services/streakCalculator";
import { formatDate } from "@/lib/dateUtils";
import { Backtracking } from "./components/Backtracking";

export const App: React.FC = () => {
  // State hooks
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const [completionHistory, setCompletionHistory] =
    useLocalStorage<CompletionHistory>("completionHistory", {});
  const [currentDate, setCurrentDate] = useState(new Date());

  // Update streaks whenever completion history or current date changes
  useEffect(() => {
    updateStreaks();
  }, [completionHistory, currentDate]);

  // Add a new todo
  const addTodo = (newTodo: Omit<Todo, "id" | "streak" | "longestStreak">) => {
    const todo: Todo = {
      ...newTodo,
      id: Date.now().toString(),
      streak: 0,
      longestStreak: 0,
    };
    setTodos((prevTodos) => [...prevTodos, todo]);
  };

  // Handle backtrack for a specific todo and date
  const handleBacktrack = (id: string, date: string) => {
    setCompletionHistory((prevHistory) => ({
      ...prevHistory,
      [id]: { ...(prevHistory[id] || {}), [date]: true },
    }));
    updateStreaks();
  };

  // Mark a todo as completed for the current date
  const completeTodo = (id: string) => {
    const dateString = formatDate(currentDate);
    setCompletionHistory((prevHistory) => ({
      ...prevHistory,
      [id]: { ...(prevHistory[id] || {}), [dateString]: true },
    }));
  };

  // Update streaks for all todos
  const updateStreaks = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        const newStreak = calculateStreak(todo, completionHistory, currentDate);
        return {
          ...todo,
          streak: newStreak,
          longestStreak: Math.max(todo.longestStreak, newStreak),
        };
      })
    );
  };

  // Update settings for a specific todo
  const updateTodoSettings = (id: string, updates: Partial<Todo>) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo))
    );
  };

  // Delete a todo
  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Habit Tracker</h1>
      <div className="flex w-full justify-between">
        <div>
          {/* AddTodo component for adding new todos */}
          <AddTodo onAdd={addTodo} />
          {/* DateChanger component for changing the current date */}
          <DateChanger
            currentDate={currentDate}
            onDateChange={setCurrentDate}
          />
        </div>

        {/* Backtracking component for displaying and handling backtracking */}
        <Backtracking todos={todos} onBacktrack={handleBacktrack} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* TodoList component for displaying daily habits */}
        <TodoList
          title="Daily Habits"
          todos={todos.filter((todo) => todo.type === "daily")}
          onComplete={completeTodo}
          onUpdateSettings={updateTodoSettings}
          onDelete={deleteTodo}
        />
        {/* TodoList component for displaying weekly habits */}
        <TodoList
          title="Weekly Habits"
          todos={todos.filter((todo) => todo.type === "weekly")}
          onComplete={completeTodo}
          onUpdateSettings={updateTodoSettings}
          onDelete={deleteTodo}
        />
      </div>
    </div>
  );
};

export default App;
