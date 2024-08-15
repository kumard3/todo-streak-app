import React, { useState } from "react";
import { Todo } from "../types";
import { formatDate } from "@/lib/dateUtils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BacktrackingProps {
  todos: Todo[];
  onBacktrack: (id: string, date: string) => void;
}

export const Backtracking: React.FC<BacktrackingProps> = ({
  todos,
  onBacktrack,
}) => {
  const [selectedTodo, setSelectedTodo] = useState("");
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTodo && selectedDate) {
      onBacktrack(selectedTodo, selectedDate);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
      <Input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="w-full"
      />
      <Button type="submit" className="w-full">
        Backtrack
      </Button>
    </form>
  );
};
