import { MoodRecord, MoodType } from "@/models/MoodTrakcer";

export const mockMoodRecordList: MoodRecord[] = [];

const baseUserId = 1;
let idCounter = 1;

const moods = [
  MoodType.Happy,
  MoodType.Sad,
  MoodType.Confident,
  MoodType.Angry,
  MoodType.Tired,
  MoodType.Loved,
  MoodType.Thinking,
];

const diaryTexts = [
  "Feeling great today!",
  "A bit down...",
  "Crushed my goals!",
  "Frustrated with work.",
  "Not enough sleep.",
  "Appreciate my friends.",
  "Thinking about the future.",
  "Feeling motivated.",
  "Tough day but survived.",
  "Trying to stay positive.",
  "Exhausted but proud.",
  "Anxious about deadlines.",
  "Content and relaxed.",
  "Excited for what's next.",
];

// Generate 10 records for each month from Jan to May
for (let month = 0; month < 5; month++) {
  for (let i = 1; i <= 10; i++) {
    const day = i + 1;
    const moodType = moods[(i + month) % moods.length];
    const diary = diaryTexts[(i + month) % diaryTexts.length];

    mockMoodRecordList.push({
      moodId: idCounter++,
      userId: baseUserId,
      moodType,
      moodDiary: diary,
      createdAt: `2025-${String(month + 1).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}T10:00:00Z`,
      modifiedAt: `2025-${String(month + 1).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}T10:05:00Z`,
    });
  }
}
