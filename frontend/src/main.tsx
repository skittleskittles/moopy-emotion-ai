import { router } from "./routes/Routes.tsx";
import React from "react";
import ReactDOM from "react-dom/client";;
import { ThemeProvider } from "@/context/ThemeContext.tsx";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
