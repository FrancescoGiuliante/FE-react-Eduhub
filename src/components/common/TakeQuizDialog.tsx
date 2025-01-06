import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useInfoClassContext } from '@/contexts/InfoClassContext';
import { useAuth } from '@/contexts/AuthContext';
import axios from 'axios';
import IQuiz from '@/interfaces/Quiz';
import { useToast } from '@/hooks/use-toast';
import IVote from '@/interfaces/Vote';
import { useStoreContext } from '@/contexts/StoreContext';
import IStudent from '@/interfaces/IStudent';
import { QuizResultDialog } from './QuizResultDialog';
import { useEffect, useState } from "react";

interface TakeQuizDialogProps {
    isOpen: boolean;
    onClose: () => void;
    quiz: IQuiz;
}

export const TakeQuizDialog: React.FC<TakeQuizDialogProps> = ({ isOpen, onClose, quiz }) => {
    const API_URL = import.meta.env.VITE_API_URL;

    const { rules } = useInfoClassContext();
    const rule = rules.find(r => r.id === quiz.ruleID);
    const { user, token } = useAuth();
    const { students } = useStoreContext();
    const { toast } = useToast();
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [student, setStudent] = useState<IStudent | undefined>(undefined);
    const [quizResult, setQuizResult] = useState<IVote | null>(null);
    const [showResult, setShowResult] = useState(false);

    const handleAnswerChange = (questionId: number, answer: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: answer }));
    };

    useEffect(() => {
        if (user?.role === 'STUDENT') {
            const student = students.find((stud) => stud.userId === user.id);
            if (student) {
                setStudent(student);
            }
        }
    }, [user]);

    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                `${API_URL}/evaluate-quiz/${quiz.id}/${student?.id}`,
                answers,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const vote: IVote = response.data;
            setQuizResult(vote);
            setShowResult(true);
        } catch (error) {
            console.error('Error submitting quiz:', error);
            toast({
                title: "Error",
                description: "There was an error submitting your quiz.",
                variant: "destructive",
            });
        }
    };

    const handleCloseResult = () => {
        setShowResult(false);
        onClose();
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Take Quiz</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="h-[60vh] pr-4">
                        {rule && (
                            <div className="mb-6 p-4 bg-blue-100 rounded-lg">
                                <h3 className="font-bold mb-2">Quiz Rules:</h3>
                                <li>Value right answer: {rule.valueRightAnswer}</li>
                                <li>Value wrong answer: {rule.valueWrongAnswer}</li>
                                <li>Time duration: {rule.duration}</li>
                            </div>
                        )}
                        {quiz.questions.map((question, index) => (
                            <div key={question.id} className="mb-6">
                                <p className="font-bold mb-2">{index + 1}. {question.prompt}</p>
                                {question.answers.map((answer, answerIndex) => (
                                    <div key={answerIndex} className="flex items-center mb-2">
                                        <input
                                            type="radio"
                                            id={`q${question.id}a${answerIndex}`}
                                            name={`question${question.id}`}
                                            value={answer}
                                            onChange={() => handleAnswerChange(question.id, answer)}
                                            className="mr-2"
                                        />
                                        <label htmlFor={`q${question.id}a${answerIndex}`}>{answer}</label>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </ScrollArea>
                    <Button onClick={handleSubmit}>Submit Quiz</Button>
                </DialogContent>
            </Dialog>
            {quizResult && (
                <QuizResultDialog
                    isOpen={showResult}
                    onClose={handleCloseResult}
                    vote={quizResult}
                    quiz={quiz}
                />
            )}
        </>
    );
};
