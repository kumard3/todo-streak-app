import React from 'react';
import { Todo } from '../types';

interface HabitSettingsProps {
  todo: Todo;
  onUpdateSettings: (id: string, updates: Partial<Todo>) => void;
}

export const HabitSettings: React.FC<HabitSettingsProps> = ({ todo, onUpdateSettings }) => {
  return (
    <div>
      {todo.type === 'weekly' && (
        <input
          type="number"
          value={todo.weeklyGoal || 1}
          onChange={(e) => onUpdateSettings(todo.id, { weeklyGoal: parseInt(e.target.value) })}
          min="1"
          max="7"
        />
      )}
      {todo.type === 'daily' && (
        ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
          <label key={day}>
            <input
              type="checkbox"
              checked={(todo.scheduledDays || []).includes(day)}
              onChange={(e) => {
                const updatedDays = e.target.checked
                  ? [...(todo.scheduledDays || []), day]
                  : (todo.scheduledDays || []).filter(d => d !== day);
                onUpdateSettings(todo.id, { scheduledDays: updatedDays });
              }}
            />
            {day}
          </label>
        ))
      )}
    </div>
  );
};