import React, { useState, useEffect } from "react";
import { AddTodo } from "@/components/AddTodo";
import { TodoList } from "@/components/TodoList";
import { DateChanger } from "@/components/DateChanger";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Todo, CompletionHistory } from "@/types";
import { calculateStreak } from "@/services/streakCalculator";
import { formatDate } from "@/lib/dateUtils";

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const [completionHistory, setCompletionHistory] =
    useLocalStorage<CompletionHistory>("completionHistory", {});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    updateStreaks();
  }, [completionHistory, currentDate]);

  const addTodo = (newTodo: Omit<Todo, "id" | "streak" | "longestStreak">) => {
    const todo: Todo = {
      ...newTodo,
      id: Date.now().toString(),
      streak: 0,
      longestStreak: 0,
    };
    setTodos((prevTodos) => [...prevTodos, todo]);
  };

  const completeTodo = (id: string) => {
    const dateString = formatDate(currentDate);
    setCompletionHistory((prevHistory) => ({
      ...prevHistory,
      [id]: { ...(prevHistory[id] || {}), [dateString]: true },
    }));
  };

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

  const updateTodoSettings = (id: string, updates: Partial<Todo>) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Habit Tracker</h1>
      {/* Add Habit */}
      <AddTodo
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addTodo}
      />
      <DateChanger currentDate={currentDate} onDateChange={setCurrentDate} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TodoList
          title="Daily Habits"
          todos={todos.filter((todo) => todo.type === "daily")}
          onComplete={completeTodo}
          onUpdateSettings={updateTodoSettings}
          onDelete={deleteTodo}
        />
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
