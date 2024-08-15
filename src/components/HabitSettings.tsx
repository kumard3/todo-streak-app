import React from "react";
import { Todo } from "@/types";
import { days } from "@/data/day";
import RenderDayCheckbox from "@/components/ui/RenderDayCheckbox";
import { Input } from "@/components/ui/input";

interface HabitSettingsProps {
  todo: Todo;
  onUpdateSettings: (id: string, updates: Partial<Todo>) => void;
}

/**
 * Renders the settings for a habit.
 *
 * @component
 * @param {HabitSettingsProps} props - The component props.
 * @param {Todo} props.todo - The todo object.
 * @param {Function} props.onUpdateSettings - The function to update the settings.
 * @returns {JSX.Element} The habit settings component.
 */
export const HabitSettings: React.FC<HabitSettingsProps> = ({
  todo,
  onUpdateSettings,
}) => {
  return (
    <div>
      {/* Render input for weekly goals if the todo type is "weekly" */}
      {todo.type === "weekly" && (
        <Input
          type="number"
          value={todo.weeklyGoal || 1}
          onChange={(e) =>
            onUpdateSettings(todo.id, { weeklyGoal: parseInt(e.target.value) })
          }
          min="1"
          max="7"
        />
      )}
      {/* Render checkboxes for each day if the todo type is "daily" */}
      {todo.type === "daily" && (
        <div className="flex flex-wrap gap-2">
          {days.map((day) => (
            <RenderDayCheckbox
              key={day}
              day={day}
              checked={(todo.scheduledDays || []).includes(day)}
              onCheckedChange={(checked) => {
                // Update the scheduled days based on the checkbox selection
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
