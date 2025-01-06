import React, { useState, useEffect } from 'react';

import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import IStudent from '@/interfaces/IStudent';
import ILesson from '@/interfaces/Lesson';

interface IAttendanceStudent {
    student: IStudent;
    studentLessons: ILesson[];
}

export const AttendaceStudent: React.FC<IAttendanceStudent> = ({ student, studentLessons }) => {

    const [attendances, setAttendances] = useState<number>(0);
    const [absences, setAbsences] = useState<number>(0);

    useEffect(() => {
        const pastLessons = studentLessons.filter((lesson) => {
            const lessonDate = new Date(lesson.date[0], lesson.date[1] - 1, lesson.date[2]);
            return lessonDate < new Date();
        });

        let attendancesCount = 0;
        let absencesCount = 0;

        pastLessons.forEach((lesson) => {
            if (lesson.participations?.includes(student.id)) {
                attendancesCount++;
            } else {
                absencesCount++;
            }
        });

        setAttendances(attendancesCount);
        setAbsences(absencesCount);
    }, [studentLessons, student.id]);

    const data = [
        { name: 'Presences', value: attendances },
        { name: 'Absences', value: absences },
    ];

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl text-center font-semibold bg-blue-100 rounded-lg p-4 text-blue-800">Your Attendance Recap</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center items-center scale-75 -mt-10">
                        <PieChart width={300} height={300}>
                            <Pie data={data} dataKey="value" nameKey="name" outerRadius={120} fill="#8884d8" >
                                <Cell key="presences" fill="#82ca9d" />
                                <Cell key="absences" fill="#f44336" />
                            </Pie>
                            <Legend />
                        </PieChart>
                    </div>
                    <div className="text-center flex justify-between">
                        <p>Presences: <span className='text-green-600'>{attendances}</span></p>
                        <p>Absences: <span className='text-red-600'>{absences}</span></p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
