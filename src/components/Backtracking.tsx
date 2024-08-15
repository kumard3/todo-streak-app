import React, { useState } from "react";
import { Todo } from "@/types";
import { formatDate } from "@/lib/dateUtils";
import { Button } from "@/components/ui/button";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { DateChanger } from "./DateChanger";

interface BacktrackingProps {
  todos: Todo[];
  onBacktrack: (id: string, date: string) => void;
}

/**
 * Backtracking component for habit completion.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.todos - The list of todos.
 * @param {Function} props.onBacktrack - The callback function for backtracking.
 * @returns {JSX.Element} - The rendered Backtracking component.
 */
export const Backtracking: React.FC<BacktrackingProps> = ({
  todos,
  onBacktrack,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState("");
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTodo && selectedDate) {
      onBacktrack(selectedTodo, selectedDate);
      setOpen(false);
    }
  };

  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setSelectedTodo("")}>Backtrack Habit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Backtrack Habit Completion</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Select component to choose a habit */}
          <Select value={selectedTodo} onValueChange={setSelectedTodo}>
            <SelectTrigger>
              <SelectValue placeholder="Select a habit" />
            </SelectTrigger>
            <SelectContent>
              {todos.map((todo) => (
                <SelectItem key={todo.id} value={todo.id}>
                  {todo.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* DateChanger component to select a date */}
          <DateChanger
            currentDate={new Date(selectedDate)}
            onDateChange={(date) => setSelectedDate(formatDate(date))}
          />

          {/* Button to submit the form */}
          <Button type="submit" className="w-full">
            Backtrack
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
