import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "@/routes/Routes";

const YearTracker: React.FC = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const [moodData, setMoodData] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const newMoodData: { [key: string]: string } = {};
    for (let month = 0; month < 12; month++) {
      for (let day = 1; day <= 31; day++) {
        const dateKey = format(new Date(currentYear, month, day), "yyyy-MM-dd");
        const savedMood = localStorage.getItem(`mood-${dateKey}`);
        if (savedMood) {
          const { color } = JSON.parse(savedMood);
          newMoodData[dateKey] = color;
        }
      }
    }
    setMoodData(newMoodData);
  }, []);

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
        Yearly Mood Calendar - {currentYear}
      </h1>

      {/* 返回月日历按钮 */}
      <button
        onClick={() => navigate(ROUTE_PATHS.MOOD_TRACKER)}
        style={{
          padding: "10px 20px",
          margin: "20px 0",
          fontSize: "1.2rem",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        🔙 Back to Monthly Calendar
      </button>

      {/* 显示年日历 */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "10px", marginTop: "20px" }}>
        {Array.from({ length: 12 }).map((_, month) => {
          return (
            <div key={month} style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "2px" }}>
              <h3 style={{ gridColumn: "span 6", textAlign: "center" }}>{format(new Date(currentYear, month, 1), "MMM")}</h3>
              {Array.from({ length: 31 }).map((_, day) => {
                const dateKey = format(new Date(currentYear, month, day + 1), "yyyy-MM-dd");
                const color = moodData[dateKey] || "#ddd";
                return (
                  <div
                    key={day}
                    style={{
                      width: "20px",
                      height: "20px",
                      backgroundColor: color,
                      borderRadius: "3px",
                    }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default YearTracker;



