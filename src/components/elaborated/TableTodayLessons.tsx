import { BookOpen, Clock, Users } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { useStoreContext } from "@/contexts/StoreContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import ILesson from "@/interfaces/Lesson";
import { format } from "date-fns";
import { useInfoClassContext } from "@/contexts/InfoClassContext";

export default function TableTodayLessons() {
    const [todaysLessons, setTodaysLessons] = useState<ILesson[]>([]);
    const { professors, courseClasses } = useStoreContext();
    const { token } = useAuth();
    const { subjects } = useInfoClassContext();
    const API_URL = import.meta.env.VITE_API_URL;

    const [isFullScreen, setIsFullScreen] = useState(false);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullScreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullScreen(false);
            }
        }
    };

    useEffect(() => {
        const onFullScreenChange = () => {
            if (!document.fullscreenElement) {
                setIsFullScreen(false);
            }
        };

        document.addEventListener("fullscreenchange", onFullScreenChange);

        return () => {
            document.removeEventListener("fullscreenchange", onFullScreenChange);
        };
    }, []);

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
                        <h1 className="text-3xl font-bold text-blue-800">Today's Lessons</h1>
                    </div>
                    <div className="flex items-center">
                        <p className="text-lg text-blue-600 font-semibold mr-4">
                            Total: {todaysLessons.length}
                        </p>
                        <button
                            onClick={toggleFullScreen}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            {isFullScreen ? "Exit Fullscreen" : "Go Fullscreen"}
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {todaysLessons.map((lesson) => (
                    <Card key={lesson.id} className="overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                        <CardContent className="p-3">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-lg font-semibold text-blue-600">{getSubjectName(lesson.subjectID)}</h2>
                                <span className="text-sm text-gray-500">{getClassName(lesson.classID)}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600 mb-1">
                                <Clock className="w-3 h-3 mr-1" />
                                <span>{format(formatLessonDate(lesson.date), 'MMM d, yyyy')}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <Users className="w-3 h-3 mr-1" />
                                <span>{getProfessorName(lesson.professorID)}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
