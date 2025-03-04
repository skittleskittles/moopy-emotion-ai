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
export const chat = async (message: string) => {
  const response = await api.post("/api/chat", { message });
  return response.data;
};