import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, Trash2, PenSquare } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import IQuestion from '@/interfaces/Question'

interface QuestionCardProps {
  question: IQuestion;
  onView: (question: IQuestion) => void;
  onEdit: (question: IQuestion) => void;
  onDelete: (id: number) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onView, onEdit, onDelete }) => {
  const totalAnswers = (question.wrongs || 0) + (question.rights || 0);
  const rightPercentage = totalAnswers > 0 ? ((question.rights || 0) / totalAnswers) * 100 : 0;
  const wrongPercentage = totalAnswers > 0 ? ((question.wrongs || 0) / totalAnswers) * 100 : 0;

  return (
    <Card className="w-full max-w-xs">
      <CardContent className="p-4">
        <h3 className="text-base font-bold mb-1">{question.prompt}</h3>
        <p className="text-xs text-gray-600 mb-2">Correct answer: {question.correctAnswer}</p>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium">Rights: {question.rights}</span>
          <Progress value={rightPercentage} className="w-1/2 bg-gray-100" />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium">Wrongs: {question.wrongs}</span>
          <Progress value={wrongPercentage} className="w-1/2 bg-gray-100" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-1 p-2">
        <Button variant="outline" size="sm" onClick={() => onView(question)}>
          <Eye className="h-3 w-3" />
        </Button>
        <Button variant="outline" size="sm" onClick={() => onEdit(question)}>
          <PenSquare className="h-3 w-3" />
        </Button>
        <Button variant="outline" size="sm" onClick={() => onDelete(question.id)}>
          <Trash2 className="h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuestionCard;

