import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { listMoodRecords } from "@/services/api";
import { MoodTypeToEmoji, MoodQueryType } from "@/models/MoodData";
import {
  format,
  getDaysInMonth,
  getDay,
  startOfMonth,
  isToday,
} from "date-fns";
import { ROUTE_PATHS } from "@/routes/Routes";
import { MoodModal } from "@/components/moodTracker/MoodModal";

function MoodTracker() {
  const navigate = useNavigate();
  const currentMonth = new Date();
  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDayOffset = getDay(startOfMonth(currentMonth)); // Sunday = 0

  const { user, isLoggedIn } = useAuth();

  const [moodData, setMoodData] = useState<{
    [key: string]: { emoji: string };
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
        const dateKey = record.createdAt.split("T")[0];
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
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          background: "linear-gradient(45deg, #ff6b6b, #ffa502, #1e90ff)",
          WebkitBackgroundClip: "text",
          color: "transparent",
          textAlign: "center",
        }}
      >
        Mood Calendar - {format(currentMonth, "MMMM yyyy")}
      </h1>

      {/* 年日历按钮 */}
      <button
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
      </button>

      {/* 日历网格 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "10px",
          marginTop: "20px",
          maxWidth: "500px",
          marginInline: "auto",
        }}
      >
        {/* 星期 */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            style={{
              fontWeight: "bold",
              fontSize: "14px",
              textTransform: "uppercase",
            }}
          >
            {day}
          </div>
        ))}

        {/* 首日偏移空格 */}
        {Array.from({ length: firstDayOffset }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* 日期 + 心情 */}
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
            <button
              key={day}
              onClick={() => handleDayClick(dateKey)}
              style={{
                position: "relative",
                aspectRatio: "1",
                width: "100%",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                borderRadius: "8px",
                padding: "0",
                outline: isTodayCell ? "2px solid #6d596f" : "none",
              }}
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
