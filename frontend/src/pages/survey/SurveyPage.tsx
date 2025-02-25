import { ROUTE_PATHS } from "@/routes/Routes";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

interface Props {}

const SurveyPage = (props: Props) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-[calc(100vh-56px)] items-center justify-center">
      {/* Banner */}
      <div className="w-full h-[150px] bg-white flex items-center justify-center">
        <h1 className="text-[64px] leading-[76.8px] font-newsreader text-black tracking-tight">
          Change can start with a single step
        </h1>
      </div>

      <p className="text-[20px] font-nobile text-[#A9A6A6] mb-40">
        Our online mental health tests can help make sense of your feelings and
        could be the first step towards getting the right help.
      </p>

      {/* 按钮 */}
      <button
        className="mt-50 w-[410px] h-[149px] bg-[#6782B8] text-white hover:bg-[#7C92BD] text-[48px] font-medium px-8 py-4 rounded-lg  transition"
        onClick={() => navigate(ROUTE_PATHS.SURVEY_QUESTIONS)}
      >
        Take the Survey
      </button>
    </div>
  );
};

export default SurveyPage;
