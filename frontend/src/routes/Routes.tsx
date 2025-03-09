import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/homepage/HomePage";
import LoginPage from "../pages/login/LoginPage";
import SurveyQuestionPage from "../pages/survey/SurveyQuestionPage";
import ChatPage from "../pages/chat/ChatPage";
import ProfilePage from "../pages/profile/ProfilePage";
import { SurveyProvider } from "@/context/SurveyContext";
import RegisterPage from "@/pages/login/RegisterPage";
import SurveyPage from "@/pages/survey/SurveyPage";
//add
import MoodTracker from "@/components/homepage/MoodTracker";
import MoodDay from "@/components/homepage/MoodDay";
import YearTracker from  "@/components/homepage/YearTracker"; 

export const ROUTE_PATHS = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  SURVEY: "/survey",
  SURVEY_QUESTIONS: "/survey/questions",
  CHAT: "/chat",
  PROFILE: "/profile",

  MOOD_TRACKER: "/mood-tracker", // ➤ Mood 日历页面
  MOOD_DAY: "/mood-day/:date", // ➤ 具体日期的 Mood 页面
  YEAR_TRACKER: "/year-tracker",
  
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: ROUTE_PATHS.HOME, element: <HomePage /> },
      { path: ROUTE_PATHS.LOGIN, element: <LoginPage /> },
      { path: ROUTE_PATHS.REGISTER, element: <RegisterPage /> },
      {
        path: ROUTE_PATHS.SURVEY,
        element: <SurveyPage />,
      },
      {
        path: ROUTE_PATHS.SURVEY_QUESTIONS,
        element: (
          <SurveyProvider>
            <SurveyQuestionPage />
          </SurveyProvider>
        ),
      },
      { path: ROUTE_PATHS.CHAT, element: <ChatPage /> },
      { path: ROUTE_PATHS.PROFILE, element: <ProfilePage /> },

      // ➤ 添加 Mood Tracker 和 MoodDay 页面
      { path: ROUTE_PATHS.MOOD_TRACKER, element: <MoodTracker /> },
      { path: ROUTE_PATHS.MOOD_DAY, element: <MoodDay /> },
      { path: ROUTE_PATHS.YEAR_TRACKER, element: <YearTracker /> },
    ],
  },
]);
