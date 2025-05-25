import { useState } from "react";
import { useSurvey } from "../../context/SurveyContext";
import { Button } from "../ui/button";

interface Props {}

const QuestionCard = (_: Props) => {
  const { questions, currentIndex, dispatch } = useSurvey();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!questions.length) return <p> Loading questions...</p>;

  const question = questions[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-172px)] w-full">
      {/* Question Card */}
      <div className="bg-white shadow-lg rounded-2xl border border-[#D9D9D9] p-8 max-w-full text-center">
        <h2 className="text-5xl font-nobile text-primary mb-4">
          Question {currentIndex + 1}
        </h2>
        <p className="text-2xl mb-4 font-newsreader leading-[38.4px] text-black text-center tracking-tight">
          {question.question}
        </p>

        {/* Options */}
        <div className="space-y-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`w-full py-3 px-4 text-lg rounded-lg border transition  ${
                selectedIndex === index
                  ? "bg-primary/80 text-white border-gray-300"
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
        <Button
          className="mt-4"
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
          {currentIndex + 1 === questions.length ? "Finish" : "Next"}
        </Button>
      </div>

      {/* Schedule */}
      <div className="mt-4 text-center">
        <p className="text-lg font-nobile text-black tracking-tight">
          Question {currentIndex + 1} of {questions.length}
        </p>
      </div>
    </div>
  );
};

export default QuestionCard;
