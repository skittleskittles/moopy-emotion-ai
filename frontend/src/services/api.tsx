import axios from "axios";
import { ConnectType, ConnectionListResponse } from "@/models/Connection";
import { GetClientDetailResponse } from "@/models/ClientDetail";
import {
  SaveMoodRecordRequest,
  SaveMoodRecordResponse,
  ListMoodRecordsRequest,
  ListMoodRecordsResponse,
} from "@/models/MoodTrakcer";

const api = axios.create({
  baseURL: "http://localhost:8081/",
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

/* Role */
export const updateRole = async (userId: number, role: number) => {
  const response = await api.post("/user/updateRole", { userId, role });
  return response.data;
};

/* Connect */
export const connect = async (
  currentUserCode: string,
  connectCode: string,
  clientName: string,
  connectType: ConnectType
) => {
  const response = await api.post("/user/connect", {
    currentUserCode,
    connectCode,
    clientName,
    connectType,
  });
  return response.data;
};

export const disconnect = async (therapistId: number, clientId: number) => {
  const response = await api.post("/user/disconnect", {
    therapistId,
    clientId,
  });
  return response.data;
};

/* Credentials */
export const credentialInsert = async (
  userId: number,
  fullName: string,
  licenseType: string,
  licenseNumber: string,
  issuingState: string,
  licenseExpirationDate: string
) => {
  const response = await api.post("/credential/insert", {
    userId,
    fullName,
    licenseType,
    licenseNumber,
    issuingState,
    licenseExpirationDate,
  });
  return response.data;
};

/* Connection List */
export const connectionList = async (
  therapistId: number,
  clientId: number
): Promise<ConnectionListResponse> => {
  const response = await api.post<ConnectionListResponse>(
    "/user/listConnection",
    {
      therapistId,
      clientId,
    }
  );
  return response.data;
};

/* Client Detail */
export const getClientDetail = async (
  therapistId: number,
  clientId: number
): Promise<GetClientDetailResponse> => {
  const response = await api.post<GetClientDetailResponse>("/user/detail", {
    therapistId,
    clientId,
  });
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

/* Mood Tracker */
export const saveMoodRecord = async (
  payload: SaveMoodRecordRequest
): Promise<SaveMoodRecordResponse> => {
  const response = await api.post<SaveMoodRecordResponse>(
    "/track/saveRecord",
    payload
  );
  return response.data;
};

export const listMoodRecords = async (
  payload: ListMoodRecordsRequest
): Promise<ListMoodRecordsResponse> => {
  const response = await api.post<ListMoodRecordsResponse>(
    "/track/listRecord",
    payload
  );
  return response.data;
};
