import { SurveyRecord } from "@/models/ClientDetail";
import { ScoreTrendChart } from "./ScoreTrendChart";

interface ClientSurveyScoreSummaryProps {
  latestRecord: SurveyRecord;
  scoreHistory: SurveyRecord[];
}

export const ClientSurveyScoreSummary: React.FC<
  ClientSurveyScoreSummaryProps
> = ({ latestRecord, scoreHistory }) => {
  return (
    <div className="flex justify-end items-center space-x-6 mb-2 pl-4">
      {/* Left: Stars + Score with label */}
      <div className="flex flex-col items-center min-w-[20%] -mt-2">
        <div className="text-gray-600 font-semibold text-lg">Latest Score</div>
        <div className="flex items-center">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              className={`text-3xl ${
                idx < Math.round(latestRecord.score / 20)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
            >
              ★
            </div>
          ))}
          <div className="ml-3 text-4xl font-bold text-gray-700">
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
