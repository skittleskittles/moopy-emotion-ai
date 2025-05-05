import { MoodRecord } from "./MoodTrakcer";

export interface ClientDetailVo {
  userId: number;
  username: string;
  fullName: string;
  score: number;
  connectedDate: string;
  lastLoginDate: string;
  conversationList: ConversationVo[];
  moodRecordList: MoodRecord[];
}

export interface ConversationVo {
  conversationId: number;
  messageList: ChatVo[];
}

export interface ChatVo {
  messageId: number;
  message: string;
  sender: number;
  userId: number;
  conversationId: number;
  createdAt: string;
  modifiedAt: string;
}

export interface GetClientDetailResponse {
  code: number;
  message: string;
  data: ClientDetailVo;
}

export interface SurveyRecord {
  date: string; // e.g. '2025-05-01'
  score: number;
  responses: number[]; // index = questionId, value = selectedOptionIndex (0-3)
}
