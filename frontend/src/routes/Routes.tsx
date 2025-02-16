import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/homepage/HomePage";
import LoginPage from "../pages/login/LoginPage";
import SurveyPage from "../pages/survey/SurveyPage";
import ChatPage from "../pages/chat/ChatPage";
import ProfilePage from "../pages/profile/ProfilePage";
import { SurveyProvider } from "@/context/SurveyContext";
import RegisterPage from "@/pages/login/RegisterPage";

export const ROUTE_PATHS = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  SURVEY: "/survey",
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
        element: (
          <SurveyProvider>
            <SurveyPage />
          </SurveyProvider>
        ),
      },
      { path: ROUTE_PATHS.CHAT, element: <ChatPage /> },
      { path: ROUTE_PATHS.PROFILE, element: <ProfilePage /> },
    ],
  },
]);
