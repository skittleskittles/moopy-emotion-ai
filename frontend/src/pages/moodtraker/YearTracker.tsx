import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { listMoodRecords } from "@/services/api";
import { MoodQueryType } from "@/models/MoodData";
import { ROUTE_PATHS } from "@/routes/Routes";

function YearTracker() {
  const { user, isLoggedIn } = useAuth();

  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const [moodData, setMoodData] = useState<{ [key: string]: string }>({});
  const [recordedMonths, setRecordedMonths] = useState<Set<number>>(new Set());

  useEffect(() => {
    const newMoodData: { [key: string]: string } = {};
    const monthsWithData = new Set<number>();
    for (let month = 0; month < 12; month++) {
      for (let day = 1; day <= 31; day++) {
        const dateKey = format(new Date(currentYear, month, day), "yyyy-MM-dd");
        const savedMood = localStorage.getItem(`mood-${dateKey}`);
        if (savedMood) {
          const { color } = JSON.parse(savedMood);
          newMoodData[dateKey] = color;
          monthsWithData.add(month);
        }
      }
    }
    setMoodData(newMoodData);
    setRecordedMonths(monthsWithData);
  }, []);

  useEffect(() => {
    const fetchMoodYearData = async () => {
      if (!isLoggedIn() || !user) return;

      try {
        const response = await listMoodRecords({
          userId: user.id,
          queryType: MoodQueryType.Year,
          year: currentYear,
        });

        const newMoodData: { [key: string]: string } = {};
        const monthsSet = new Set<number>();

        response.data.forEach((record) => {
          const dateKey = record.createdAt.split("T")[0]; // yyyy-MM-dd
          const month = new Date(dateKey).getMonth(); // 0-based
          // const color = MoodTypeToColor[record.moodType as MoodType] || "#ddd";
          const color = "#ddd";

          newMoodData[dateKey] = color;
          monthsSet.add(month);
        });

        setMoodData(newMoodData);
        setRecordedMonths(monthsSet);
      } catch (err) {
        console.error("❌ Failed to load mood year data", err);
      }
    };

    fetchMoodYearData();
  }, [user, currentYear]);

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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {Array.from({ length: 12 }).map((_, month) => (
          <div
            key={month}
            style={{
              textAlign: "center",
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <h3
              style={{ color: recordedMonths.has(month) ? "purple" : "black" }}
            >
              {format(new Date(currentYear, month, 1), "MMM")}
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: "2px",
                justifyContent: "center",
              }}
            >
              {Array.from({ length: 31 }).map((_, day) => {
                const dateKey = format(
                  new Date(currentYear, month, day + 1),
                  "yyyy-MM-dd"
                );
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default YearTracker;
