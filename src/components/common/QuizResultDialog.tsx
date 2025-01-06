import React, { useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useInfoClassContext } from '@/contexts/InfoClassContext';
import IVote from '@/interfaces/Vote';
import IQuiz from '@/interfaces/Quiz';
import { Award, Target } from 'lucide-react';

interface QuizResultDialogProps {
  isOpen: boolean;
  onClose: () => void;
  vote: IVote;
  quiz: IQuiz;
}

export const QuizResultDialog: React.FC<QuizResultDialogProps> = ({ isOpen, onClose, vote, quiz }) => {
  const { rules } = useInfoClassContext();
  const rule = rules.find(r => r.id === quiz.ruleID);

  const maxScore = useMemo(() => {
    if (!rule) return 0;
    
    const defaultScore = quiz.questions.length * rule.valueRightAnswer;
    const bonusX2 = (quiz.questionIDsValueX2?.length || 0) * rule.valueRightAnswer;
    const bonusX3 = (quiz.questionIDsValueX3?.length || 0) * rule.valueRightAnswer * 2;
    
    return defaultScore + bonusX2 + bonusX3;
  }, [quiz, rule]);

  const percentage = (vote.result / maxScore) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Quiz Results</DialogTitle>
        </DialogHeader>
        <div className="mt-6 space-y-8">
          <div className="text-center">
            <div className="text-5xl font-bold text-blue-600 mb-2">{vote.result}</div>
            <div className="text-sm text-gray-500">out of {maxScore} points</div>
          </div>
          <Progress value={percentage} className="w-full h-4" />
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Target className="h-6 w-6 text-blue-500 mr-2" />
              <span className="text-lg font-semibold">{percentage.toFixed(1)}%</span>
            </div>
            <div className="flex items-center">
              <Award className="h-6 w-6 text-yellow-500 mr-2" />
              <span className="text-lg font-semibold">
                {percentage >= 90 ? 'Excellent!' : 
                 percentage >= 70 ? 'Great job!' : 
                 percentage >= 50 ? 'Good effort!' : 'Keep practicing!'}
              </span>
            </div>
          </div>
          <div className="text-center text-sm text-gray-500">
            Completed on {new Date(Date.UTC(...vote.date)).toLocaleDateString()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
