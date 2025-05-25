import {
  format,
  getDaysInMonth,
  getDay,
  startOfMonth,
  isToday,
} from "date-fns";
import { MoodDayCell } from "./MoodDayCell";

interface CalendarGridProps {
  currentMonth: Date;
  moodData: {
    [key: string]: { emoji: string; diary: string };
  };
  onDayClick: (dateKey: string) => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentMonth,
  moodData,
  onDayClick,
}) => {
  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDayOffset = getDay(startOfMonth(currentMonth)); // 0 = Sunday

  return (
    <div
      className="relative w-full h-auto"
      style={{
        marginInline: "auto",
        aspectRatio: "1",
      }}
    >
      {/* 背景图层 */}
      <img
        src="/assets/calendar-bg.png"
        className="absolute inset-0 flex items-center justify-center rounded-lg pointer-events-none z-0"
      />

      {/* 网格内容层 */}
      <div
        className="relative grid z-10 gap-3 pt-20 px-5"
        style={{
          gridTemplateColumns: "repeat(7, 1fr)",
        }}
      >
        {/* 星期标题 */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="font-bold text-base font-mono text-primary uppercase"
          >
            {day}
          </div>
        ))}

        {/* 首日偏移空格 */}
        {Array.from({ length: firstDayOffset }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* 日期按钮 */}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const date = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            day
          );
          const dateKey = format(date, "yyyy-MM-dd");
          const mood = moodData[dateKey];
          const isTodayCell = isToday(date);

          return (
            <MoodDayCell
              key={day}
              day={day}
              dateKey={dateKey}
              mood={mood}
              isToday={isTodayCell}
              onClick={onDayClick}
            />
          );
        })}
      </div>
    </div>
  );
};
