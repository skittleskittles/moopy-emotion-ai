import React from "react";
import { format, addMonths, subMonths } from "date-fns";
import {
  MoodRecord,
  MoodTypeToColor,
  MoodTypeToEmoji,
} from "@/models/MoodTrakcer";
import * as Tooltip from "@radix-ui/react-tooltip";

interface ClientMoodTrackerHistoryProps {
  moodRecordList: MoodRecord[];
  expanded: boolean;
}

export const ClientMoodTrackerHistory: React.FC<
  ClientMoodTrackerHistoryProps
> = ({ moodRecordList, expanded }) => {
  const now = new Date();

  const months = Array.from({ length: 12 }).map((_, i) => {
    const date = addMonths(subMonths(now, 9), i);
    return {
      label: format(date, "MMM yyyy"),
      year: date.getFullYear(),
      month: date.getMonth(),
    };
  });

  const moodMap: {
    [key: string]: {
      color: string;
      emoji: string;
      diary: string;
      date: string;
    };
  } = {};

  moodRecordList.forEach((record) => {
    const dateKey = record.createdAt.split("T")[0]; // yyyy-MM-dd
    moodMap[dateKey] = {
      color: MoodTypeToColor[record.moodType] || "#ddd",
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
      <div className="grid grid-cols-3 gap-4">
        {months.map(({ label, year, month }) => (
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
                  const color = moodData?.color || "#ddd";
                  const tooltipText =
                    moodData?.emoji && moodData?.diary
                      ? `Day ${moodData.date}: ${moodData.emoji} ${moodData.diary}`
                      : undefined;

                  return (
                    <Tooltip.Provider key={dayIdx} delayDuration={0}>
                      <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                          <div
                            className="w-full relative rounded cursor-default"
                            style={{ backgroundColor: color }}
                          >
                            {/* height = width */}
                            <div className="pb-[100%]"></div>

                            <div className="absolute inset-0 flex items-center justify-center">
                              <span
                                className={`leading-none ${
                                expanded ? "text-[1.4rem]" : "text-[0.8rem]"
                                }`}
                              >
                                {moodData?.emoji || ""}
                              </span>
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
