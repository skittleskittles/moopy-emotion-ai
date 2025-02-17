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

export const ROUTE_PATHS = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  SURVEY: "/survey",
  SURVEY_QUESTIONS: "/survey/questions",
  CHAT: "/chat",
  PROFILE: "/profile",
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
    ],
  },
]);
