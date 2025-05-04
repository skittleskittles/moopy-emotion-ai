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
