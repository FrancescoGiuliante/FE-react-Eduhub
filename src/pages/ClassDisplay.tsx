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
        <div
            className="container mx-auto px-4 pb-24 bg-[url('/assets/images/bg-home.png')] bg-center bg-repeat bg-cover flex flex-col justify-center items-center"
            style={{ backgroundSize: '50%' }}
        >
            <img src="/assets/gifs/courseClassDispaly.gif" className='max-w-60' alt="" />
            <CourseClassDashboard courseClass={selectedClass} />
        </div>
    );
};