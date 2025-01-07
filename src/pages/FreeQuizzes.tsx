import { TableQuizzes } from '@/components/elaborated/TableQuizzes'
import { useInfoClassContext } from '@/contexts/InfoClassContext'
import IQuiz from '@/interfaces/Quiz'
import { useEffect, useState } from 'react'


export const FreeQuizzes = () => {
    const { quizzes } = useInfoClassContext();
    const [freeQuizzes, setFreeQuizzes] = useState<IQuiz[]>([]);

    useEffect(() => {
        const defaultQuiz = quizzes.find(quiz => quiz.id === 44);

        if (defaultQuiz) {
            setFreeQuizzes([defaultQuiz]);
        } else {
            setFreeQuizzes([]);
        }
    }, [quizzes]);

    return (
        <div
            className="container mx-auto px-4 py-8 bg-[url('/assets/images/bg-home.png')] bg-center bg-repeat bg-cover"
            style={{ backgroundSize: '50%' }}
        >
            <TableQuizzes quizzes={freeQuizzes} />
        </div>
    );
};