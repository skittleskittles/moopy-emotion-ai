import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { listMoodRecords } from "@/services/api";
import { MoodTypeToEmoji, MoodQueryType, toDateKey } from "@/models/MoodData";
import {
  format,
  getDaysInMonth,
  getDay,
  startOfMonth,
  isToday,
} from "date-fns";
// import { ROUTE_PATHS } from "@/routes/Routes";
import { MoodModal } from "@/components/moodTracker/MoodModal";
import calendarBg from "../../assets/calendar-bg.png";

function MoodTracker() {
  // const navigate = useNavigate();
  const currentMonth = new Date();
  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDayOffset = getDay(startOfMonth(currentMonth)); // Sunday = 0

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
    } catch (error) {
      console.error("❌ Failed to fetch mood data", error);
    }
  };

  useEffect(() => {
    fetchMoodData();
  }, [user, daysInMonth]);

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

      {/* 年日历按钮 */}
      {/* <button
        onClick={() => navigate(ROUTE_PATHS.YEAR_TRACKER)}
        style={{
          padding: "10px 20px",
          margin: "20px 0",
          fontSize: "1.2rem",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        📅 View Yearly Mood Calendar
      </button> */}

      {/* 日历容器加背景 */}
      <div
        className="relative max-w-[35%]"
        style={{
          marginInline: "auto",
          aspectRatio: "1.1",
        }}
      >
        {/* 背景图层 */}
        <img
          src={calendarBg}
          alt="calendar background"
          className="absolute inset-0 flex items-center justify-center rounded-lg pointer-events-none z-0"
        />

        {/* 网格内容层 */}
        <div
          className="relative grid z-10n gap-3 pt-24 px-5"
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

            const outlineClass = "outline outline-2 outline-primary/50";
            const shapeClass = mood ? "rounded-xl" : "rounded-full";
            const animationClass = !mood ? "animate-breathe" : "";

            return (
              <button
                key={day}
                onClick={() => handleDayClick(dateKey)}
                className={`relative w-full aspect-square border-none bg-transparent cursor-pointer p-0
                  ${
                    isTodayCell
                      ? `${outlineClass} ${shapeClass} ${animationClass}`
                      : ""
                  }
                `}
              >
                {mood ? (
                  <img
                    src={mood.emoji}
                    alt="mood"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "#333",
                    }}
                  >
                    {day}
                  </span>
                )}
              </button>
            );
          })}
        </div>
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
