import React from 'react';
import { BookOpen } from 'lucide-react';
import { useInfoClassContext } from '@/contexts/InfoClassContext';
import IQuiz from '@/interfaces/Quiz';
import { QuizCard } from '../card/QuizCard';

interface ITableQuizzesProps {
  quizzes: IQuiz[];
}

export const TableQuizzes: React.FC<ITableQuizzesProps> = ({ quizzes }) => {
  const { subjects } = useInfoClassContext();

  return (
    <div className="space-y-6">
      <div className="bg-blue-100 rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-blue-800">All Quizzes</h1>
          </div>
          <p className="text-lg text-blue-600 font-semibold">
            Total: {quizzes.length}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <QuizCard 
            key={quiz.id} 
            quiz={quiz} 
            subjectName={subjects.find(s => s.id === quiz.subjectID)?.name || 'Unknown Subject'}
          />
        ))}
      </div>
    </div>
  );
};