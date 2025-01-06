import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import IQuestion from '@/interfaces/Question';

interface SelectedQuestionsProps {
  questions: (IQuestion & { value: 1 | 2 | 3 })[];
  onRemoveQuestion: (id: number) => void;
  onChangeQuestionValue: (id: number, value: 1 | 2 | 3) => void;
}

const SelectedQuestions: React.FC<SelectedQuestionsProps> = ({
  questions,
  onRemoveQuestion,
  onChangeQuestionValue,
}) => {
  return (
    <div className="space-y-6">
      {questions.map((question, index) => (
        <Card key={question.id} className="w-full">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-lg">Question {index + 1}</span>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className={question.value === 1 ? 'bg-blue-100' : ''}
                  onClick={() => onChangeQuestionValue(question.id, 1)}
                >
                  x1
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={question.value === 2 ? 'bg-blue-100' : ''}
                  onClick={() => onChangeQuestionValue(question.id, 2)}
                >
                  x2
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={question.value === 3 ? 'bg-blue-100' : ''}
                  onClick={() => onChangeQuestionValue(question.id, 3)}
                >
                  x3
                </Button>
                <Button variant="destructive" size="sm" onClick={() => onRemoveQuestion(question.id)}>
                  Remove
                </Button>
              </div>
            </div>
            <p className="font-semibold mb-2">{question.prompt}</p>
            <div className="space-y-2">
              {question.answers.map((answer, answerIndex) => (
                <div key={answerIndex} className="flex items-center space-x-2">
                  <Checkbox 
                      id={`question-${question.id}-answer-${answerIndex}`} 
                      checked={answer === question.correctAnswer}
                      disabled={true}
                  />
                  <label
                      htmlFor={`question-${question.id}-answer-${answerIndex}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                      {answer}
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SelectedQuestions;

