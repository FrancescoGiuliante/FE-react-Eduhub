import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from 'axios'
import { useStoreContext } from '@/contexts/StoreContext'
import { useAuth } from '@/contexts/AuthContext'
import { useInfoClassContext } from '@/contexts/InfoClassContext'
import { useToast } from '@/hooks/use-toast'

interface CreateSubjectFormProps {
    onSubmit: () => void;
}

export const CreateSubjectForm: React.FC<CreateSubjectFormProps> = ({ onSubmit }) => {
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const { professors, courseClasses } = useStoreContext();
    const API_URL = import.meta.env.VITE_API_URL;
    const { token } = useAuth();
    const { handleSubjectCreate } = useInfoClassContext();
    const { toast } = useToast();

    const onSubmitForm = async (data: any) => {
        try {
            const headers = { Authorization: `Bearer ${token}` };

            const newSubject = await handleSubjectCreate({ name: data.name, description: data.description });
            const newSubjectId = newSubject.id;

            for (const courseClassID of data.courseClasses) {
                await axios.post(
                    `${API_URL}/course-class-subject`,
                    { subjectID: newSubjectId, courseClassID: courseClassID },
                    { headers }
                );
            }

            for (const professorID of data.professors) {
                await axios.post(
                    `${API_URL}/subject-professor`,
                    { subjectID: newSubjectId, professorID: professorID },
                    { headers }
                );
            }

            onSubmit();
            toast({
                title: "Subject Created",
                description: "The subject has been successfully created.",
            });
        } catch (error) {
            console.error('Error creating subject:', error);
            toast({
                title: "Error",
                description: "There was an error creating the subject.",
                variant: "destructive",
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
            <div>
                <Input
                    {...register('name', { required: 'Name is required' })}
                    placeholder="Subject Name"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message as string}</p>}
            </div>
            <div>
                <Textarea
                    {...register('description', { required: 'Description is required' })}
                    placeholder="Subject Description"
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description.message as string}</p>}
            </div>
            <div>
                <Controller
                    name="courseClasses"
                    control={control}
                    rules={{ required: 'At least one course class is required' }}
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Course Classes" />
                            </SelectTrigger>
                            <SelectContent>
                                {courseClasses.map((courseClass) => (
                                    <SelectItem key={courseClass.id} value={courseClass.id.toString()}>
                                        {courseClass.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.courseClasses && <p className="text-red-500 text-sm">{errors.courseClasses.message as string}</p>}
            </div>
            <div>
                <Controller
                    name="professors"
                    control={control}
                    rules={{ required: 'At least one professor is required' }}
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value} >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Professors" />
                            </SelectTrigger>
                            <SelectContent>
                                {professors.map((professor) => (
                                    <SelectItem key={professor.id} value={professor.id.toString()}>
                                        {professor.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.professors && <p className="text-red-500 text-sm">{errors.professors.message as string}</p>}
            </div>
            <Button type="submit">Create Subject</Button>
        </form>
    )
}

