import React, { useState } from "react";
import { Todo } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { days } from "@/data/day";
import RenderDayCheckbox from "./ui/RenderDayCheckbox";

interface AddTodoDialogProps {
  onAdd: (todo: Omit<Todo, "id" | "streak" | "longestStreak">) => void;
}

/**
 * Represents the AddTodo component.
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Indicates whether the dialog is open or not.
 * @param {Function} props.onClose - The function to close the dialog.
 * @param {Function} props.onAdd - The function to add a new habit.
 * @returns {JSX.Element} The rendered AddTodo component.
 */
export const AddTodo: React.FC<AddTodoDialogProps> = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"daily" | "weekly">("daily");
  const [weeklyGoal, setWeeklyGoal] = useState(1);
  const [scheduledDays, setScheduledDays] = useState<string[]>([]);

  /**
   * Handles the form submission.
   * @param {React.FormEvent} e - The form event.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      title,
      type,
      weeklyGoal: type === "weekly" ? weeklyGoal : 1,
      scheduledDays: type === "daily" ? scheduledDays : [],
    });
    setTitle("");
    setType("daily");
    setWeeklyGoal(1);
    setScheduledDays([]);
    setOpen(false);
  };

  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Habit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a New Habit</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input for habit name */}
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter habit name"
            required
          />
          {/* Select for tracking type */}
          <Select
            value={type}
            onValueChange={(value) => setType(value as "daily" | "weekly")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select tracking type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
            </SelectContent>
          </Select>
          {/* Input for weekly goal (only shown when type is weekly) */}
          {type === "weekly" && (
            <Input
              type="number"
              value={weeklyGoal}
              onChange={(e) => setWeeklyGoal(parseInt(e.target.value))}
              min="1"
              max="7"
              className="w-full"
            />
          )}
          {/* Render checkboxes for each day (only shown when type is daily) */}
          {type === "daily" && (
            <div className="flex flex-wrap gap-2">
              {days.map((day) => (
                <RenderDayCheckbox
                  key={day}
                  day={day}
                  checked={scheduledDays.includes(day)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setScheduledDays([...scheduledDays, day]);
                    } else {
                      setScheduledDays(scheduledDays.filter((d) => d !== day));
                    }
                  }}
                />
              ))}
            </div>
          )}
          <DialogFooter>
            {/* Button to add the habit */}
            <Button type="submit" className="w-full">
              Add Habit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
