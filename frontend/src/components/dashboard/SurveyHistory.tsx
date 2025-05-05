import { useEffect, useState } from "react";
import { SurveyRecord } from "@/models/ClientDetail";
import { ClientSurveyScoreSummary } from "./SurveyScoreSummary";
import { FaRegCalendarAlt } from "react-icons/fa";

interface Question {
  question: string;
  options: string[];
  points: number[];
}

interface Props {
  scoreHistory: SurveyRecord[];
}

export const ClientSurveyHistory: React.FC<Props> = ({ scoreHistory }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("/data/questions.json");
        const json = await res.json();
        setQuestions(json.questions);
      } catch (err) {
        console.error("Failed to load questions:", err);
      }
    };

    fetchQuestions();
  }, []);

  const getScoreCategory = (score: number) => {
    if (score <= 49) return "Normal";
    if (score <= 60) return "Mild";
    if (score <= 70) return "Moderate";
    return "Severe";
  };

  const getScoreColor = (score: number) => {
    if (score <= 49) return "text-[#047857]"; // Normal (emerald-700)
    if (score <= 60) return "text-[#a16207]"; // Mild (yellow-700)
    if (score <= 70) return "text-[#92400e]"; // Moderate (amber-700)
    return "text-[#b91c1c]"; // Severe (red-600)
  };

  return (
    <div className="h-full overflow-y-auto pr-2">
      {/* Summary */}
      <ClientSurveyScoreSummary
        latestRecord={scoreHistory[scoreHistory.length - 1]}
        scoreHistory={scoreHistory}
      />

      <hr className="my-4 border-t border-gray-300" />

      {/* History */}
      <div className="space-y-4">
        {scoreHistory.map((record, idx) => (
          <div key={idx} className="border rounded-lg p-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium flex items-center gap-2">
                  <FaRegCalendarAlt className="text-gray-600 text-base" />
                  {record.date}
                </p>

                <p className="font-medium">
                  <span className="text-gray-600">Score: </span>
                  <span
                    className={`${getScoreColor(record.score)} font-medium`}
                  >
                    {record.score} ({getScoreCategory(record.score)})
                  </span>
                </p>
              </div>

              <button
                onClick={() =>
                  setExpandedIndex(idx === expandedIndex ? null : idx)
                }
                className="text-blue-600 text-sm underline"
              >
                {expandedIndex === idx ? "Hide Details" : "View Answers"}
              </button>
            </div>

            {expandedIndex === idx && (
              <div
                className="mt-4 space-y-3 overflow-y-auto mx-10 max-h-[60vh]"
                style={{ scrollMarginTop: "80px" }} // optional, improve scroll behavior
              >
                {questions.length > 0 &&
                record.responses.length === questions.length ? (
                  questions.map((q, qIdx) => {
                    const selectedIdx = record.responses[qIdx];
                    return (
                      <div
                        key={qIdx}
                        className="flex justify-between items-start gap-6 border-b border-gray-200 py-3"
                      >
                        {/* 左侧问题文字 */}
                        <div className="w-1/2 pr-2 text-gray-800 font-medium">
                          {qIdx + 1}. {q.question}
                        </div>

                        {/* 右侧选项组 */}
                        <div className="w-1/2 flex flex-wrap gap-2 justify-start">
                          {q.options.map((opt, oIdx) => (
                            <span
                              key={oIdx}
                              className={`px-3 py-1 rounded-full text-sm border ${
                                oIdx === selectedIdx
                                  ? "bg-blue-100 border-blue-400 text-blue-700 font-semibold"
                                  : "bg-gray-100 border-gray-300"
                              }`}
                            >
                              {opt}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-gray-500 italic">
                    No response data available
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
