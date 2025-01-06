export default interface IProfessor {
    id: number;
    userId: number;
    name: string;
    lastName: string;
    email: string;
    classIDs: number[];
    participations: number[]; 
    biography: string;
    questionIDs: number[]; 
    quizIDs: number[]; 
    ruleIDs: number[]; 
}