interface ISubject {
    id: number;
    name: string;
    description: string;
    professorIDs: number[]; 
    quizIDs: number[];       
}

export default ISubject;    