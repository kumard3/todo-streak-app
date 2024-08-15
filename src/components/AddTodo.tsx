import React, { useState } from "react";
import { Todo } from "../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface AddTodoProps {
  onAdd: (todo: Omit<Todo, 'id' | 'streak' | 'longestStreak'>) => void;
}

export const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'daily' | 'weekly'>('daily');
  const [weeklyGoal, setWeeklyGoal] = useState(1);
  const [scheduledDays, setScheduledDays] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ 
      title, 
      type, 
      weeklyGoal: type === 'weekly' ? weeklyGoal : undefined,
      scheduledDays: type === 'daily' ? scheduledDays : undefined
    });
    setTitle('');
    setType('daily');
    setWeeklyGoal(1);
    setScheduledDays([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter habit name"
        required
      />
      <Select value={type} onValueChange={(value) => setType(value as 'daily' | 'weekly')}>
        <SelectTrigger>
          <SelectValue placeholder="Select tracking type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="daily">Daily</SelectItem>
          <SelectItem value="weekly">Weekly</SelectItem>
        </SelectContent>
      </Select>
      {type === 'weekly' && (
        <Input
          type="number"
          value={weeklyGoal}
          onChange={(e) => setWeeklyGoal(parseInt(e.target.value))}
          min="1"
          max="7"
          className="w-full"
        />
      )}
      {type === 'daily' && (
        <div className="flex flex-wrap gap-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <label key={day} className="flex items-center space-x-2">
              <Checkbox
                checked={scheduledDays.includes(day)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setScheduledDays([...scheduledDays, day]);
                  } else {
                    setScheduledDays(scheduledDays.filter(d => d !== day));
                  }
                }}
              />
              <span>{day}</span>
            </label>
          ))}
        </div>
      )}
      <Button type="submit" className="w-full">Add Habit</Button>
    </form>
  );
};