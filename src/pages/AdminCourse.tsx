import { TableClassesCourse } from '@/components/elaborated/TableClassesCourse';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ICourse from '@/interfaces/Course';
import { useAuth } from '@/contexts/AuthContext';
import { TableProfessorsCourse } from '@/components/elaborated/TableProfessorsCourse';

const API_URL = import.meta.env.VITE_API_URL;

export const AdminCourse = () => {
    const { courseID } = useParams<{ courseID: string }>();
    const [course, setCourse] = useState<ICourse | null>(null);
    const { token } = useAuth();

    useEffect(() => {
        if (courseID) {
            axios
                .get(`${API_URL}/course/${courseID}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setCourse(response.data);
                })
                .catch((err) => {
                    console.error("Error fetching course data:", err);
                });
        }
    }, [courseID]);

    return (
        <div className='flex flex-col pb-20 gap-8 justify-items-center mx-auto max-w-xs md:max-w-4xl'>
            <div className='flex gap-5 items-center mx-auto'>
                <h1 className='text-5xl text-[#636ee4] font-bold'>{course?.path}</h1>
                <img src="/assets/gifs/courseAdmin.gif" className='max-w-60' alt="" />
            </div>
            {course && <TableClassesCourse course={course} />}
            {course && <TableProfessorsCourse course={course} />}
        </div>
    );
};
