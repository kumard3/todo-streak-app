import { CheckedState } from "@radix-ui/react-checkbox";
import { Checkbox } from "./checkbox";

// export default function RenderScheduledDays({
//   scheduledDays,
//   setScheduledDays,
//   onCheckedChange,
// }: {
//   scheduledDays: string[];
//   setScheduledDays?: React.Dispatch<React.SetStateAction<string[]>>;
//   onCheckedChange?(checked: CheckedState): void;
// }) {
//   return (
//     <div className="flex flex-wrap gap-2">
//       {days.map((day) => (
//         <RenderDayCheckbox
//           key={day}
//           day={day}
//           checked={scheduledDays.includes(day) ? true : false}
//           onCheckedChange={(checked) => {
//             if (setScheduledDays) {
//               setScheduledDays((prev) =>
//                 checked ? [...prev, day] : prev.filter((d) => d !== day)
//               );
//             }
//             if (onCheckedChange) {
//               onCheckedChange(checked);
//             }
//           }}
//         />
//       ))}
//     </div>
//   );
// }
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
    <label key={day} className="flex items-center space-x-2">
      <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
      <span>{day}</span>
    </label>
  );
}
