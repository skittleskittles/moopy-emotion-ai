import axios from "axios";
import { UserToken } from "../models/User";
import { handleError } from "../lib/utils";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" },
});

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
