import React, { useState } from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Eye, Settings, Trash2 } from 'lucide-react'
import IUser from '@/interfaces/User'
import { useStoreContext } from '@/contexts/StoreContext'
import ConfirmDialog from '../common/ConfirmDialog'
import { DialogUser } from '../common/DialogUser'
import { DialogShowUser } from '../common/DialogShowUser'

export interface IUserCardProps {
    user: IUser
}

export const UserCard: React.FC<IUserCardProps> = ({ user }) => {
    const initials = `${user.name[0]}${user.lastName[0]}`.toUpperCase()
    const { handleUserDelete } = useStoreContext()

    const [isManageDialogOpen, setManageDialogOpen] = useState(false)
    const [isShowDialogOpen, setShowDialogOpen] = useState(false)
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null); 

    const handleDeleteClick = (userId: number) => {
        setUserIdToDelete(userId);
        setDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (userIdToDelete) {
            handleUserDelete(userIdToDelete);
            setDialogOpen(false);
        }
    };

    const handleManageClick = () => {
        setManageDialogOpen(true)
    }

    const handleShowClick = () => {
        setShowDialogOpen(true)
    }

    return (
        <>
            <Card className="w-full max-w-xs overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl dark:bg-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg">
                <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-r from-blue-500 to-teal-400 text-sm font-semibold text-white">
                            {initials}
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-base font-semibold leading-none">{user.name} {user.lastName}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <span className="inline-block rounded-md bg-black  px-2 py-1 text-xs font-medium text-white">
                            {user.role}
                        </span>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-1 bg-blue-100 p-2 dark:bg-gray-700">
                    <TooltipProvider>
                        {user.role !== "ADMIN" && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="sm" onClick={handleShowClick}>
                                        <Eye className="h-4 w-4" />
                                        <span className="sr-only">View</span>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>View user details</p>
                                </TooltipContent>
                            </Tooltip>
                        )}
                        {user.role !== "ADMIN" && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="sm" onClick={handleManageClick}>
                                        <Settings className="h-4 w-4" />
                                        <span className="sr-only">Manage</span>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Manage user</p>
                                </TooltipContent>
                            </Tooltip>
                        )}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm" onClick={() => handleDeleteClick(user.id)}>
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Delete</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Delete user</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </CardFooter>
            </Card>

            <ConfirmDialog
                isOpen={isDialogOpen}
                onClose={() => setDialogOpen(false)}
                onConfirm={handleConfirmDelete}
                userId={userIdToDelete || 0}
            />
            <DialogUser
                isOpen={isManageDialogOpen}
                onClose={() => setManageDialogOpen(false)}
                user={user}
            />
            <DialogShowUser
                isOpen={isShowDialogOpen}
                onClose={() => setShowDialogOpen(false)}
                user={user}
            />
        </>
    )
}
