import angry from "../assets/emoji/angry.png";
import calm from "../assets/emoji/calm.png";
import bored from "../assets/emoji/bored.png";
import content from "../assets/emoji/content.png";
import ecstatic from "../assets/emoji/ecstatic.png";
import happy from "../assets/emoji/happy.png";
import sad from "../assets/emoji/sad.png";
import tired from "../assets/emoji/tired.png";
import worried from "../assets/emoji/worried.png";

export enum MoodType {
  Happy = 1,
  Calm = 2,
  Angry = 3,
  Sad = 4,
  Worried = 5,
  Tired = 6,
  Bored = 7,
  Ecstatic = 8,
  Content = 9,
}

// export const MoodTypeToEmoji: { [key in MoodType]: string } = {
//   [MoodType.Happy]: "😊",
//   [MoodType.Sad]: "😢",
//   [MoodType.Confident]: "😎",
//   [MoodType.Angry]: "😡",
//   [MoodType.Tired]: "😴",
//   [MoodType.Loved]: "😍",
//   [MoodType.Thinking]: "🤔",
// };

export const MoodTypeToEmoji: { [key in MoodType]: string } = {
  [MoodType.Happy]: happy,
  [MoodType.Calm]: calm,
  [MoodType.Angry]: angry,
  [MoodType.Sad]: sad,
  [MoodType.Worried]: worried,
  [MoodType.Tired]: tired,
  [MoodType.Bored]: bored,
  [MoodType.Ecstatic]: ecstatic,
  [MoodType.Content]: content,
};

export const MoodTypeLabelMap: { [key in MoodType]: string } = {
  [MoodType.Happy]: "Happy",
  [MoodType.Calm]: "Calm",
  [MoodType.Angry]: "Angry",
  [MoodType.Sad]: "Sad",
  [MoodType.Worried]: "Worried",
  [MoodType.Tired]: "Tired",
  [MoodType.Bored]: "Bored",
  [MoodType.Ecstatic]: "Ecstatic",
  [MoodType.Content]: "Content",
};

// export const MoodTypeToColor: { [key in MoodType]: string } = {
//   [MoodType.Happy]: "#FFD700", // Happy - Yellow
//   [MoodType.Sad]: "#87CEFA", // Sad - Light Blue
//   [MoodType.Calm]: "#7ae582", // Confident - Lime Green
//   [MoodType.Angry]: "#9a031e", // Angry - Tomato Red
//   [MoodType.Tired]: "#55828b", // Tired - Gray
//   [MoodType.Content]: "#F49BAB", // Loved - Hot Pink
//   [MoodType.Ecstatic]: "#DAA520", // Thinking - Goldenrod
// };

export interface SaveMoodRecordRequest {
  userId: number;
  moodType: MoodType;
  moodDesc: string; // e.g., "😊Happy"
  moodDiary: string; // e.g., "今天心情很不错"
}

export interface SaveMoodRecordResponse {
  code: number;
  msg: string;
  data: MoodType; // 1: moodType
}

export enum MoodQueryType {
  Month = 1,
  Year = 2,
}

export interface ListMoodRecordsRequest {
  moodId?: number; // no need if batch query
  userId: number;
  queryType: MoodQueryType; // 1: by month, 2: by year
  month?: number; // must required if request by month
  year: number;
}

export interface MoodRecord {
  moodId: number;
  userId: number;
  moodType: MoodType;
  moodDiary: string;
  createdAt: string;
  modifiedAt: string;
}

export interface ListMoodRecordsResponse {
  code: number;
  msg: string;
  data: MoodRecord[];
}
