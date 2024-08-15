import React, { useState, useEffect } from "react";
import { AddTodo } from "./components/AddTodo";
import { TodoList } from "./components/TodoList";
import { DateChanger } from "./components/DateChanger";
import { Backtracking } from "./components/Backtracking";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Todo, CompletionHistory } from "./types";
import { calculateStreak } from "./services/streakCalculator";
import { formatDate } from "@/lib/dateUtils";

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const [completionHistory, setCompletionHistory] =
    useLocalStorage<CompletionHistory>("completionHistory", {});
  const [currentDate, setCurrentDate] = useState(new Date());

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

  const handleBacktrack = (id: string, date: string) => {
    setCompletionHistory((prevHistory) => ({
      ...prevHistory,
      [id]: { ...(prevHistory[id] || {}), [date]: true },
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Habit Tracker</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <DateChanger
            currentDate={currentDate}
            onDateChange={setCurrentDate}
          />
          <AddTodo onAdd={addTodo} />
          <Backtracking todos={todos} onBacktrack={handleBacktrack} />
        </div>
        <div>
          <TodoList
            todos={todos}
            onComplete={completeTodo}
            onUpdateSettings={updateTodoSettings}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
