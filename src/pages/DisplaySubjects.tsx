import { TableQuizzes } from '@/components/elaborated/TableQuizzes';
import { TableSubjects } from '@/components/elaborated/TableSubjects'
import { useAuth } from '@/contexts/AuthContext';
import { useInfoClassContext } from '@/contexts/InfoClassContext';
import { useStoreContext } from '@/contexts/StoreContext';
import IProfessor from '@/interfaces/IProfessor';
import IQuiz from '@/interfaces/Quiz';
import ISubject from '@/interfaces/Subject';
import { useEffect, useState } from 'react';

export const DisplaySubjectsQuizzes = () => {
    const { user } = useAuth();
    const { subjects, quizzes } = useInfoClassContext();
    const { professors } = useStoreContext();
    const [subjects2Display, setSubjects2Display] = useState<ISubject[]>([]);
    const [quizzes2Display, setQuizzes2Display] = useState<IQuiz[]>([]);

    const [professor, setProfessor] = useState<IProfessor | undefined>(undefined);

    useEffect(() => {
        if (user?.role === 'ADMIN') {
            setSubjects2Display(subjects);
            setQuizzes2Display(quizzes);
        } else if (user?.role === 'PROFESSOR') {
            const professor = professors.find((prof) => prof.userId === user.id);
            
            if (professor) {
                console.log(quizzes);
                
                setProfessor(professor);
                setSubjects2Display(subjects.filter((subject) => subject.professorIDs.includes(professor.id)));
                setQuizzes2Display(quizzes.filter((quiz) => professor.quizIDs.includes(quiz.id)));
            }
        }
    }, [user, professor, subjects, quizzes]);

    return (
        <div className='px-4 py-8 flex flex-col space-y-20'>
            <TableSubjects subjects={subjects2Display} />
            <TableQuizzes quizzes={quizzes2Display} />
        </div>
    )
}
