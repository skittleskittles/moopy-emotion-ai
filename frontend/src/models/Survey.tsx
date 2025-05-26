export interface Question {
  question: string;
  options: string[];
  points: number[];
  selectedIndex?: number;
}

export interface SurveyDetailDTO {
  questionNumber: number;
  answerIndex: number; // (1=A, 2=B, 3=C, 4=D)
}

export interface SaveSurveyRecordReq {
  userId: number;
  score: number;
  detailList: SurveyDetailDTO[];
}
