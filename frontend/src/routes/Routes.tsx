import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/homepage/HomePage";
import LoginPage from "../pages/login/LoginPage";
import QuizPage from "../pages/quiz/QuizPage";
import ChatPage from "../pages/chat/ChatPage";
import ProfilePage from "../pages/profile/ProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "quiz", element: <QuizPage /> },
      { path: "chat", element: <ChatPage /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
]);
