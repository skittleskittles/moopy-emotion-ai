import { MoodRecord } from "./MoodData";

export interface ClientDetailVo {
  userId: number;
  username: string;
  fullName: string;
  connectedDate: string;
  lastLoginDate: string;
  conversationList: ConversationVo[];
  moodRecordList: MoodRecord[];
  surveyHistoryList: SurveyHistoryVO[];
}

export interface ConversationVo {
  conversationId: number;
  messageList: ChatVo[];
  sensitiveFlag: number;
}

export interface ChatVo {
  messageId: number;
  message: string;
  sender: number;
  userId: number;
  conversationId: number;
  createdAt: string;
  modifiedAt: string;
  sensitiveFlag: number;
}

export interface SurveyHistoryVO {
  userId: number; // 用户 id
  scaledScore: number; // 按比例放大的分数
  originalScore: number; // 原始分数
  surveyId: number; // 本次 survey 的唯一 id
  detailList: SurveyDetailVO[]; // 每题详情
  createdAt: string;
}

export interface SurveyDetailVO {
  userId: number; // 用户 id
  surveyId: number; // 当前 survey 的唯一 id
  questionNumber: number; // 题号，1-20
  answerIndex: number; // 1-A, 2-B, 3-C, 4-D
  createdAt: string; // 创建时间 (ISO 格式字符串)
  modifiedAt: string; // 修改时间
}

export interface GetClientDetailResponse {
  code: number;
  message: string;
  data: ClientDetailVo;
}

// export interface SurveyRecord {
//   date: string; // e.g. '2025-05-01'
//   score: number;
//   responses: number[]; // index = questionId, value = selectedOptionIndex (0-3)
// }

export const getLevelFromScore = (score: number): number => {
  if (score <= 49) return 1; // Normal
  if (score <= 59) return 2; // Mild
  if (score <= 69) return 3; // Moderate
  return 4; // Severe
};

export const getLevelLabel = (score: number) => {
  if (score <= 49) return "1 (Normal)";
  if (score <= 59) return "2 (Mild)";
  if (score <= 69) return "3 (Moderate)";
  return "4 (Severe)";
};

export const getScoreCategory = (score: number) => {
  if (score <= 49) return "Normal";
  if (score <= 59) return "Mild";
  if (score <= 69) return "Moderate";
  return "Severe";
};

export const getScoreColor = (score: number) => {
  if (score <= 49) return "text-[#047857]"; // Normal (emerald-700)
  if (score <= 59) return "text-[#a16207]"; // Mild (yellow-700)
  if (score <= 69) return "text-[#92400e]"; // Moderate (amber-700)
  return "text-[#b91c1c]"; // Severe (red-600)
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};
