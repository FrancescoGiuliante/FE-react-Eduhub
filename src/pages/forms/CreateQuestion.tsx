import { QuizQuestionForm } from '@/components/form/QuizQuestionForm'
import { useAuth } from '@/contexts/AuthContext';
import { useStoreContext } from '@/contexts/StoreContext';

export const CreateQuestion = () => {
    const { user } = useAuth();
    const { professors } = useStoreContext();

    const professor = professors.find((prof) => prof.userId === user?.id);

    return (
        <div
            className="container mx-auto py-10 bg-[url('/assets/images/bg-home.png')] bg-center bg-repeat bg-cover"
            style={{ backgroundSize: '50%' }}
        >
            {professor ? (
                <QuizQuestionForm professorID={professor.id} />
            ) : (
                <p>No professor found for this user</p>
            )}
        </div>
    );
};