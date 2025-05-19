import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import { saveMoodRecord } from "@/services/api";
import { ROUTE_PATHS } from "@/routes/Routes";
import { MoodType, MoodTypeLabelMap, MoodTypeToEmoji } from "@/models/MoodData";

function MoodDay() {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const { date } = useParams(); // 获取路由参数中的日期

  const [moodType, setMoodType] = useState<MoodType>(MoodType.Happy);
  const [description, setDescription] = useState("");

  const handleSaveMood = async () => {
    try {
      if (!isLoggedIn() || !user) return;
      const response = await saveMoodRecord({
        userId: user?.id,
        moodType: moodType,
        moodDesc: MoodTypeToEmoji[moodType],
        moodDiary: description,
      });

      if (response.code === 0) {
        navigate(ROUTE_PATHS.MOOD_TRACKER);
      }
    } catch (error) {
      console.error("Failed to save mood", error);
    }
  };

  return (
    <div
      style={{
        // todo: backgroundColor: MoodTypeToColor[moodType],
        padding: "20px",
        borderRadius: "8px",
        minHeight: "100vh",
        //paddingBottom: "60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* 让标题变大 & 添加渐变色 */}
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
        How are you feeling today? ({date})
      </h1>

      {/* Emoji 选择 */}
      <select
        onChange={(e) => setMoodType(Number(e.target.value))}
        value={moodType}
        style={{
          fontSize: "1.5rem",
          padding: "10px",
          borderRadius: "5px",
          margin: "20px",
        }}
      >
        {Object.entries(MoodTypeToEmoji).map(([type, emoji]) => {
          const moodType = Number(type) as MoodType;
          return (
            <option key={type} value={type}>
              {emoji} {MoodTypeLabelMap[moodType]}
            </option>
          );
        })}
      </select>

      {/* 输入感受 */}
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe your mood"
        style={{
          padding: "10px",
          width: "80%",
          fontSize: "1.2rem",
          marginBottom: "20px",
        }}
      />

      {/* 保存心情按钮 */}
      <button
        onClick={handleSaveMood}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          fontSize: "1.2rem",
          cursor: "pointer",
        }}
      >
        Save Mood
      </button>
    </div>
  );
}

export default MoodDay;
