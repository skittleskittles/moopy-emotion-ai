import { error } from "console";
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";

interface Question {
  question: string;
  options: string[];
  points: number[];
}

interface State {
  questions: Question[];
  currentIndex: number;
  score: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: State = {
  questions: [],
  currentIndex: 0,
  score: 0,
  isLoading: true,
  error: null,
};

type ActionType =
  | { type: "setQuestions"; payload: Question[] }
  | { type: "setLoading"; payload: boolean }
  | { type: "setError"; payload: string }
  | { type: "answerQuestion"; payload: number }
  | { type: "nextQuestion" }
  | { type: "restart" };

function surveyReducer(state: State, action: ActionType): State {
  switch (action.type) {
    case "setQuestions":
      return {
        ...state,
        questions: action.payload,
        isLoading: false,
        error: null,
      };
    case "setLoading":
      return { ...state, isLoading: action.payload };
    case "setError":
      return { ...state, isLoading: false, error: action.payload };
    case "answerQuestion":
      return { ...state, score: action.payload + state.score };
    case "nextQuestion":
      return { ...state, currentIndex: state.currentIndex + 1 };
    case "restart":
      return { ...initialState, questions: state.questions, isLoading: false };
    default:
      throw new Error("Unknown action type");
  }
}

interface SurveyContextType extends State {
  dispatch: (action: ActionType) => void;
}

const SurveyContext = createContext<SurveyContextType | null>(null);

export function SurveyProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(surveyReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "setLoading", payload: true });

      try {
        const response = await fetch("/data/questions.json");
        if (!response.ok) throw new Error("Failed to load questions");

        const { questions } = await response.json();
        dispatch({ type: "setQuestions", payload: questions });
      } catch (error) {
        dispatch({ type: "setError", payload: "Error loading questions" });
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <SurveyContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
}

export function useSurvey() {
  const context = useContext(SurveyContext);
  if (!context)
    throw new Error("useSurvey must be used within a SurveyProvider");
  return context;
}
