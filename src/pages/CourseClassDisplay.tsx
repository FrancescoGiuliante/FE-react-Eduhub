import { CourseClassCard } from '@/components/card/CourseClassCard'
import { useStoreContext } from '@/contexts/StoreContext'
import { BookOpen } from 'lucide-react'
import React, { Suspense } from 'react'

export const CourseClassDisplay = () => {

    const { courseClasses } = useStoreContext()

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-blue-100 rounded-lg p-6 mb-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
                        <h1 className="text-3xl font-bold text-blue-800">All Classes</h1>
                    </div>
                    <p className="text-lg text-blue-600 font-semibold">
                        Total: {courseClasses.length}
                    </p>
                </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Suspense fallback={<div>Loading...</div>}>
                    {courseClasses.map((courseClass) => (
                        <CourseClassCard key={courseClass.id} courseClass={courseClass} />
                    ))}
                </Suspense>
            </div>
        </div>
    )
}
