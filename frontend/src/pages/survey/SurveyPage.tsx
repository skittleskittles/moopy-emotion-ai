import QuestionCard from "@/components/survey/QuestionCard";
import { SurveyProvider, useSurvey } from "@/context/SurveyContext";
import React from "react";

interface Props {}

const SurveyPage = (props: Props) => {
  const { currentIndex, questions, isLoading, error, score, dispatch } =
    useSurvey();

  if (isLoading)
    return <p className="text-center text-gray-600">Loading questions...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (!questions.length)
    return <p className="text-center">No questions available.</p>;

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Banner */}
      <div className="w-full h-[150px] bg-[#FFD8D8] flex items-center justify-center">
        <h1 className="text-[55px] leading-[76.8px] font-serif text-[#0F0F0E] tracking-tight">
          Take our quick test
        </h1>
      </div>

      {/* Banner */}
      {currentIndex < questions.length ? (
        <QuestionCard />
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold">Quiz Completed!</h2>
          <p className="text-lg">Your total score: {score}</p>
          <button
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            onClick={() => dispatch({ type: "restart" })}
          >
            Restart Survey
          </button>
        </div>
      )}

      {/* debug */}
      <p className="text-lg">Your total score: {score}</p>
    </div>
  );
};

export default SurveyPage;
