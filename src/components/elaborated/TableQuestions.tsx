import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import IQuestion from '@/interfaces/Question';
import { BookOpen, PlusCircle, SortAsc } from 'lucide-react'
import QuestionCard from '../card/QuestionCard';
import ConfirmDialogQuestion from '../common/ConfirmDialogQuestion';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useStoreContext } from '@/contexts/StoreContext';
import { useInfoClassContext } from '@/contexts/InfoClassContext';

const TableQuestions: React.FC = () => {
    const { user } = useAuth();
    const { professors } = useStoreContext();
    const { questions, handleQuestionDelete, handleQuestionEdit } = useInfoClassContext();
    const [professorQuestion, setProfessorQuestion] = React.useState<IQuestion[] | null>(null);

    const [viewQuestion, setViewQuestion] = React.useState<IQuestion | null>(null);
    const [editQuestion, setEditQuestion] = React.useState<IQuestion | null>(null);
    const [filterType, setFilterType] = React.useState<'default' | 'mostAnswered' | 'mostMistaken' | 'mostRight'>('default');
    const [deleteConfirmation, setDeleteConfirmation] = React.useState<{ isOpen: boolean; questionId: number | null }>({
        isOpen: false,
        questionId: null,
    });


    useEffect(() => {
        if (user) {
            const professor = professors.find((professor) => professor.userId === user.id);
            if (professor) {
                const userQuestions = questions.filter((question) => question.professorID === professor.id);
                setProfessorQuestion(userQuestions);
            }
        }
    }, [user, questions]);

    const filteredQuestions = React.useMemo(() => {
        if (!professorQuestion) {
            return [];
        }

        switch (filterType) {
            case 'mostAnswered':
                return [...professorQuestion].sort((a, b) => ((b.wrongs || 0) + (b.rights || 0)) - ((a.wrongs || 0) + (a.rights || 0)));
            case 'mostMistaken':
                return [...professorQuestion].sort((a, b) => (b.wrongs || 0) - (a.wrongs || 0));
            case 'mostRight':
                return [...professorQuestion].sort((a, b) => (b.rights || 0) - (a.rights || 0));
            default:
                return professorQuestion;
        }
    }, [professorQuestion, filterType]);

    const handleView = (question: IQuestion) => {
        setViewQuestion(question);
    };

    const handleEdit = (question: IQuestion) => {
        setEditQuestion(question);
    };

    const handleDelete = (id: number) => {
        setDeleteConfirmation({ isOpen: true, questionId: id });
    };

    const confirmDelete = () => {
        if (deleteConfirmation.questionId !== null) {
            handleQuestionDelete(deleteConfirmation.questionId);
        }
    };

    const handleSaveEdit = () => {
        if (editQuestion) {
            handleQuestionEdit(editQuestion);
            setEditQuestion(null);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="bg-blue-100 rounded-lg p-6 mb-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
                        <h1 className="text-3xl font-bold text-blue-800">All Questions</h1>
                    </div>
                    <p className="text-lg text-blue-600 font-semibold">
                        Total: {questions.length}
                    </p>
                </div>
            </div>
            <div className="flex justify-end mb-4 space-x-2">
                <Link to="/home/create-question">
                    <Button variant="outline" size="sm" className="bg-green-500 hover:bg-green-600 text-white hover:text-white flex items-center">
                        <PlusCircle />
                        <span>Create Question</span>
                    </Button>
                </Link>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFilterType('mostAnswered')}
                    className={filterType === 'mostAnswered' ? 'bg-blue-100' : ''}
                >
                    <SortAsc className="mr-2 h-4 w-4" />
                    Most Answered
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFilterType('mostMistaken')}
                    className={filterType === 'mostMistaken' ? 'bg-blue-100' : ''}
                >
                    <SortAsc className="mr-2 h-4 w-4" />
                    Most Mistaken
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFilterType('mostRight')}
                    className={filterType === 'mostRight' ? 'bg-blue-100' : ''}
                >
                    <SortAsc className="mr-2 h-4 w-4" />
                    Most Right
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredQuestions.map((question) => (
                    <QuestionCard
                        key={question.id}
                        question={question}
                        onView={handleView}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

            <Dialog open={!!viewQuestion} onOpenChange={() => setViewQuestion(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{viewQuestion?.prompt}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        {viewQuestion?.answers.map((answer, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <Checkbox id={`answer-${index}`} checked={answer === viewQuestion.correctAnswer} />
                                <label htmlFor={`answer-${index}`}>{answer}</label>
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={!!editQuestion} onOpenChange={() => setEditQuestion(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Question</DialogTitle>
                    </DialogHeader>
                    {editQuestion && (
                        <div className="space-y-4">
                            <input
                                type="text"
                                value={editQuestion.prompt}
                                onChange={(e) => setEditQuestion({ ...editQuestion, prompt: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                            {editQuestion.answers.map((answer, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        value={answer}
                                        onChange={(e) => {
                                            const newAnswers = [...editQuestion.answers];
                                            newAnswers[index] = e.target.value;
                                            setEditQuestion({ ...editQuestion, answers: newAnswers });
                                        }}
                                        className="w-full p-2 border rounded"
                                    />
                                    <Checkbox
                                        checked={answer === editQuestion.correctAnswer}
                                        onCheckedChange={() => setEditQuestion({ ...editQuestion, correctAnswer: answer })}
                                    />
                                </div>
                            ))}
                            <Button onClick={handleSaveEdit}>Save Changes</Button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
            <ConfirmDialogQuestion
                isOpen={deleteConfirmation.isOpen}
                onClose={() => setDeleteConfirmation({ isOpen: false, questionId: null })}
                onConfirm={confirmDelete}
            />
        </div>
    );
};

export default TableQuestions;

