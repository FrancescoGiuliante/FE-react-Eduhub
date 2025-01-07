import { useAuth } from '@/contexts/AuthContext';
import { AdminHome } from '@/pages/homes/AdminHome';
import { ProfessorHome } from '@/pages/homes/ProfessorHome';
import { StudentHome } from '@/pages/homes/StudentHome';
import { UserHome } from '@/pages/homes/UserHome';

const HomeRoutes = () => {
    const { user } = useAuth();

    if (!user) {
        return null;
    }

    switch (user.role) {
        case 'ADMIN':
            return <AdminHome />;
        case 'USER':
            return <UserHome />;
        case 'STUDENT':
            return <StudentHome />;
        case 'PROFESSOR':
            return <ProfessorHome />;
        default:
            return null;
    }
};

export default HomeRoutes;
