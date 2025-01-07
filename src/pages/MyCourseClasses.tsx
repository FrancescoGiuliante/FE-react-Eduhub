import { CourseClassCard } from '@/components/card/CourseClassCard'
import { useAuth } from '@/contexts/AuthContext'
import { useStoreContext } from '@/contexts/StoreContext'
import ICourseClass from '@/interfaces/CourseClass'
import { BookOpen } from 'lucide-react'
import { Suspense, useEffect, useState } from 'react'

export const MyCourseClasses = () => {
    const { user } = useAuth();
    const { courseClasses, professors, students } = useStoreContext()
    const [userClasses, setUserClasses] = useState<ICourseClass[] | null>(null);

    useEffect(() => {
        if (user?.role === 'STUDENT') {
            const student = students.find((student) => student.userId === user.id);
            if (student) {
                const classes = courseClasses.filter((courseClass) =>
                    courseClass.studentIDs.includes(student.id)
                );
                setUserClasses(classes);
            }
        } else if (user?.role === 'PROFESSOR') {
            const professor = professors.find((professor) => professor.userId === user.id);
            if (professor) {
                const classes = courseClasses.filter((courseClass) =>
                    courseClass.professorIDs.includes(professor.id)
                );
                setUserClasses(classes);
            }
        }
    }, [user])

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-blue-100 rounded-lg p-6 mb-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
                        <h1 className="text-3xl font-bold text-blue-800">All my Classes</h1>
                    </div>
                    <p className="text-lg text-blue-600 font-semibold">
                        Total: {userClasses && userClasses.length}
                    </p>
                </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Suspense fallback={<div>Loading...</div>}>
                    {userClasses && userClasses.map((courseClass) => (
                        <CourseClassCard key={courseClass.id} courseClass={courseClass} />
                    ))}
                </Suspense>
            </div>
        </div>
    )
}
