import { TableQuizzes } from '@/components/elaborated/TableQuizzes'
import { useAuth } from '@/contexts/AuthContext';
import { useInfoClassContext } from '@/contexts/InfoClassContext';
import { useStoreContext } from '@/contexts/StoreContext';
import IQuiz from '@/interfaces/Quiz';
import { useEffect, useState } from 'react';

export const StudentQuizzes = () => {
    const { user } = useAuth();
    const { quizzes } = useInfoClassContext();
    const { students, courseClasses } = useStoreContext();
    const [quizzes2Display, setQuizzes2Display] = useState<IQuiz[]>([]);


    useEffect(() => {
        if (user?.role === 'STUDENT') {
            const student = students.find((stud) => stud.userId === user.id);

            if (student && student.classIDs) {
                const studentCourseClasses = courseClasses.filter((courseClass) =>
                    student.classIDs.includes(courseClass.id)
                );

                const allQuizIDs = studentCourseClasses.flatMap(courseClass =>
                    courseClass.subjectIDs.flatMap(subjectID =>
                        quizzes.filter(quiz => quiz.subjectID === subjectID).map(quiz => quiz.id)
                    )
                );

                const filteredQuizzes = quizzes.filter((quiz) =>
                    allQuizIDs.includes(quiz.id)
                );

                setQuizzes2Display(filteredQuizzes);
            }
        }
    }, [user, students, courseClasses, quizzes]);



    return (
        <div className='py-8 p-4'>
            <TableQuizzes quizzes={quizzes2Display}/>
        </div>
    )
}
