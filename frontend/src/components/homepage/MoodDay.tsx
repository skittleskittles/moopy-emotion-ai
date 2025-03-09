import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// emoji 和颜色的映射
const emojiColors: { [key: string]: string } = {
  "😊": "#FFEB3B", // 开心
  "😢": "#2196F3", // 难过
  "😎": "#8BC34A", // 自信
  "😡": "#F44336", // 生气
  "😴": "#9E9E9E", // 疲倦
  "😍": "#FF4081", // 爱情
  "🤔": "#FFC107", // 思考
};

const MoodDay: React.FC = () => {
  const { date } = useParams(); // 获取路由参数中的日期
  const [emoji, setEmoji] = useState("😊");
  const [color, setColor] = useState(emojiColors[emoji]);
  const [description, setDescription] = useState("");

  useEffect(() => {
    setColor(emojiColors[emoji]); // 选择 Emoji 时更新背景颜色
  }, [emoji]);

  // 处理选择心情 emoji
  const handleEmojiChange = (newEmoji: string) => {
    setEmoji(newEmoji);
  };

  // 处理描述输入
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  // 处理保存心情
  const handleSaveMood = () => {
    localStorage.setItem(
      `mood-${date}`,
      JSON.stringify({ emoji, color, description })
    );
    alert(`Saved: ${emoji} | ${description}`);
  };

  return (
    <div
      style={{
        backgroundColor: color,
        padding: "20px",
        borderRadius: "8px",
        minHeight: "100vh",
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
        onChange={(e) => handleEmojiChange(e.target.value)}
        value={emoji}
        style={{
          fontSize: "1.5rem",
          padding: "10px",
          borderRadius: "5px",
          margin: "20px",
        }}
      >
        <option value="😊">😊 Happy</option>
        <option value="😢">😢 Sad</option>
        <option value="😎">😎 Confident</option>
        <option value="😡">😡 Angry</option>
        <option value="😴">😴 Tired</option>
        <option value="😍">😍 Loved</option>
        <option value="🤔">🤔 Thinking</option>
      </select>

      {/* 输入感受 */}
      <input
        type="text"
        value={description}
        onChange={handleDescriptionChange}
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
};

export default MoodDay;






