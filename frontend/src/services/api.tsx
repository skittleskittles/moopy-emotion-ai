import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/",
  // baseURL: "http://106.55.105.246:6262",
  headers: { "Content-Type": "application/json" },
});

/* User */
export const login = async (username: string, password: string) => {
  const response = await api.post("/user/login", {
    username,
    password,
  });
  return response.data;
};

export const register = async (name: string, password: string) => {
  const response = await api.post("/user/register", { name, password });
  return response.data;
};

/* Survey */
export const surveySaveRecord = async (userId: number, score: number) => {
  const response = await api.post("/question/saveRecord", { userId, score });
  return response.data;
};

/* Chat */
export const chat = async ({
  message,
  userId,
  sender,
  conversationId,
}: {
  message: string;
  userId: number;
  sender: number;
  conversationId?: number;
}) => {
  try {
    const response = await api.post("/api/chat", {
      message,
      userId,
      sender,
      ...(conversationId !== undefined && { conversationId }), // 仅当 conversationId 存在时才包含
    });

    return response.data;
  } catch (error) {
    console.error("Error in chat API:", error);
    throw error;
  }
};

export const getChatList = async (userId: number) => {
  const response = await api.post("/api/messageList", { userId });
  return response.data;
};

export const saveChatMessage = async (
  userId: number,
  message: string,
  sender: number
) => {
  const response = await api.post("/api/save", { userId, message, sender });
  return response.data;
};
/* moods for a month*/
export const getMonthlyMoods = async (userId: string, year: number, month: number) => {
  const response = await api.get("/moods/month", {
    params: { userId, year, month },
  });
  return response.data;
};

/*  moods for year */
export const getYearlyMoods = async (userId: string, year: number) => {
  const response = await api.get("/moods/year", {
    params: { userId, year },
  });
  return response.data;
};

/* Save mood*/
export const saveMood = async (userId: string, date: string, emoji: string, color: string, description: string) => {
  const response = await api.post("/moods", {
    userId,
    date,
    emoji,
    color,
    description,
  });
  return response.data;
};

/* Update */
export const updateMood = async (userId: string, date: string, emoji: string, color: string, description: string) => {
  const response = await api.put("/moods", {
    userId,
    date,
    emoji,
    color,
    description,
  });
  return response.data;
};

/* Delete */
export const deleteMood = async (userId: string, date: string) => {
  const response = await api.delete("/moods", {
    data: { userId, date },
  });
  return response.data;
};
