// src/components/DateSelector.tsx

import React from 'react';

interface DateSelectorProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ currentDate, setCurrentDate }) => {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentDate(new Date(e.target.value));
  };

  return (
    <div>
      <label htmlFor="date-selector">Select Date: </label>
      <input
        id="date-selector"
        type="date"
        value={currentDate.toISOString().split('T')[0]}
        onChange={handleDateChange}
      />
    </div>
  );
};

export default DateSelector;