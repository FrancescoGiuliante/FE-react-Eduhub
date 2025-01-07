import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, Trash2, PlayCircle } from 'lucide-react'
import IQuiz from '@/interfaces/Quiz';
import { ViewQuizDialog } from '../common/ViewQuizDialog';
import { ConfirmDeleteQuizDialog } from '../common/ConfirmDeleteQuizDialog';
import { useAuth } from '@/contexts/AuthContext';
import { TakeQuizDialog } from '../common/TakeQuizDialog';

interface IQuizCardProps {
    quiz: IQuiz;
    subjectName: string;
}

export const QuizCard: React.FC<IQuizCardProps> = ({ quiz, subjectName }) => {
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isTakeDialogOpen, setIsTakeDialogOpen] = useState(false);
    const { user } = useAuth();

    return (
        <Card className="w-full">
            <CardHeader className="p-4">
                <CardTitle className="text-md font-semibold text-blue-600">{subjectName}</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
                <div className="text-sm text-gray-600 mb-2">
                    <p>Attempts: {quiz.attempts || 0}</p>
                    <p>Average Rating: {quiz.averageRating.toFixed(2)}</p>
                    <p>Questions: {quiz.questions.length}</p>
                </div>
                <div className="flex justify-end mt-2 space-x-2">
                    {user?.role === 'PROFESSOR' || user?.role === 'ADMIN' ? (
                        <>
                            <Button variant="outline" size="sm" onClick={() => setIsViewDialogOpen(true)}>
                                <Eye className="h-3 w-3 mr-1" />
                                View
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => setIsDeleteDialogOpen(true)}>
                                <Trash2 className="h-3 w-3 mr-1" />
                                Delete
                            </Button>
                        </>
                    ) : user?.role === 'STUDENT' ? (
                        <Button variant="outline" size="sm" onClick={() => setIsTakeDialogOpen(true)}>
                            <PlayCircle className="h-3 w-3 mr-1" />
                            Take Quiz
                        </Button>
                    ) : user?.role === 'USER' ? (
                        <Button variant="outline" size="sm" onClick={() => setIsViewDialogOpen(true)}>
                            <Eye className="h-3 w-3 mr-1" />
                            View
                        </Button>
                    ) : null}
                </div>
            </CardContent>
            <ViewQuizDialog
                isOpen={isViewDialogOpen}
                onClose={() => setIsViewDialogOpen(false)}
                quiz={quiz}
            />
            <ConfirmDeleteQuizDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                quizId={quiz.id}
            />
            <TakeQuizDialog
                isOpen={isTakeDialogOpen}
                onClose={() => setIsTakeDialogOpen(false)}
                quiz={quiz}
            />
        </Card>
    );
};

