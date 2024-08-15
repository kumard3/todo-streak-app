import { CheckedState } from "@radix-ui/react-checkbox";
import { Checkbox } from "./checkbox";

/**
 * Renders a checkbox for a specific day.
 *
 * @param {Object} props - The component props.
 * @param {string} props.day - The day to be displayed.
 * @param {CheckedState} [props.checked] - The state of the checkbox (optional).
 * @param {function} props.onCheckedChange - The callback function to handle checkbox state changes.
 * @returns {JSX.Element} The rendered checkbox component.
 */
export default function RenderDayCheckbox({
  day,
  onCheckedChange,
  checked,
}: {
  day: string;
  checked?: CheckedState;
  onCheckedChange: ((checked: CheckedState) => void) | undefined;
}) {
  return (
    // Label for the checkbox
    <label key={day} className="flex items-center space-x-2">
      {/* Checkbox component */}
      <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
      {/* Display the day */}
      <span>{day}</span>
    </label>
  );
}
