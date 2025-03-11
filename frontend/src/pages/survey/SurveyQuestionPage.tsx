import QuestionCard from "@/components/survey/QuestionCard";
import { useAuth } from "@/context/AuthContext";
import { SurveyProvider, useSurvey } from "@/context/SurveyContext";
import { ROUTE_PATHS } from "@/routes/Routes";
import { saveChatMessage, surveySaveRecord } from "@/services/api";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {}

const SurveyQuestionPage = (props: Props) => {
  const { currentIndex, questions, isLoading, error, score, dispatch } =
    useSurvey();
  const { user, isLoggedIn } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const navigate = useNavigate();

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

      await saveBotMsg(); // 确保 bot 消息保存后才跳转

      setTimeout(() => {
        navigate(ROUTE_PATHS.CHAT, { state: { fromSurvey: true } });
      }, 1000); // 延迟 1 秒再跳转，增强过渡效果
    } catch (error) {
      setSubmitError("Failed to submit score. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveBotMsg = async () => {
    if (!isLoggedIn || !user) {
      return;
    }

    const finalScore = score * 1.25;
    let botMessage = "";

    if (finalScore < 50) {
      botMessage =
        "Hey there! 😊\n" +
        "Based on your responses, it looks like you’ve been doing well emotionally—no signs of depression or anxiety. That’s wonderful to hear! 💙 Keep taking care of yourself and maintaining your well-being. " +
        "If you ever need support, I’m always here to chat!";
    } else if (finalScore >= 50 && finalScore <= 60) {
      botMessage =
        "It sounds like you might be going through a bit of a rough patch. 😔\n" +
        "Sometimes, our emotions can be tricky to navigate, and it’s completely okay to seek support. " +
        "You may have noticed things like feeling heavy in the mornings, unclear thinking, or a loss of interest in things you used to enjoy. 💭\n" +
        "Small steps—like reaching out to a friend, journaling, or doing something that brings you comfort—can make a big difference. You don’t have to go through this alone. " +
        "If it ever feels too overwhelming, consider talking to someone you trust. I’m here whenever you need a listening ear!";
    } else if (finalScore >= 61 && finalScore <= 70) {
      botMessage =
        "I can tell that you’ve been struggling, and I want you to know that your feelings are completely valid. 💙\n" +
        "If you’ve been feeling persistently down, anxious, or exhausted—especially if it’s affecting your sleep, energy, or daily life—it might be helpful to **reach out to a professional for guidance**." +
        "You deserve support, and seeking help is a sign of strength, not weakness. 💡\n" +
        "You are not alone in this, and there are people who truly care about you.\n" +
        "If you’d like, I can share some self-care tips or just be here to talk.";
    } else {
      botMessage =
        "I’m really sorry you’ve been feeling this way. 💙\n" +
        "It seems like you’re carrying a heavy emotional burden, and I want to remind you that you don’t have to go through this alone. " +
        "If you’re experiencing deep sadness, hopelessness, trouble sleeping, or overwhelming thoughts, please consider **reaching out to a mental health professional as soon as possible**.\n" +
        "Your feelings matter, and you deserve support. There are people who care about you and want to help—please don’t hesitate to seek the guidance you need." +
        "If there’s anything I can do, I’m always here to listen.";
    }

    // dispatch({ type: "restart" });
    try {
      await saveChatMessage(user.id, botMessage, 0);
    } catch (error) {
      console.error("Error saving initial bot message:", error);
    }
  };

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

      {/* QuestionCard */}
      {currentIndex < questions.length ? (
        <QuestionCard />
      ) : (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <p className="text-lg font-semibold">Calculating results...</p>
            <div className="mt-4 w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
        </div>
      )}
      {/* <p className="text-lg">(Debug Info): Your total score: {score * 1.25}</p> */}
    </div>
  );
};

export default SurveyQuestionPage;
