import { CourseDetails } from '@/components/common/CourseDetails';
import { useParams } from 'react-router-dom';

export const CourseDisplay = () => {
    const { courseID } = useParams<{ courseID: string }>();

    const courseIDNumber = parseInt(courseID || "", 10);
    return (
        <div className="container mx-auto py-10 bg-[url('/assets/images/bg-home.png')] bg-center bg-repeat bg-cover"
            style={{ backgroundSize: '50%' }}>
            <img src="/assets/gifs/courses.gif" className='max-w-64 mx-auto' alt="" />
            <CourseDetails courseID={courseIDNumber} />
        </div>
    )
}
