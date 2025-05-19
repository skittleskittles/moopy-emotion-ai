import {
  SurveyRecord,
  getScoreColor,
  getLevelFromScore,
  getScoreCategory,
} from "@/models/ClientDetail";
import { ScoreTrendChart } from "./ScoreTrendChart";

interface ClientSurveyScoreSummaryProps {
  latestRecord: SurveyRecord;
  scoreHistory: SurveyRecord[];
  expanded: boolean;
}

export const ClientSurveyScoreSummary: React.FC<
  ClientSurveyScoreSummaryProps
> = ({ latestRecord, scoreHistory, expanded }) => {
  const getBarColor = (
    score: number,
    idx: number,
    filledBars: number
  ): string => {
    if (idx >= filledBars) return "#d1d5db"; // Empty bar color

    if (score <= 49) return "#d1fae5"; // Normal
    if (score <= 59) return "#fef3c7"; // Mild
    if (score <= 69) return "#fde68a"; // Moderate
    return "#fecaca"; // Severe
  };

  return (
    <div className="flex justify-end items-center space-x-4 mt-2 mb-2">
      {/* Left: Stars + Score with label */}
      <div className="flex flex-col items-center justify-center w-[40%] h-full mx-auto -mt-4 gap-2">
        {/* Title + info icon */}
        <div
          className={`flex items-center justify-center text-gray-600 font-semibold ${
            expanded ? "text-lg" : "text-base"
          }`}
        >
          <span>
            {" "}
            {expanded
              ? "Latest Depression & Anxiety Level"
              : "Depression & Anxiety Level"}
          </span>
          {/* Info icon with tooltip on hover */}
          <div
            className={`relative group cursor-pointer ml-1 ${
              expanded ? "block" : "hidden"
            }`}
          >
            {/* Info Icon */}
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

            {/* Tooltip */}
            <div className="absolute left-5 top-1 w-[320px] text-sm font-normal bg-gray-700 text-white rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 pointer-events-none">
              <strong>
                Higher level indicates more severe symptoms of anxiety and
                depression.
              </strong>
              <br />
              Based on the Self-Rating Anxiety Scale (SAS) and Self-Rating
              Depression Scale (SDS).
            </div>
          </div>
        </div>

        {/* Signal bars and level display */}
        <div className={`flex items-end mt-1 space-x-3`}>
          {Array.from({ length: 4 }).map((_, idx) => {
            let filledBars = getLevelFromScore(latestRecord.score);
            let bgColor = getBarColor(latestRecord.score, idx, filledBars);

            let barHeights = ["h-4", "h-6", "h-8", "h-10"]; // increasing height
            if (expanded) {
              barHeights = ["h-5", "h-7", "h-9", "h-11"];
            }

            return (
              <div
                key={idx}
                className={`${expanded ? "w-5" : "w-4"} ${
                  barHeights[idx]
                } rounded-sm`}
                style={{ backgroundColor: bgColor }}
              />
            );
          })}
          {expanded ? (
            <p className="font-bold">
              <span className="text-4xl font-bold text-gray-700">
                {getLevelFromScore(latestRecord.score)}
              </span>
              <span
                className={`ml-2 ${getScoreColor(latestRecord.score)} text-lg`}
              >
                ({getScoreCategory(latestRecord.score)})
              </span>
            </p>
          ) : (
            <div className="ml-2 text-4xl font-bold text-gray-700">
              {getLevelFromScore(latestRecord.score)}
            </div>
          )}
        </div>
      </div>

      {/* Right: Score trend chart */}
      <div className="w-[60%] h-36 -pr-2">
        <ScoreTrendChart scoreHistory={scoreHistory} />
      </div>
    </div>
  );
};
