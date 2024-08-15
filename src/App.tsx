import React, { useState, useEffect } from "react";
import { AddTodo } from "@/components/AddTodo";
import { TodoList } from "@/components/TodoList";
import { DateChanger } from "@/components/DateChanger";
import { Todo, CompletionHistory } from "@/types";
import { formatDate } from "@/lib/dateUtils";
import { Backtracking } from "./components/Backtracking";
import {
  addHabit,
  calculateStreak,
  deleteHabit,
  getHabits,
  updateHabit,
} from "./services/TodoService";

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completionHistory, setCompletionHistory] = useState<CompletionHistory>(
    {}
  );
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const habits = await getHabits();
      setTodos(habits);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    updateStreaks();
  }, [completionHistory, currentDate]);

  const addTodo = async (
    newTodo: Omit<Todo, "id" | "streak" | "longestStreak">
  ) => {
    const todo: Todo = {
      ...newTodo,
      id: Date.now().toString(),
      streak: 0,
      longestStreak: 0,
      weeklyGoal: 0,
    };
    setTodos((prevTodos) => [...prevTodos, todo]);
    await addHabit(todo);
  };

  const completeTodo = (id: string) => {
    const dateString = formatDate(currentDate);
    setCompletionHistory((prevHistory) => ({
      ...prevHistory,
      [id]: { ...(prevHistory[id] || {}), [dateString]: true },
    }));
  };

  const handleBacktrack = (id: string, date: string) => {
    setCompletionHistory((prevHistory) => ({
      ...prevHistory,
      [id]: { ...(prevHistory[id] || {}), [date]: true },
    }));
    updateStreaks();
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

  const updateTodoSettings = async (id: string, updates: Partial<Todo>) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo))
    );
    await updateHabit(id, updates);
  };

  const deleteTodo = async (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    await deleteHabit(id);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Habit Tracker</h1>
      <div className="flex w-full justify-between">
        <div className="flex gap-5">
          {/* AddTodo component for adding new todos */}
          <AddTodo onAdd={addTodo} />
          {/* Backtracking component for displaying and handling backtracking */}
          <Backtracking todos={todos} onBacktrack={handleBacktrack} />
        </div>
        {/* DateChanger component for changing the current date */}
        <DateChanger currentDate={currentDate} onDateChange={setCurrentDate} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* TodoList component for displaying daily habits */}
        <TodoList
          title="Daily Habits"
          todos={todos.filter((todo) => todo.type === "daily")}
          onComplete={completeTodo}
          onUpdateSettings={updateTodoSettings}
          onDelete={deleteTodo}
          isLoading={isLoading}
        />
        {/* TodoList component for displaying weekly habits */}
        <TodoList
          title="Weekly Habits"
          todos={todos.filter((todo) => todo.type === "weekly")}
          onComplete={completeTodo}
          onUpdateSettings={updateTodoSettings}
          onDelete={deleteTodo}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default App;
