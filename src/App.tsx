import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import DateSelector from "./components/DateSelector";
import { Todo } from "./types";
import { loadTodos, saveTodos } from "./utils/storage";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  useEffect(() => {
    setTodos(loadTodos());
  }, []);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const addTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  const completeTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completions: [
                ...todo.completions,
                currentDate.toISOString().split("T")[0],
              ],
            }
          : todo
      )
    );
  };

  const updateTodoSettings = (id: string, updates: Partial<Todo>) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo))
    );
  };

  return (
    <div className="App">
      <h1>Todo Streak App</h1>
      <DateSelector currentDate={currentDate} setCurrentDate={setCurrentDate} />
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={todos}
        completeTodo={completeTodo}
        updateTodoSettings={updateTodoSettings}
        currentDate={currentDate}
      />
    </div>
  );
};

export default App;
