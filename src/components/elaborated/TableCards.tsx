'use client'

import React, { useState, useMemo } from 'react'
import { Input } from "@/components/ui/input"
import { useStoreContext } from '@/contexts/StoreContext'
import { UserCard } from '../card/UserCard'
import { Search } from 'lucide-react'
import { Label } from '../ui/label'

export const TableCards: React.FC = () => {
    const { users } = useStoreContext()

    const [searchTerm, setSearchTerm] = useState('')

    const filteredUsers = useMemo(() => {
        return users.filter(user => 
            (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.role.toLowerCase().includes(searchTerm.toLowerCase())) &&
            user.role !== "ADMIN" 
        );
    }, [users, searchTerm]);
    
    return (
        <div className="space-y-6 justify-items-center p-8">
            <div className="relative max-w-xl">
                <Label htmlFor="search" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Search Users
                </Label>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <Input
                        type="text"
                        name="search"
                        id="search"
                        className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Search by name or role..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">User Directory</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Displaying {filteredUsers.length} users</p>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-4">
                        {filteredUsers.map((user) => (
                            <UserCard key={user.id} user={user} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
