import { useAuth } from '@/contexts/AuthContext'
import { useEventsContext } from '@/contexts/EventsContext'
import { useStoreContext } from '@/contexts/StoreContext'
import IStudent from '@/interfaces/IStudent'
import ILesson from '@/interfaces/Lesson'
import { useEffect, useState } from 'react'
import WeekdaySlider from '../elaborated/WeekdaySlider'
import { AttendaceStudent } from '../statistic/AttendaceStudent'
import { QuickActions } from '../card/QuickActions'
import { StudentVotes } from '../statistic/StudentVote'

export const StudentDashboard = () => {
    const [studentLessons, setStudentLessons] = useState<ILesson[] | null>(null)
    const [student, setStudent] = useState<IStudent | null>(null)

    const { user } = useAuth()
    const { lessons } = useEventsContext()
    const { courseClasses, students } = useStoreContext()

    useEffect(() => {
        if (user) {
            const s = students.find((student) => student.userId === user.id);
            if (s) {
                setStudent(s)
                const studentCourseClassIDs = s.classIDs;
                const studentClasses = courseClasses.filter((courseClass) =>
                    studentCourseClassIDs.includes(courseClass.id)
                );
                const filteredLessons = lessons.filter((lesson) =>
                    studentClasses.some((courseClass) => courseClass.id === lesson.classID)
                );
                setStudentLessons(filteredLessons);
            }
        }
    }, [user, lessons, courseClasses]);

    return (
        <div
            className="container mx-auto px-4 py-8 mt-4 md:mt-0 bg-[url('/assets/images/bg-home.png')] bg-center bg-repeat bg-cover"
            style={{ backgroundSize: '50%' }}
        >
            <div className="bg-blue-100 rounded-lg p-6 mb-8">
                <h1 className="text-3xl font-bold text-blue-800">Student Dashboard</h1>
            </div>
            {studentLessons && <WeekdaySlider lessons={studentLessons} showButtons={false} />}
            <img src="/assets/images/student.png" className='max-w-xs mx-auto' alt="" />

            <div className='flex flex-col md:flex-row justify-center items-center gap-4'>
                {studentLessons && student && <AttendaceStudent studentLessons={studentLessons} student={student} />}
                <img src="/assets/gifs/quick.gif" className='size-32' alt="" />
                <div className='w-full'>
                    <QuickActions />
                </div>
                <img src="/assets/gifs/charts.gif" className='size-32' alt="" />
                {student && <StudentVotes studentId={student.id} />}
            </div>
        </div>
    )
}