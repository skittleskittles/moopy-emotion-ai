import QuestionCard from "@/components/survey/QuestionCard";
import { useAuth } from "@/context/AuthContext";
import { SurveyProvider, useSurvey } from "@/context/SurveyContext";
import { surveySaveRecord } from "@/services/api";
import React, { useEffect, useState } from "react";

interface Props {}

const SurveyQuestionPage = (props: Props) => {
  const { currentIndex, questions, isLoading, error, score, dispatch } =
    useSurvey();
  const { user, token, isLoggedIn } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (questions.length > 0 && currentIndex === questions.length && user) {
      submitScore();
    }
  }, [currentIndex, questions.length, user]);

  const submitScore = async () => {
    if (!isLoggedIn()) {
      alert("Please log in.");
      return;
    }

    if (!user || isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const res = await surveySaveRecord(user.id, score * 1.25);
      if (res.code !== 0) {
        throw new Error("Failed to save score");
      }
    } catch (error) {
      setSubmitError("Failed to submit score. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading)
    return <p className="text-center text-gray-600">Loading questions...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (!questions.length)
    return <p className="text-center">No questions available.</p>;

  return (
    <div className="flex flex-col h-[calc(100vh-56px)] items-center justify-center">
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
          {/* <p className="text-lg">Your total score: {score * 1.25}</p> */}
          {submitError && <p className="text-red-500 mt-2">{submitError}</p>}
          <button
            className="mt-4 px-6 py-2 bg-[#6782B8] hover:bg-[#769fcd] text-white rounded-lg"
            onClick={() => dispatch({ type: "restart" })}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Restart Survey"}
          </button>
        </div>
      )}

      {/* debug */}
      <p className="text-lg">(Debug Info): Your total score: {score * 1.25}</p>
    </div>
  );
};

export default SurveyQuestionPage;
