import * as Tooltip from "@radix-ui/react-tooltip";

interface MoodDayCellProps {
  day: number;
  dateKey: string;
  mood?: { emoji: string; diary: string };
  isToday: boolean;
  onClick: (dateKey: string) => void;
}

export const MoodDayCell: React.FC<MoodDayCellProps> = ({
  day,
  dateKey,
  mood,
  isToday,
  onClick,
}) => {
  const outlineClass = "outline outline-2 outline-primary/50";
  const shapeClass = mood ? "rounded-xl" : "rounded-full";
  const animationClass = !mood ? "animate-breathe" : "";

  const tooltipText = mood?.emoji && mood?.diary ? mood.diary : undefined;

  return (
    <Tooltip.Provider key={day} delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            onClick={() => onClick(dateKey)}
            className={`relative w-full aspect-square border-none bg-transparent cursor-pointer p-0
              ${
                isToday ? `${outlineClass} ${shapeClass} ${animationClass}` : ""
              }
            `}
          >
            {mood ? (
              <img
                src={mood.emoji}
                alt="mood"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  borderRadius: "50%",
                }}
              />
            ) : (
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#333",
                }}
              >
                {day}
              </span>
            )}
          </button>
        </Tooltip.Trigger>

        {tooltipText && (
          <Tooltip.Portal>
            <Tooltip.Content
              sideOffset={4}
              side="top"
              className="bg-black text-white text-base font-mono px-2 py-1 opacity-70 rounded shadow-md z-50"
            >
              {tooltipText}
              <Tooltip.Arrow className="fill-black" />
            </Tooltip.Content>
          </Tooltip.Portal>
        )}
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
