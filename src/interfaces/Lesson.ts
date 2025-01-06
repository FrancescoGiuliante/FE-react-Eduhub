interface ILesson {
    id: number;
    professorID: number;
    subjectID: number;
    date: [number, number, number];
    participations: number[];
    classID: number;
}

export default ILesson; 