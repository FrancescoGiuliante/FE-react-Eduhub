export default interface ICourse {
    id: number;
    path: string;
    description: string;
    professorIDs: number[]; 
    classIDs: number[]; 
}
