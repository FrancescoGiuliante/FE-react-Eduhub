import { useStoreContext } from "@/contexts/StoreContext";
import { useEffect, useState } from "react";
import { AtSign, GraduationCap, Users } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import ICourse from "@/interfaces/Course";
import IProfessor from "@/interfaces/IProfessor";

interface ITableProfessorsCourseProps {
    course: ICourse;
}

export const TableProfessorsCourse = ({ course }: ITableProfessorsCourseProps) => {
    const { professors } = useStoreContext();

    const [professorList, setProfessorList] = useState<IProfessor[] | null>(null);

    useEffect(() => {
        if (course.professorIDs && Array.isArray(course.professorIDs)) {
            const filteredProfessors = professors.filter((professor) =>
                course.professorIDs.includes(professor.id)
            );

            setProfessorList(filteredProfessors);
        }
    }, [course, professors]);

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">All the professors for this course</h2>
                {/* <Link to="#">
                    <Button className="bg-green-600 hover:bg-green-800 text-white hover:text-gray-100">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Professor
                    </Button>
                </Link> */}
            </div>
            {professorList && professorList.length > 0 ? (
                <ScrollArea className="h-fit rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-100">
                                <TableHead className="w-[200px]"><Users className="mr-2 inline-block" />Name</TableHead>
                                <TableHead className="w-[200px]"><Users className="mr-2 inline-block" />Last Name</TableHead>
                                <TableHead className="w-[200px]"><AtSign className="mr-2 inline-block" />Email</TableHead>
                                <TableHead className="text-right"><GraduationCap className="mr-2 inline-block" />Classes</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {professorList.map((professor) => (
                                <TableRow key={professor.id}>
                                    <TableCell className="font-medium">{professor.name}</TableCell>
                                    <TableCell>{professor.lastName}</TableCell>
                                    <TableCell>{professor.email}</TableCell>
                                    <TableCell className="text-right">{professor.classIDs?.length || 0}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </ScrollArea>
            ) : (
                <p className="text-center text-gray-500">No professors found for this course.</p>
            )}
        </div>
    );
};
