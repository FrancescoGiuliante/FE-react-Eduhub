import { useStoreContext } from "@/contexts/StoreContext";
import ICourse from "@/interfaces/Course";
import ICourseClass from "@/interfaces/CourseClass";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { BookOpen, FileText, GraduationCap, PlusCircle, Users } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

interface ITableClassesCourseProps {
    course: ICourse;
}

export const TableClassesCourse = ({ course }: ITableClassesCourseProps) => {
    const { courseClasses } = useStoreContext();

    const [courseClassList, setCourseClassList] = useState<ICourseClass[] | null>(null);

    useEffect(() => {
        if (course.classIDs && Array.isArray(course.classIDs)) {
            const filteredCourseClasses = courseClasses.filter((courseClass) =>
                course.classIDs.includes(courseClass.id)
            );

            setCourseClassList(filteredCourseClasses);
        }
    }, [course, courseClasses]);

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">All the course classes</h2>
                <Link to={`/home/register-class/${course.id}`}>
                    <Button className="bg-green-600 hover:bg-green-800 text-white hover:text-gray-100">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create Class
                    </Button>
                </Link>
            </div>
            {courseClassList && courseClassList.length > 0 ? (
                <ScrollArea className="h-fit rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-100">
                                <TableHead className="w-[200px]"><FileText className="mr-2 inline-block" />Name</TableHead>
                                <TableHead className="w-[200px]"><BookOpen className="mr-2 inline-block" />Path</TableHead>
                                <TableHead className="text-right"><Users className="mr-2 inline-block" />Students</TableHead>
                                <TableHead className="text-right"><GraduationCap className="mr-2 inline-block" />Professors</TableHead>
                                <TableHead className="text-right"><BookOpen className="mr-2 inline-block" />Subjects</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {courseClassList.map((courseClass) => (
                                <TableRow key={courseClass.id}>
                                    <TableCell className="font-medium">{courseClass.name}</TableCell>
                                    <TableCell>{courseClass.path}</TableCell>
                                    <TableCell className="text-right">{courseClass.studentIDs?.length || 0}</TableCell>
                                    <TableCell className="text-right">{courseClass.professorIDs?.length || 0}</TableCell>
                                    <TableCell className="text-right">{courseClass.subjectIDs?.length || 0}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </ScrollArea>
            ) : (
                <p className="text-center text-gray-500">No course classes found for this course.</p>
            )}
        </div>
    );
};