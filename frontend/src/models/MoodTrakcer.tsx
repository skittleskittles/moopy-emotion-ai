export enum MoodType {
  Happy = 1,
  Sad = 2,
  Confident = 3,
  Angry = 4,
  Tired = 5,
  Loved = 6,
  Thinking = 7,
}

export const MoodTypeToEmoji: { [key in MoodType]: string } = {
  [MoodType.Happy]: "😊",
  [MoodType.Sad]: "😢",
  [MoodType.Confident]: "😎",
  [MoodType.Angry]: "😡",
  [MoodType.Tired]: "😴",
  [MoodType.Loved]: "😍",
  [MoodType.Thinking]: "🤔",
};

export const MoodTypeLabelMap: { [key in MoodType]: string } = {
  [MoodType.Happy]: "Happy",
  [MoodType.Sad]: "Sad",
  [MoodType.Confident]: "Confident",
  [MoodType.Angry]: "Angry",
  [MoodType.Tired]: "Tired",
  [MoodType.Loved]: "Loved",
  [MoodType.Thinking]: "Thinking",
};

export const MoodTypeToColor: { [key in MoodType]: string } = {
  [MoodType.Happy]: "#FFD700", // Happy - Yellow
  [MoodType.Sad]: "#87CEFA", // Sad - Light Blue
  [MoodType.Confident]: "#32CD32", // Confident - Lime Green
  [MoodType.Angry]: "#FF6347", // Angry - Tomato Red
  [MoodType.Tired]: "#A9A9A9", // Tired - Gray
  [MoodType.Loved]: "#FF69B4", // Loved - Hot Pink
  [MoodType.Thinking]: "#DAA520", // Thinking - Goldenrod
};

// export const MoodTypeToColor: { [key in MoodType]: string } = {
//   [MoodType.Happy]: "#FFEB3B", // Happy - Yellow
//   [MoodType.Sad]: "#2196F3", // Sad - Light Blue
//   [MoodType.Confident]: "#8BC34A", // Confident - Lime Green
//   [MoodType.Angry]: "#F44336", // Angry - Tomato Red
//   [MoodType.Tired]: "#9E9E9E", // Tired - Gray
//   [MoodType.Loved]: "#FF4081", // Loved - Hot Pink
//   [MoodType.Thinking]: "#FFC107", // Thinking - Goldenrod
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
