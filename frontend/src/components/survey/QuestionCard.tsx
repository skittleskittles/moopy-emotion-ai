import React, { useState } from "react";
import { useSurvey } from "../../context/SurveyContext";

interface Props {}

const QuestionCard = (Props) => {
  const { questions, currentIndex, dispatch } = useSurvey();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!questions.length) return <p> Loading questions...</p>;

  const question = questions[currentIndex];

  return (
    <div className="items-center justify-center mt-12">
      {/* Question Card */}
      <div className="bg-white shadow-lg rounded-2xl border border-[#D9D9D9] p-8 max-w-[683px] w-full text-center">
        <h2 className="text-[50px] font-nobile text-[#664500] mb-4">
          Question {currentIndex + 1}
        </h2>
        <p className="text-[25px] mb-6 font-newsreader leading-[38.4px] text-black text-center tracking-tight">
          {question.question}
        </p>

        {/* Options */}
        <div className="space-y-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`w-full py-3 px-4 text-lg rounded-lg border transition  ${
                selectedIndex === index
                  ? "bg-[#8785a2] text-white border-gray-300"
                  : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
              }`}
              onClick={() => !isSubmitted && setSelectedIndex(index)}
              disabled={isSubmitted}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Next */}
        <button
          className="mt-4 px-6 py-2 bg-[#537791] text-white rounded-lg hover:bg-[#769fcd] disabled:bg-gray-400"
          onClick={() => {
            if (selectedIndex !== null) {
              dispatch({
                type: "answerQuestion",
                payload: question.points[selectedIndex],
              });
              setIsSubmitted(true);
              setTimeout(() => {
                dispatch({ type: "nextQuestion" });
                setSelectedIndex(null);
                setIsSubmitted(false);
              }, 50);
            }
          }}
          disabled={selectedIndex === null || isSubmitted}
        >
          Next
        </button>
      </div>

      {/* Schedule */}
      <div className="mt-6 text-center">
        <p className="text-[18px] leading-[28.8px] font-nobile text-black tracking-tight">
          Question {currentIndex + 1} of {questions.length}
        </p>
      </div>
    </div>
  );
};

export default QuestionCard;
