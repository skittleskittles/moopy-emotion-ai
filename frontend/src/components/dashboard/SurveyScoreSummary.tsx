import { SurveyRecord } from "@/models/ClientDetail";
import { ScoreTrendChart } from "./ScoreTrendChart";

interface ClientSurveyScoreSummaryProps {
  latestRecord: SurveyRecord;
  scoreHistory: SurveyRecord[];
}

export const ClientSurveyScoreSummary: React.FC<
  ClientSurveyScoreSummaryProps
> = ({ latestRecord, scoreHistory }) => {
  const getBarColor = (
    score: number,
    idx: number,
    filledBars: number
  ): string => {
    if (idx >= filledBars) return "#d1d5db"; // Empty bar color

    if (score <= 49) return "#d1fae5"; // Normal
    if (score <= 60) return "#fef3c7"; // Mild
    if (score <= 70) return "#fde68a"; // Moderate
    return "#fecaca"; // Severe
  };

  return (
    <div className="flex justify-end items-center space-x-6 mb-2 pl-4">
      {/* Left: Stars + Score with label */}
      <div className="flex flex-col items-center min-w-[20%] -mt-2">
        {/* Title + info icon */}
        <div className="flex items-center space-x-1 text-gray-600 font-semibold text-lg">
          <span>Latest Score</span>
          {/* Info icon with tooltip on hover */}
          <div className="relative group cursor-pointer">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zM9 7a1 1 0 112 0 1 1 0 01-2 0zm1 2a1 1 0 00-1 1v4a1 1 0 002 0v-4a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <div className="absolute left-5 top-1 w-[220px] text-sm font-normal bg-gray-700 text-white rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
              Higher scores indicate more depressive or anxious states
            </div>
          </div>
        </div>

        {/* Signal bars and score display */}
        <div className="flex items-end space-x-2 mt-1">
          {Array.from({ length: 5 }).map((_, idx) => {
            const filledBars = Math.min(5, Math.ceil(latestRecord.score / 20));
            let bgColor = getBarColor(latestRecord.score, idx, filledBars);

            const barHeights = ["h-3", "h-5", "h-7", "h-9", "h-11"]; // increasing height

            return (
              <div
                key={idx}
                className={`w-3 ${barHeights[idx]} rounded-sm`}
                style={{ backgroundColor: bgColor }}
              />
            );
          })}
          <div className="ml-2 text-4xl font-bold text-gray-700">
            {latestRecord.score}
          </div>
        </div>
      </div>

      {/* Right: Score trend chart */}
      <div className="w-[70%] h-32 -pr-2">
        <ScoreTrendChart scoreHistory={scoreHistory} />
      </div>
    </div>
  );
};
