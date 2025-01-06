import IQuestion from "./Question";

export default interface IQuiz {
    id: number;
    ruleID: number;
    subjectID: number;
    professorID: number;
    attempts?: number;
    averageRating: number;
    questions: IQuestion[];
    questionIDsValueX2?: number[];
    questionIDsValueX3?: number[];
}