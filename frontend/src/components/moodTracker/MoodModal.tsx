import { useEffect, useState, useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useKeenSlider } from "keen-slider/react";
import { MoodType, MoodTypeLabelMap, MoodTypeToEmoji } from "@/models/MoodData";
import { saveMoodRecord } from "@/services/api";

interface MoodModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  date: string;
  userId: number;
  onSaved?: () => void;
  initialMood?: {
    emoji: string;
    diary?: string;
  };
}

export const MoodModal: React.FC<MoodModalProps> = ({
  open,
  onOpenChange,
  date,
  userId,
  onSaved,
  initialMood,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const moodKeys = Object.keys(MoodTypeToEmoji).map(Number); // [1,2,...]
  const emojiToMoodType: { [key: string]: MoodType } = Object.entries(
    MoodTypeToEmoji
  ).reduce((acc, [key, val]) => {
    acc[val] = Number(key) as MoodType;
    return acc;
  }, {} as { [key: string]: MoodType });

  const [moodType, setMoodType] = useState<MoodType>(MoodType.Happy);
  const [diary, setDiary] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "snap",
    slides: { perView: 3, spacing: 12, origin: "center" },
    initial: 0,
    created(slider) {
      if (initialMood?.emoji) {
        const type = emojiToMoodType[initialMood.emoji];
        if (type !== undefined) {
          const idx = moodKeys.indexOf(type);
          slider.moveToIdx(idx, true);
        }
      }
    },
    slideChanged(slider) {
      const rel = slider.track.details.rel;
      const wrappedIdx =
        ((rel % moodKeys.length) + moodKeys.length) % moodKeys.length;
      const newMood = moodKeys[wrappedIdx];
      setCurrentIndex(wrappedIdx);
      setMoodType(newMood);
    },
  });

  // Handle mouse wheel scrolling
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !instanceRef.current) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0) instanceRef.current!.next();
      else instanceRef.current!.prev();
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [instanceRef]);

  // Set mood/diary from initial value
  useEffect(() => {
    if (initialMood?.emoji) {
      const type = emojiToMoodType[initialMood.emoji];
      if (type !== undefined) {
        setMoodType(type);
      }
    }
    if (initialMood?.diary) {
      setDiary(initialMood.diary);
    }
  }, [initialMood]);

  const handleSave = async () => {
    try {
      await saveMoodRecord({
        userId,
        moodType,
        moodDesc: MoodTypeToEmoji[moodType],
        moodDiary: diary,
      });
      onOpenChange(false);
      onSaved?.();
    } catch (err) {
      console.error("❌ Save error", err);
    }
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(open) => {
        onOpenChange(open);
        if (!open) {
          setDiary("");
          setMoodType(MoodType.Happy);
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 z-40" />
        <Dialog.Content className="fixed z-50 left-1/2 top-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-xl">
          <Dialog.Title className="text-xl font-bold text-center mb-4">
            How are you feeling on {date}?
          </Dialog.Title>

          {/* Top: Large emoji preview */}
          <div className="flex flex-col items-center mb-4">
            <img
              src={MoodTypeToEmoji[moodType]}
              alt="Selected mood"
              className="w-20 h-20 mb-2"
            />
            <p className="text-lg font-medium">{MoodTypeLabelMap[moodType]}</p>
          </div>

          {/* Emoji Carousel */}
          <div className="relative mb-4">
            <div
              ref={(node) => {
                containerRef.current = node; // for wheel event
                sliderRef(node); // for keen-slider
              }}
              className="keen-slider"
            >
              {moodKeys.map((mood, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <div
                    key={mood}
                    className="keen-slider__slide flex justify-center items-center"
                    onClick={() => {
                      setMoodType(mood);
                      instanceRef.current?.moveToIdx(idx, true);
                    }}
                  >
                    <div className="relative">
                      <img
                        src={(MoodTypeToEmoji as Record<number, string>)[mood]}
                        className={`w-14 h-14 cursor-pointer rounded-full border-2 transition duration-300 ${
                          isActive
                            ? "border-secondary"
                            : "border-transparent opacity-40"
                        }`}
                      />
                      {!isActive && (
                        <div className="absolute inset-0 bg-white/50 rounded-full pointer-events-none" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Arrows */}
            <div className="flex justify-between absolute top-1/2 w-full px-2 -translate-y-1/2">
              <button
                onClick={() => instanceRef.current?.prev()}
                className="text-2xl text-gray-500 hover:text-black"
              >
                ←
              </button>
              <button
                onClick={() => instanceRef.current?.next()}
                className="text-2xl text-gray-500 hover:text-black"
              >
                →
              </button>
            </div>
          </div>

          {/* Diary Input */}
          <textarea
            value={diary}
            onChange={(e) => setDiary(e.target.value)}
            placeholder="Write a short note about your mood today..."
            className="w-full border border-gray-300 rounded-md p-2 text-sm mb-4"
            rows={3}
          />

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={diary.trim() === ""}
            className={`w-full py-2 rounded-md font-semibold transition-colors ${
              diary.trim()
                ? "bg-primary text-white hover:bg-primary/80"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Save
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
