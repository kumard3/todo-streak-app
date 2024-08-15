import React from "react";
import { formatDate } from "@/lib/dateUtils";

import { Input } from "@/components/ui/input";

interface DateChangerProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

export const DateChanger: React.FC<DateChangerProps> = ({
  currentDate,
  onDateChange,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">Change Date:</label>
      <Input
        type="date"
        value={formatDate(currentDate)}
        onChange={(e) => onDateChange(new Date(e.target.value))}
        className="w-full"
      />
    </div>
  );
};
