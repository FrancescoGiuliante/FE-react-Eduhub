import { useEventsContext } from '@/contexts/EventsContext';
import { useInfoClassContext } from '@/contexts/InfoClassContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PenTool } from 'lucide-react';

interface StudentVotesProps {
    studentId: number;
}

export const StudentVotes: React.FC<StudentVotesProps> = ({ studentId }) => {
    const { votes } = useEventsContext();
    const { quizzes, subjects } = useInfoClassContext();

    const studentVotes = votes.filter(vote => vote.studentID === studentId);

    return (
        <Card className="w-full max-w-md">
            <CardHeader className="bg-blue-100 rounded-t-lg p-6">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <PenTool className="h-8 w-8 text-blue-600 mr-3" />
                        <CardTitle className="text-2xl font-bold text-blue-800">Quiz Results</CardTitle>
                    </div>
                    <p className="text-lg text-blue-600 font-semibold">
                        Total: {studentVotes.length}
                    </p>
                </div>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="text-left p-2">Subject</th>
                                <th className="text-left p-2">Quiz id</th>
                                <th className="text-left p-2">Date</th>
                                <th className="text-left p-2">Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentVotes.map((vote) => {
                                const quiz = quizzes.find(q => q.id === vote.quizID);
                                const subject = quiz ? subjects.find(s => s.id === quiz.subjectID) : null;
                                const date = new Date(vote.date[0], vote.date[1] - 1, vote.date[2]);

                                return (
                                    <tr key={vote.id}>
                                        <td className="p-2">{subject ? subject.name : 'Unknown'}</td>
                                        <td className="p-2">{quiz?.id}</td>
                                        <td className="p-2">{date.toLocaleDateString()}</td>
                                        <td className="p-2">{vote.result}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}

