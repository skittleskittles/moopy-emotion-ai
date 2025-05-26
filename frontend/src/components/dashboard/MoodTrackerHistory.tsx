import React from "react";
import { format, addMonths } from "date-fns";
import {
  MoodRecord,
  MoodTypeLabelMap,
  MoodTypeToEmoji,
  toDateKey,
} from "@/models/MoodData";
import * as Tooltip from "@radix-ui/react-tooltip";

interface ClientMoodTrackerHistoryProps {
  moodRecordList: MoodRecord[];
  expanded: boolean;
}

export const ClientMoodTrackerHistory: React.FC<
  ClientMoodTrackerHistoryProps
> = ({ moodRecordList, expanded }) => {
  /* calculate visible months */
  const sortedDates = moodRecordList
    .map((r) => new Date(r.year, r.month - 1, r.day)) // month 要减 1
    .sort((a, b) => a.getTime() - b.getTime());

  const firstRecordDate = sortedDates[0] || new Date();
  const lastRecordDate = sortedDates[sortedDates.length - 1] || new Date();

  // 计算数据跨度（单位：月）
  const monthDiff =
    (lastRecordDate.getFullYear() - firstRecordDate.getFullYear()) * 12 +
    (lastRecordDate.getMonth() - firstRecordDate.getMonth());

  let startFrom = new Date(
    firstRecordDate.getFullYear(),
    firstRecordDate.getMonth(),
    1
  );
  let visibleMonthCount = monthDiff > 11 ? monthDiff + 1 : 12;
  // monthDiff+1: 因为同年同月 diff 为 0，但要显示当月
  // 12: 数据跨度较小, 补齐 12 个月

  // 生成 visibleMonths 列表
  const visibleMonths = Array.from({ length: visibleMonthCount }).map(
    (_, i) => {
      const date = addMonths(startFrom, i);
      return {
        label: format(date, "MMM yyyy"),
        year: date.getFullYear(),
        month: date.getMonth(),
      };
    }
  );

  /* mood data */
  const moodMap: {
    [key: string]: {
      mood: string;
      emoji: string;
      diary: string;
      date: string;
    };
  } = {};

  moodRecordList.forEach((record) => {
    const dateKey = toDateKey(record.year, record.month, record.day); // yyyy-MM-dd
    moodMap[dateKey] = {
      mood: MoodTypeLabelMap[record.moodType] || "",
      emoji: MoodTypeToEmoji[record.moodType] || "",
      diary: record.moodDiary,
      date: format(new Date(dateKey), "dd"),
    };
  });

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className={`grid ${expanded ? "grid-cols-3" : "grid-cols-2"} gap-4`}>
        {visibleMonths.map(({ label, year, month }) => (
          <div
            key={`${year}-${month}`}
            className="border border-gray-300 rounded-lg p-2 text-center"
          >
            <h3 className="text-md font-medium mb-1">{label}</h3>
            <div className="grid grid-cols-7 gap-[0.35rem] justify-center">
              {Array.from({ length: getDaysInMonth(year, month) }).map(
                (_, dayIdx) => {
                  const date = new Date(year, month, dayIdx + 1);
                  const dateKey = format(date, "yyyy-MM-dd");
                  const moodData = moodMap[dateKey];
                  const tooltipText =
                    moodData?.emoji && moodData?.diary
                      ? `Day ${dayIdx + 1}: ${moodData.diary}`
                      : undefined;

                  return (
                    <Tooltip.Provider key={dayIdx} delayDuration={0}>
                      <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                          <div className="w-full relative rounded cursor-default">
                            {/* height = width */}
                            <div className="pb-[100%]"></div>

                            <div className="absolute inset-0 flex items-center justify-center">
                              {moodData?.emoji ? (
                                <img
                                  src={moodData.emoji}
                                  className="w-full h-full object-contain"
                                />
                              ) : (
                                <div className="w-full h-full rounded-full bg-gray-300" />
                              )}
                            </div>
                          </div>
                        </Tooltip.Trigger>
                        {tooltipText && (
                          <Tooltip.Portal>
                            <Tooltip.Content
                              className="bg-black text-white text-xs px-2 py-1 rounded shadow-md z-50"
                              side="top"
                              sideOffset={4}
                            >
                              {tooltipText}
                            </Tooltip.Content>
                          </Tooltip.Portal>
                        )}
                      </Tooltip.Root>
                    </Tooltip.Provider>
                  );
                }
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
