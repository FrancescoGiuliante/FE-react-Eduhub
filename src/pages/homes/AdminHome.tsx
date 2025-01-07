import AdminDashboard from '@/components/dashboard/AdminDashboard'
import { useStoreContext } from '@/contexts/StoreContext'

export const AdminHome = () => {
    const { users, courseClasses} = useStoreContext()
    return (
        <AdminDashboard users={users} courseClasses={courseClasses}/>
    )
}
