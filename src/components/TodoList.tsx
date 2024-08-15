import React from "react";
import { Todo } from "../types";
import { calculateStreak } from "../utils/streakCalculator";

interface TodoListProps {
  todos: Todo[];
  completeTodo: (id: string) => void;
  updateTodoSettings: (id: string, updates: Partial<Todo>) => void;
  currentDate: Date;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  completeTodo,
  updateTodoSettings,
  currentDate,
}) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <h3>{todo.title}</h3>
          <p>Tracking: {todo.trackingType}</p>
          <p>Streak: {calculateStreak(todo, currentDate)}</p>
          <button onClick={() => completeTodo(todo.id)}>Complete</button>
          <select
            value={todo.trackingType}
            onChange={(e) =>
              updateTodoSettings(todo.id, {
                trackingType: e.target.value as "daily" | "weekly",
              })
            }
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
          {todo.trackingType === "daily" && (
            <div>
              {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                <label key={day}>
                  <input
                    type="checkbox"
                    checked={todo.scheduledDays?.includes(day)}
                    onChange={(e) => {
                      const newScheduledDays = e.target.checked
                        ? [...(todo.scheduledDays || []), day]
                        : (todo.scheduledDays || []).filter((d) => d !== day);
                      updateTodoSettings(todo.id, {
                        scheduledDays: newScheduledDays,
                      });
                    }}
                  />
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][day]}
                </label>
              ))}
            </div>
          )}
          {todo.trackingType === "weekly" && (
            <input
              type="number"
              value={todo.weeklyGoal || 0}
              onChange={(e) =>
                updateTodoSettings(todo.id, {
                  weeklyGoal: parseInt(e.target.value),
                })
              }
              min={1}
              max={7}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
