import ICourseClass from "@/interfaces/CourseClass"
import IUser from "@/interfaces/User"
import { BookOpen, GraduationCap, User, Users } from "lucide-react"
import { StatCard } from "../card/StatCard"
import { UserSignup } from "../statistic/UserSignup"

interface AdminDashboardProps {
    users: IUser[]
    courseClasses: ICourseClass[]
}


export default function AdminDashboard({ users, courseClasses }: AdminDashboardProps) {

    const studentCount = users.filter(user => user.role === 'STUDENT').length
    const professorCount = users.filter(user => user.role === 'PROFESSOR').length

    const stats = [
        { title: 'Total Classes', value: courseClasses.length, icon: BookOpen },
        { title: 'Total Students', value: studentCount, icon: Users },
        { title: 'Total Professors', value: professorCount, icon: GraduationCap },
        { title: 'Total Users', value: users.length, icon: User },
    ]

    return (
        <div
            className="container mx-auto px-4 py-8 bg-[url('/assets/images/bg-home.png')] bg-center bg-repeat bg-cover"
            style={{ backgroundSize: '50%' }}
        >
            <div className="bg-blue-100 rounded-lg p-6 mb-8">
                <h1 className="text-3xl font-bold text-blue-800">Admin Dashboard</h1>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            <UserSignup />
            <img src="/assets/images/bg-guys-yellow.png" className="max-w-44 mx-auto" alt="" />


            {/* <div className="grid gap-20 md:grid-cols-2">
                <QuickActions />
            </div> */}
        </div>
    )
}

