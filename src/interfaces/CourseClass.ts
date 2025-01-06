export default interface ICourseClass {
    id: number;
    path: string;
    name: string;
    studentIDs: number[];
    professorIDs: number[]; 
    subjectIDs: number[]; 
    syllabus: string;
    courseID: number;
    weekProgramIDs: number[];
}

