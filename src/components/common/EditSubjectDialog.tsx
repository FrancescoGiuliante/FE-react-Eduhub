import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from 'react-hook-form';
import ISubject from "@/interfaces/Subject";

interface EditSubjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: Partial<ISubject>) => void;
  subject: ISubject;
}

const EditSubjectDialog: React.FC<EditSubjectDialogProps> = ({ isOpen, onClose, onConfirm, subject }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: subject.name,
      description: subject.description,
    },
  });

  const onSubmit = (data: Partial<ISubject>) => {
    onConfirm(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Subject</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Name
              </label>
              <Input
                id="name"
                className="col-span-3"
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm col-start-2 col-span-3">{errors.name.message}</p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="description" className="text-right">
                Description
              </label>
              <Textarea
                id="description"
                className="col-span-3"
                {...register('description', { required: 'Description is required' })}
              />
              {errors.description && (
                <p className="text-red-500 text-sm col-start-2 col-span-3">{errors.description.message}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditSubjectDialog;