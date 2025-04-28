import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/homepage/HomePage";

import RegisterPage from "@/pages/login/RegisterPage";
import LoginPage from "../pages/login/LoginPage";

import RoleSelectionPage from "@/pages/role/SelectRolePage";
import TherapistCredentialsPage from "@/pages/role/TherapistCredentialsPage";
import ClientConnectPage from "@/pages/role/ClientConnectPage";

import { SurveyProvider } from "@/context/SurveyContext";
import SurveyPage from "@/pages/survey/SurveyPage";
import SurveyQuestionPage from "../pages/survey/SurveyQuestionPage";
import ChatPage from "../pages/chat/ChatPage";
import ProfilePage from "../pages/profile/ProfilePage";

import MoodTracker from "@/components/homepage/MoodTracker";
import MoodDay from "@/components/homepage/MoodDay";
import YearTracker from "@/components/homepage/YearTracker";

import TherapistDashboardPage from "@/pages/dashboard/TherapistDashboardPage";
import ClientDetailPage from "@/pages/dashboard/ClientDetailPage";

export const ROUTE_PATHS = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",

  ROLE_SELECTION: "/role/select",
  CLIENT_CONNECT_THERAPIST: "/client/connect",
  THERAPIST_CREDENTIALS: "/therapist/credentials",
  THERAPIST_DASHBOARD: "/therapist/dashboard",
  THERAPIST_DASHBOARD_CLIENT_DETIAL: "/therapist/dashboard/client/detail",

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
      { path: ROUTE_PATHS.ROLE_SELECTION, element: <RoleSelectionPage /> },
      {
        path: ROUTE_PATHS.THERAPIST_CREDENTIALS,
        element: <TherapistCredentialsPage />,
      },
      {
        path: ROUTE_PATHS.CLIENT_CONNECT_THERAPIST,
        element: <ClientConnectPage />,
      },
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

      {
        path: ROUTE_PATHS.THERAPIST_DASHBOARD,
        element: <TherapistDashboardPage />,
      },
      {
        path: ROUTE_PATHS.THERAPIST_DASHBOARD_CLIENT_DETIAL,
        element: <ClientDetailPage />,
      },
    ],
  },
]);
