import React from "react";
import { Todo } from "@/types";
import { days } from "@/data/day";
import RenderDayCheckbox from "@/components/ui/RenderDayCheckbox";

interface HabitSettingsProps {
  todo: Todo;
  onUpdateSettings: (id: string, updates: Partial<Todo>) => void;
}

export const HabitSettings: React.FC<HabitSettingsProps> = ({
  todo,
  onUpdateSettings,
}) => {
  return (
    <div>
      {todo.type === "weekly" && (
        <input
          type="number"
          value={todo.weeklyGoal || 1}
          onChange={(e) =>
            onUpdateSettings(todo.id, { weeklyGoal: parseInt(e.target.value) })
          }
          min="1"
          max="7"
        />
      )}
      {todo.type === "daily" && (
        <div className="flex flex-wrap gap-2">
          {days.map((day) => (
            <RenderDayCheckbox
              key={day}
              day={day}
              checked={(todo.scheduledDays || []).includes(day)}
              onCheckedChange={(checked) => {
                const updatedDays = checked
                  ? [...(todo.scheduledDays || []), day]
                  : (todo.scheduledDays || []).filter((d) => d !== day);
                onUpdateSettings(todo.id, { scheduledDays: updatedDays });
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
