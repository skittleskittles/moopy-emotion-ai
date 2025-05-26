import { useEffect, useState } from "react";

import { useAuth } from "@/context/AuthContext";
import { listMoodRecords } from "@/services/api";
import { MoodTypeToEmoji, MoodQueryType, toDateKey } from "@/models/MoodData";
import { format, startOfMonth } from "date-fns";
import { ChevronLeft, ChevronRight } from "@/components/ui/icons";
import { CalendarGrid } from "@/components/moodTracker/CalendarGrid";
import { MoodModal } from "@/components/moodTracker/MoodModal";

function MoodTracker() {
  const [currentMonth, setCurrentMonth] = useState(() =>
    startOfMonth(new Date())
  );

  const { user, isLoggedIn } = useAuth();

  const [moodData, setMoodData] = useState<{
    [key: string]: { emoji: string; diary: string };
  }>({});

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchMoodData = async () => {
    if (!isLoggedIn() || !user) return;
    try {
      const response = await listMoodRecords({
        userId: user.id,
        queryType: MoodQueryType.Month,
        month: currentMonth.getMonth() + 1,
        year: currentMonth.getFullYear(),
      });

      const newMoodData: { [key: string]: { emoji: string; diary: string } } =
        {};
      response.data.forEach((record) => {
        const dateKey = toDateKey(record.year, record.month, record.day);
        newMoodData[dateKey] = {
          emoji: MoodTypeToEmoji[record.moodType],
          diary: record.moodDiary ?? "",
        };
      });

      setMoodData(newMoodData);

      // if no mood for today, auto open mood modal
      const today = new Date();
      const todayKey = format(today, "yyyy-MM-dd");
      const isSameMonth =
        today.getMonth() === currentMonth.getMonth() &&
        today.getFullYear() === currentMonth.getFullYear();

      if (isSameMonth && !newMoodData[todayKey]) {
        setSelectedDate(todayKey);
        setModalOpen(true);
      }
    } catch (error) {
      console.error("❌ Failed to fetch mood data", error);
    }
  };

  useEffect(() => {
    fetchMoodData();
  }, [user, currentMonth]);

  const handleDayClick = (dateKey: string) => {
    setSelectedDate(dateKey);
    setModalOpen(true);
  };

  return (
    <div style={{ textAlign: "center" }}>
      {/* Banner */}
      <div className="w-full h-32 bg-white flex items-center justify-center">
        <h1 className="text-5xl font-newsreader font-semibold tracking-tight">
          Mood Calendar - {format(currentMonth, "MMMM yyyy")}
        </h1>
      </div>

      <div className="flex items-center justify-center gap-4">
        {/* 左箭头 */}
        <button
          onClick={() =>
            setCurrentMonth((prev) =>
              startOfMonth(new Date(prev.getFullYear(), prev.getMonth() - 1))
            )
          }
        >
          <ChevronLeft />
        </button>

        {/* 日历主体 */}
        <div className="w-[35%]">
          <CalendarGrid
            key={format(currentMonth, "yyyy-MM")}
            currentMonth={currentMonth}
            moodData={moodData}
            onDayClick={handleDayClick}
          />
        </div>

        {/* 右箭头 */}
        <button
          onClick={() =>
            setCurrentMonth((prev) =>
              startOfMonth(new Date(prev.getFullYear(), prev.getMonth() + 1))
            )
          }
          className="text-gray-400 hover:text-gray-900 px-2"
          aria-label="Next Month"
        >
          <ChevronRight />
        </button>
      </div>

      {/* MoodModal */}
      {selectedDate && user && (
        <MoodModal
          open={modalOpen}
          onOpenChange={(open) => {
            setModalOpen(open);
            if (!open) {
              setSelectedDate(null); // ✅ 退出时清空选中日期
            }
          }}
          date={selectedDate}
          userId={user.id}
          onSaved={() => {
            fetchMoodData(); // ✅ 保存后刷新
            setModalOpen(false); // ✅ 关闭弹窗
            setSelectedDate(null); // ✅ 清空状态
          }}
          initialMood={moodData[selectedDate]}
        />
      )}
    </div>
  );
}

export default MoodTracker;
