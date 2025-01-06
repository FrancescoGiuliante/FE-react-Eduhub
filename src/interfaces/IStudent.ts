export default interface IStudent {
    id: number;
    userId: number;
    name: string;
    lastName: string;
    email: string;
    classIDs: number[];
    participations: number[]; 
    voteIDs: number[]; 
}