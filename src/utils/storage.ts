import { Todo } from "../types";

/**
 * Loads todos from local storage.
 * @returns An array of todos.
 */
export const loadTodos = (): Todo[] => {
  const todosJson = localStorage.getItem("todos");
  return todosJson ? JSON.parse(todosJson) : [];
};

/**
 * Saves the given todos to the local storage.
 * @param todos - The todos to be saved.
 * @returns void
 */
export const saveTodos = (todos: Todo[]): void => {
  localStorage.setItem("todos", JSON.stringify(todos));
};
