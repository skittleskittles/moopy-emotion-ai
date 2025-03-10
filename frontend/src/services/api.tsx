import axios from "axios";
import { UserToken } from "../models/User";
import { handleError } from "../lib/utils";

const api = axios.create({
  baseURL: "http://localhost:8080/",
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
  conversationId,
}: {
  message: string;
  userId: number;
  conversationId?: number;
}) => {
  try {
    const response = await api.post("/api/chat", {
      message,
      userId,
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

export const saveChatMessage = async (userId: number, message: string) => {
  const response = await api.post("/api/save", { userId, message });
  return response.data;
};
