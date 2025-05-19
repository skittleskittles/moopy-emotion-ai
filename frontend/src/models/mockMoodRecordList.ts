import { MoodRecord, MoodType } from "@/models/MoodData";

export const mockMoodRecordList: MoodRecord[] = [];

const baseUserId = 1;
let idCounter = 1;

// Map MoodType to meaningful diary text
const moodDiaryMap: { [key in MoodType]: string } = {
  [MoodType.Happy]: "Feeling great today!",
  [MoodType.Calm]: "Content and relaxed.",
  [MoodType.Angry]: "Frustrated with work.",
  [MoodType.Sad]: "A bit down...",
  [MoodType.Worried]: "Anxious about deadlines.",
  [MoodType.Tired]: "Not enough sleep.",
  [MoodType.Bored]: "Bored and unmotivated.",
  [MoodType.Ecstatic]: "Excited for what's next.",
  [MoodType.Content]: "Appreciate my friends.",
};

// Get list of moods (MoodType enum values)
const moods = Object.values(MoodType).filter(
  (v) => typeof v === "number"
) as MoodType[];

// Generate 10 records per month (Jan to May)
for (let month = 0; month < 5; month++) {
  for (let i = 1; i <= 10; i++) {
    const day = i + 1;
    const mood = moods[(i + month) % moods.length];
    const diary = moodDiaryMap[mood];

    mockMoodRecordList.push({
      moodId: idCounter++,
      userId: baseUserId,
      moodType: mood,
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
