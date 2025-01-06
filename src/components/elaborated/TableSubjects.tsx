import React, { useState } from 'react'
import { BookOpen, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import ISubject from '@/interfaces/Subject';
import { useAuth } from '@/contexts/AuthContext';
import { CreateSubjectForm } from '../form/CreateSubjectForm';
import { SubjectCard } from '../card/SubjectCard';


interface ITableSubjectsProps {
    subjects: ISubject[];
}

export const TableSubjects: React.FC<ITableSubjectsProps> = ({ subjects }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { user } = useAuth();

    return (
        <div className="space-y-6">
            <div className="bg-blue-100 rounded-lg p-6 mb-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
                        <h1 className="text-3xl font-bold text-blue-800">All Subjects</h1>
                    </div>
                    <p className="text-lg text-blue-600 font-semibold">
                        Total: {subjects.length}
                    </p>
                </div>
            </div>

            {user?.role === 'ADMIN' && (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="mb-4 bg-green-600">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Subject
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New Subject</DialogTitle>
                        </DialogHeader>
                        <CreateSubjectForm onSubmit={() => {
                            setIsDialogOpen(false);
                        }}
                        />
                    </DialogContent>
                </Dialog>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjects.map((subject) => (
                    <SubjectCard key={subject.id} subject={subject} />
                ))}
            </div>
        </div>
    )
}
