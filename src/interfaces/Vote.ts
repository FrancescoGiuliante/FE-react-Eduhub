export default interface IVote {
    id: number;
    quizID: number;
    studentID: number;
    date: [number, number, number];
    result: number
}