import { useAuth } from "@/contexts/AuthContext";
import ILesson from "@/interfaces/Lesson"
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";


interface IAttendanceProfessor {
    professorLessons: ILesson[];
}

export const AttendanceProfessor: React.FC<IAttendanceProfessor> = ({ professorLessons }) => {
    const { user } = useAuth();

    const [attendances, setAttendances] = useState<number>(0);
    const [upcomingLessons, setUpcomingLessons] = useState<ILesson[]>([]);

    useEffect(() => {
        if (professorLessons) {
            const pastLessons = professorLessons.filter((lesson) => {
                const lessonDate = new Date(lesson.date[0], lesson.date[1] - 1, lesson.date[2]);
                return lessonDate < new Date();
            });

            setAttendances(pastLessons.length);

            const upcomingLessons = professorLessons.filter((lesson) => {
                const lessonDate = new Date(lesson.date[0], lesson.date[1] - 1, lesson.date[2]);
                return lessonDate >= new Date();
            });

            setUpcomingLessons(upcomingLessons);
        }
    }, [professorLessons, user]);

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold bg-blue-100 rounded-lg p-4 text-center text-blue-800">
                        Attendance Overview
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <p className="text-lg font-semibold">Completed lessons</p>
                            <p className="text-lg text-gray-600">{attendances} Lessons</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-lg font-semibold">Upcoming Lessons</p>
                            <p className="text-lg text-gray-600">{upcomingLessons.length} Lessons</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
