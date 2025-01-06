export default interface IQuestion {
    id: number;
    prompt: string;
    answers: string[];
    correctAnswer: string;
    wrongs?: number;
    rights?: number;
    professorID: number;
}