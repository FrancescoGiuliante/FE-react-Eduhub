import { BookOpen, Clock, Users } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { useStoreContext } from "@/contexts/StoreContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import ILesson from "@/interfaces/Lesson";
import { format } from "date-fns";
import { useInfoClassContext } from "@/contexts/InfoClassContext";
import { Link } from "react-router-dom";

export default function TableSelectLesson() {
    const [todaysLessons, setTodaysLessons] = useState<ILesson[]>([]);
    const { professors, courseClasses } = useStoreContext();
    const { token } = useAuth();
    const { subjects } = useInfoClassContext();
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (token) {
            axios
                .get(`${API_URL}/today-lessons`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(({ data }) => {
                    setTodaysLessons(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [token]);

    const formatLessonDate = (dateArray: [number, number, number]): Date => {
        const [year, month, day] = dateArray;
        return new Date(year, month - 1, day);
    };

    const getProfessorName = (id: number): string =>
        professors.find(p => p.id === id)?.name || "Unknown Professor";

    const getSubjectName = (id: number): string =>
        subjects.find(s => s.id === id)?.name || "Unknown Subject";

    const getClassName = (id: number): string =>
        courseClasses.find(c => c.id === id)?.name || "Unknown Class";

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-blue-100 rounded-lg p-6 mb-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
                        <h1 className="text-3xl font-bold text-blue-800">Select a lesson to generate the qr-code</h1>
                    </div>
                    <p className="text-lg text-blue-600 font-semibold">
                        Total: {todaysLessons.length}
                    </p>
                </div>
            </div>


            <div className="space-y-4">
                {todaysLessons.map((lesson) => (
                    <Link to={`/attendance/generate-qr/${lesson.id}`} key={lesson.id}>
                        <Card className="overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer">
                            <CardContent className="p-4 flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <BookOpen className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-blue-600">{getSubjectName(lesson.subjectID)}</h2>
                                        <p className="text-sm text-gray-500">{getClassName(lesson.classID)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Clock className="w-4 h-4 mr-1" />
                                        <span>{format(formatLessonDate(lesson.date), 'MMM d, yyyy')}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Users className="w-4 h-4 mr-1" />
                                        <span>{getProfessorName(lesson.professorID)}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
            <img src="/assets/gifs/qr-code.gif" className="mx-auto max-w-xs" alt="" />

        </div>
    );
}
