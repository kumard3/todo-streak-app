import React from 'react';
import { Todo } from '../types';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onComplete: (id: string) => void;
  onUpdateSettings: (id: string, updates: Partial<Todo>) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onComplete, onUpdateSettings }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Your Todos</h2>
      {todos.map(todo => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          onComplete={onComplete} 
          onUpdateSettings={onUpdateSettings} 
        />
      ))}
    </div>
  );
};