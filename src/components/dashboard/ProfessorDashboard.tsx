import { useAuth } from '@/contexts/AuthContext'
import { useEventsContext } from '@/contexts/EventsContext'
import { useStoreContext } from '@/contexts/StoreContext'
import ILesson from '@/interfaces/Lesson'
import { useEffect, useState } from 'react'
import WeekdaySlider from '../elaborated/WeekdaySlider'
import { QuickActions } from '../card/QuickActions'
import IProfessor from '@/interfaces/IProfessor'
import { AttendanceProfessor } from '../statistic/AttendanceProfessor'
import UpcomingLessons from '../statistic/UpcomingLessons'

export const ProfessorDashboard = () => {
    const [professorLessons, setProfessorLessons] = useState<ILesson[] | null>(null)
    const [professor, setProfessor] = useState<IProfessor | null>(null)

    const { user } = useAuth()
    const { lessons } = useEventsContext()
    const { professors } = useStoreContext()


    useEffect(() => {
        if (user) {
            const p = professors.find((professor) => professor.userId === user.id)
            if (p) {
                setProfessor(p)
                const filteredLessons = lessons.filter((lesson) => lesson.professorID === p.id)
                setProfessorLessons(filteredLessons)
            }
        }
    }, [user, lessons, professors])

    return (
        <div
            className="container mx-auto px-4 py-8 mt-4 md:mt-0 bg-[url('/assets/images/bg-home.png')] bg-center bg-repeat bg-cover"
            style={{ backgroundSize: '50%' }}
        >
            <div className="bg-blue-100 rounded-lg p-6 mb-8">
                <h1 className="text-3xl font-bold text-blue-800">Professor Dashboard</h1>
            </div>
            {professorLessons && <WeekdaySlider lessons={professorLessons} showButtons={false} />}
            <img src="/assets/images/professor.png" className='max-w-xs mx-auto' alt="" />

            <div className='flex flex-col md:flex-row justify-center items-center mt-10 gap-4 max-w-4xl mx-auto'>
                <img src="/assets/gifs/quick.gif" className='size-32' alt="" />

                <div className='w-full'>
                    {professorLessons && <AttendanceProfessor professorLessons={professorLessons} />}

                </div>
                <div className='w-full'>
                    <QuickActions />
                </div>
                <img src="/assets/gifs/charts.gif" className='size-32' alt="" />
                {/* <div className='w-full'>
                    {professorLessons && <UpcomingLessons professorLessons={professorLessons} />}
                </div> */}
            </div>
        </div>
    )
}