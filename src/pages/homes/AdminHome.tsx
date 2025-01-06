import AdminDashboard from '@/components/dashboard/AdminDashboard'
import { useStoreContext } from '@/contexts/StoreContext'
import React from 'react'

export const AdminHome = () => {
    const { users, courseClasses} = useStoreContext()
    return (
        <AdminDashboard users={users} courseClasses={courseClasses}/>
    )
}
