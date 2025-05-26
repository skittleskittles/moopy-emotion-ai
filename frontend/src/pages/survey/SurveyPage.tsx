import { ROUTE_PATHS } from "@/routes/Routes";

import { useNavigate } from "react-router-dom";

const SurveyPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Banner */}
      <div className="w-full h-40 bg-white flex items-center justify-center">
        <h1 className="text-6xl font-newsreader font-semibold tracking-tight">
          Change can start with a single step
        </h1>
      </div>

      <p className="mx-4 text-lg font-mono text-[#A9A6A6] mb-[10%]">
        Our online mental health tests can help make sense of your feelings and
        could be the first step towards getting the right help.
      </p>

      {/* 按钮 */}
      <button
        className="mt-50 w-[410px] h-[149px] bg-primary text-white hover:bg-primary/80 text-[48px] font-medium px-8 py-4 rounded-lg transition animate-breathe"
        onClick={() => navigate(ROUTE_PATHS.SURVEY_QUESTIONS)}
      >
        Take the Survey
      </button>
    </div>
  );
};

export default SurveyPage;
