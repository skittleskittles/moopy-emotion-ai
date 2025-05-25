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

export const MoodTypeToEmoji: Record<MoodType, string> = {
  [MoodType.Happy]: "/assets/emoji/happy.png",
  [MoodType.Calm]: "/assets/emoji/calm.png",
  [MoodType.Angry]: "/assets/emoji/angry.png",
  [MoodType.Sad]: "/assets/emoji/sad.png",
  [MoodType.Worried]: "/assets/emoji/worried.png",
  [MoodType.Tired]: "/assets/emoji/tired.png",
  [MoodType.Bored]: "/assets/emoji/bored.png",
  [MoodType.Ecstatic]: "/assets/emoji/ecstatic.png",
  [MoodType.Content]: "/assets/emoji/content.png",
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

export interface SaveMoodRecordRequest {
  userId: number;
  moodType: MoodType;
  moodDesc: string; // e.g., "😊Happy"
  moodDiary: string; // e.g., "今天心情很不错"
  recordDate: string; // "YYYY-MM-DD"
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

export function toDateKey(year: number, month: number, day: number): string {
  const paddedMonth = String(month).padStart(2, "0");
  const paddedDay = String(day).padStart(2, "0");
  return `${year}-${paddedMonth}-${paddedDay}`;
}

export interface MoodRecord {
  moodId: number;
  userId: number;
  moodType: MoodType;
  moodDiary: string;
  year: number;
  month: number;
  day: number;
  createdAt: string;
  modifiedAt: string;
}

export interface ListMoodRecordsResponse {
  code: number;
  msg: string;
  data: MoodRecord[];
}
