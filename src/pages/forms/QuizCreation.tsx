import React, { useState, useEffect } from 'react';
import { useInfoClassContext } from '@/contexts/InfoClassContext';
import { useAuth } from '@/contexts/AuthContext';
import { useStoreContext } from '@/contexts/StoreContext';
import { useNavigate, useParams } from 'react-router-dom';

import RuleManager from './RuleManager';
import { Button } from "@/components/ui/button"
import IQuestion from '@/interfaces/Question';
import IQuiz from '@/interfaces/Quiz';
import IRule from '@/interfaces/Rule';
import SelectedQuestions from '@/components/elaborated/SelectedQuestions';
import QuestionSlider from '@/components/elaborated/QuestionSlider';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import axios from 'axios';

const QuizCreation: React.FC = () => {
    const { subjectID } = useParams<{ subjectID: string }>();
    const { token } = useAuth();    
    const API_URL = import.meta.env.VITE_API_URL;

    const { handleQuizCreate, questions, associateQuestionsWithQuiz } = useInfoClassContext();
    const { user } = useAuth();
    const { professors, handleProfessorEdit } = useStoreContext();
    const { toast } = useToast();
    const navigate = useNavigate();
    const [selectedQuestions, setSelectedQuestions] = useState<(IQuestion & { value: 1 | 2 | 3 })[]>([]);
    const [selectedRule, setSelectedRule] = useState<IRule | null>(null);
    const [professorQuestions, setProfessorQuestions] = useState<IQuestion[]>([]);
    const [availableQuestions, setAvailableQuestions] = useState<IQuestion[]>([]);

    useEffect(() => {
        if (user) {
            const professor = professors.find((professor) => professor.userId === user.id);
            if (professor) {
                const userQuestions = questions.filter((question) => question.professorID === professor.id);
                setProfessorQuestions(userQuestions);
                setAvailableQuestions(userQuestions);
            }
        }
    }, [user, professors, questions]);

    const handleSelectQuestion = (question: IQuestion) => {
        if (!selectedQuestions.some(q => q.id === question.id)) {
            setSelectedQuestions([...selectedQuestions, { ...question, value: 1 }]);
            setAvailableQuestions(availableQuestions.filter(q => q.id !== question.id));
        }
    };

    const handleRemoveQuestion = (id: number) => {
        const removedQuestion = selectedQuestions.find(q => q.id === id);
        if (removedQuestion) {
            setSelectedQuestions(selectedQuestions.filter(q => q.id !== id));
            setAvailableQuestions([...availableQuestions, removedQuestion]);
        }
    };

    const handleChangeQuestionValue = (id: number, value: 1 | 2 | 3) => {
        setSelectedQuestions(selectedQuestions.map(q =>
            q.id === id ? { ...q, value } : q
        ));
    };

    const handleSubmitQuiz = async () => {
        if (!selectedRule) {
            alert('Please select a rule for the quiz');
            return;
        }

        const newQuiz: Omit<IQuiz, 'id' | 'questions'> = {
            ruleID: selectedRule.id,
            professorID: selectedRule.professorID,
            subjectID: parseInt(subjectID || '0', 10),
            averageRating: 0,
            questionIDsValueX2: selectedQuestions.filter(q => q.value === 2).map(q => q.id),
            questionIDsValueX3: selectedQuestions.filter(q => q.value === 3).map(q => q.id),
        };

        try {
            const createdQuiz = await handleQuizCreate(newQuiz);
            associateQuestionsWithQuiz(createdQuiz.id, selectedQuestions);

            for (const question of selectedQuestions) {
                const payload = {
                    quizID: createdQuiz.id, 
                    questionID: question.id, 
                };

                await axios.post(`${API_URL}/quiz-question`, payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }

            const professor = professors.find(p => p.id === selectedRule.professorID);
            if (professor) {
                const updatedProfessor = {
                    ...professor,
                    quizIDs: [...professor.quizIDs, createdQuiz.id]
                };
                await handleProfessorEdit(updatedProfessor);
            }

            toast({
                title: "Quiz Created Successfully",
                description: "Your quiz has been created and saved.",
                duration: 3000,
            });

            setSelectedQuestions([]);
            setSelectedRule(null);
            setAvailableQuestions(professorQuestions);

            navigate("/home/tables-sub&quiz");
        } catch (error) {
            console.error("Error creating quiz:", error);
            toast({
                title: "Error",
                description: "There was an issue creating the quiz.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="flex h-full">
            <div className="flex-grow p-4 overflow-y-auto pr-80">
                <div className="bg-blue-100 rounded-lg p-6 mb-8">
                    <h1 className="text-3xl font-bold text-blue-800">Create New Quiz</h1>
                </div>
                <RuleManager onSelectRule={setSelectedRule} selectedRule={selectedRule} />
                <SelectedQuestions
                    questions={selectedQuestions}
                    onRemoveQuestion={handleRemoveQuestion}
                    onChangeQuestionValue={handleChangeQuestionValue}
                />
                <Button className="mt-4" onClick={handleSubmitQuiz} disabled={selectedQuestions.length === 0 || !selectedRule}>
                    Create Quiz
                </Button>
            </div>
            <QuestionSlider
                questions={availableQuestions}
                onSelectQuestion={handleSelectQuestion}
                selectedQuestionIds={selectedQuestions.map(q => q.id)}
            />
            <Toaster />
        </div>
    );
};

export default QuizCreation;
