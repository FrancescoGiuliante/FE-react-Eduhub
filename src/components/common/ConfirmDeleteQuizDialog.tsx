import React from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useInfoClassContext } from '@/contexts/InfoClassContext';
import { useToast } from '@/hooks/use-toast';

interface ConfirmDeleteQuizDialogProps {
  isOpen: boolean;
  onClose: () => void;
  quizId: number;
}

export const ConfirmDeleteQuizDialog: React.FC<ConfirmDeleteQuizDialogProps> = ({ isOpen, onClose, quizId }) => {
  const { handleQuizDelete } = useInfoClassContext();
  const { toast } = useToast();

  const onConfirm = () => {
    handleQuizDelete(quizId);
    toast({
      title: "Quiz Deleted",
      description: "The quiz has been successfully deleted.",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Delete Quiz</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete this quiz? This action cannot be undone.</p>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="destructive" onClick={onConfirm}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};