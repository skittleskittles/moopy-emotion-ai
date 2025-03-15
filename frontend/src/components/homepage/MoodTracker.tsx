import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDaysInMonth, format } from "date-fns";
import { ROUTE_PATHS } from "@/routes/Routes"; // 确保 ROUTE_PATHS 里有 YearTracker 的路由

const MoodTracker: React.FC = () => {
  const navigate = useNavigate();
  const currentMonth = new Date();
  const daysInMonth = getDaysInMonth(currentMonth);
  // const startOfCurrentMonth = startOfMonth(currentMonth);
  const [moodData, setMoodData] = useState<{
    [key: string]: { emoji: string; color: string };
  }>({});

  useEffect(() => {
    // 读取本地存储的 Mood 数据
    const newMoodData: { [key: string]: { emoji: string; color: string } } = {};
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = format(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day),
        "yyyy-MM-dd"
      );
      const savedMood = localStorage.getItem(`mood-${dateKey}`);
      if (savedMood) {
        newMoodData[dateKey] = JSON.parse(savedMood);
      }
    }
    setMoodData(newMoodData);
  }, [daysInMonth]);

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

      {/* 日历 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {/* 星期 */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} style={{ fontWeight: "bold" }}>
            {day}
          </div>
        ))}

        {/* 显示日历 */}
        {[...Array(daysInMonth)].map((_, index) => {
          const day = index + 1;
          const dateKey = format(
            new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day),
            "yyyy-MM-dd"
          );
          const mood = moodData[dateKey];

          return (
            <button
              key={day}
              onClick={() => navigate(`/mood-day/${dateKey}`)}
              style={{
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: mood ? mood.color : "#ddd",
                cursor: "pointer",
                fontSize: "1.5rem",
                textAlign: "center",
              }}
            >
              {mood ? mood.emoji : day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MoodTracker;
