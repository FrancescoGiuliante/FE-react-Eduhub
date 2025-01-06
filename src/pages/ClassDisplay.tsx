import { CourseClassDashboard } from '@/components/courseClass/CourseClassDashboard'
import { useStoreContext } from '@/contexts/StoreContext'
import { useParams } from 'react-router-dom';

export const ClassDisplay = () => {
    const { courseClasses } = useStoreContext();
    const { courseClassID } = useParams<{ courseClassID: string }>();

    const selectedClass = courseClassID && courseClasses.find(cls => cls.id === parseInt(courseClassID));

    if (!selectedClass) {
        return <div>Class not found</div>;
    }

    return (
        <div className='flex flex-col mb-20 justify-center items-center'>
            <img src="/assets/gifs/courseClassDispaly.gif" className='max-w-60' alt="" />
            <CourseClassDashboard courseClass={selectedClass} />
        </div>
    );
};