import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileQuestion, Pencil, Trash2, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import ISubject from "@/interfaces/Subject";
import { useAuth } from '@/contexts/AuthContext'
import { useInfoClassContext } from '@/contexts/InfoClassContext'
import { useToast } from '@/hooks/use-toast';
import ConfirmDialogSubject from '../common/ConfirDialogSubject';
import { useNavigate } from 'react-router-dom';
import EditSubjectDialog from '../common/EditSubjectDialog';

interface ISubjectCardProps {
    subject: ISubject;
}

export const SubjectCard: React.FC<ISubjectCardProps> = ({subject}) => {
  const { user } = useAuth();
  const { handleSubjectDelete, handleSubjectEdit } = useInfoClassContext();
  const { toast } = useToast();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const navigate = useNavigate();

  const onDelete = () => {
    handleSubjectDelete(subject.id);
    toast({
      title: "Subject Deleted",
      description: "The subject has been successfully deleted.",
    });
  };

  const onEdit = (data: Partial<ISubject>) => {
    handleSubjectEdit({ id: subject.id, ...data });
    toast({
      title: "Subject Updated",
      description: "The subject has been successfully updated.",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="p-4">
        <CardTitle className="text-md font-semibold text-blue-600">{subject.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-xs text-gray-600 mb-2">{subject.description}</p>
        <div className="flex justify-between text-xs text-gray-500">
          <div className="flex items-center">
            <Users className="h-3 w-3 mr-1" />
            <span>{subject.professorIDs.length}</span>
          </div>
          <div className="flex items-center">
            <FileQuestion className="h-3 w-3 mr-1" />
            <span>{subject.quizIDs.length}</span>
          </div>
        </div>
        {user?.role === 'PROFESSOR' && (
          <div className="flex justify-end mt-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate(`/home/create-quiz/${subject.id}`)}
            >
              <Plus className="h-3 w-3 mr-1" />
              Create a quiz for this subject
            </Button>
          </div>
        )}
        {user?.role === 'ADMIN' && (
          <div className="flex justify-end mt-2 space-x-2">
            <Button variant="outline" size="sm" onClick={() => setIsEditDialogOpen(true)}>
              <Pencil className="h-3 w-3" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsDeleteDialogOpen(true)}>
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        )}
      </CardContent>
      <ConfirmDialogSubject
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={onDelete}
      />
      <EditSubjectDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onConfirm={onEdit}
        subject={subject}
      />
    </Card>
  )
}