import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import { useInfoClassContext } from "@/contexts/InfoClassContext";
import { useStoreContext } from "@/contexts/StoreContext";
import ILesson from "@/interfaces/Lesson";
import { useEffect, useState } from "react";


interface IUpcomingLessonsProps {
    professorLessons: ILesson[];
}
const UpcomingLessons: React.FC<IUpcomingLessonsProps> = ({ professorLessons }) => {
    const { user } = useAuth();
    const { subjects } = useInfoClassContext();
    const { courseClasses } = useStoreContext();

    const [upcomingLessons, setUpcomingLessons] = useState<ILesson[]>([]);

    useEffect(() => {
        if (professorLessons) {
            const upcomingLessons = professorLessons.filter((lesson) => {
                const lessonDate = new Date(lesson.date[0], lesson.date[1] - 1, lesson.date[2]);
                return lessonDate >= new Date();
            });

            setUpcomingLessons(upcomingLessons);
        }
    }, [professorLessons, user]);

    return (
        <Card className="w-full max-w-md mb-4">
            <CardHeader>
                <CardTitle className="text-lg font-semibold bg-blue-100 rounded-lg p-4 text-center text-blue-800">
                    Upcoming Lessons
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="text-left p-2">Lesson Date</th>
                                <th className="text-left p-2">Subject</th>
                                <th className="text-left p-2">Class</th>
                            </tr>
                        </thead>
                        <tbody>
                            {upcomingLessons.map((lesson) => {
                                const lessonDate = new Date(lesson.date[0], lesson.date[1] - 1, lesson.date[2]);

                                const courseClass = courseClasses.find((cc) => cc.id === lesson.classID);
                                const subject = subjects.find((s) => s.id === lesson.subjectID);

                                return (
                                    <tr key={lesson.id}>
                                        <td className="p-2">{lessonDate.toLocaleDateString()}</td>
                                        <td className="p-2">{subject ? subject.name : 'None'}</td>
                                        <td className="p-2">{courseClass ? courseClass.name : 'None'}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default UpcomingLessons;
