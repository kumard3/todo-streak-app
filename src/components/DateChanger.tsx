import React from "react";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateChangerProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

/**
 * Renders a component for changing the date.
 *
 * @component
 * @example
 * ```tsx
 * <DateChanger
 *   currentDate={new Date()}
 *   onDateChange={(date) => console.log(date)}
 * />
 * ```
 *
 * @param {Date} currentDate - The current date.
 * @param {Function} onDateChange - The function to be called when the date is changed.
 * @returns {JSX.Element} The rendered DateChanger component.
 */
export const DateChanger: React.FC<DateChangerProps> = ({
  currentDate,
  onDateChange,
}) => {
  return (
    <div className="mb-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !currentDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {currentDate ? (
              format(currentDate, "PPP")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={currentDate}
            onSelect={(date) => date && onDateChange(date)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
