import IUser from '@/interfaces/User'
import React from 'react'
import { useStoreContext } from '@/contexts/StoreContext'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { ClassList } from './ClassList'
import { UserProfile } from './UserProfile'
import { useEffect, useState } from 'react'
import ICourseClass from '@/interfaces/CourseClass'

interface IDialogShowUserProps {
    isOpen: boolean
    onClose: () => void
    user: IUser
}

export const DialogShowUser: React.FC<IDialogShowUserProps> = ({ isOpen, onClose, user }) => {
    const { courseClasses, students, professors } = useStoreContext()

    const [userClasses, setUserClasses] = useState<ICourseClass[]>([])

    useEffect(() => {
        const updatedClasses = (() => {
            if (user.role === 'STUDENT') {
                const student = students.find(s => s.userId === user.id)
                return student ? courseClasses.filter(cc => student.classIDs.includes(cc.id)) : []
            } else if (user.role === 'PROFESSOR') {
                const professor = professors.find(p => p.userId === user.id)
                return professor ? courseClasses.filter(cc => professor.classIDs.includes(cc.id)) : []
            }
            return []
        })()
        
        setUserClasses(updatedClasses)
    }, [user, userClasses])

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>User Details</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                    <UserProfile user={user} />
                    <ClassList classes={userClasses} />
                </div>
            </DialogContent>
        </Dialog>
    )
}
