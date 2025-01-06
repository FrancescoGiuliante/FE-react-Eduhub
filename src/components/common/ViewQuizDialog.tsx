import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useInfoClassContext } from '@/contexts/InfoClassContext';
import IQuiz from '@/interfaces/Quiz';

interface ViewQuizDialogProps {
    isOpen: boolean;
    onClose: () => void;
    quiz: IQuiz;
}

export const ViewQuizDialog: React.FC<ViewQuizDialogProps> = ({ isOpen, onClose, quiz }) => {
    const { rules } = useInfoClassContext();
    const rule = rules.find(r => r.id === quiz.ruleID);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Quiz View</DialogTitle>
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
                                    <input type="checkbox" disabled className="mr-2" />
                                    <label>{answer}</label>
                                </div>
                            ))}
                            <p className="text-sm text-gray-600 mt-2">
                                Value: {quiz.questionIDsValueX2?.includes(question.id) ? 'x2' :
                                    quiz.questionIDsValueX3?.includes(question.id) ? 'x3' :
                                        'Default'}
                            </p>
                        </div>
                    ))}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};
