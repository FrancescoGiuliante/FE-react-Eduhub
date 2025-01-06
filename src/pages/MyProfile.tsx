import { UserProfile } from '@/components/common/UserProfile'
import { UpdateMyProfile } from '@/components/form/UpdateMyProfile'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { Pencil } from 'lucide-react'

export const MyProfile = () => {
    const { user } = useAuth()

    return (
        <div className='flex flex-col items-center justify-center mt-20 md:mt-0'>
            <div className="bg-blue-100 rounded-lg p-6 mb-8 md:mb-0 max-w-xs md:max-w-4xl w-full flex ">
                <h1 className="text-3xl font-bold text-blue-800">My Profile</h1>
            </div>
            <div className='flex flex-col-reverse md:flex-row justify-items-center items-center '>
                <img src="/assets/gifs/change-password.gif" className='max-w-xs md:max-w-xl' alt="Change password illustration" />
                <div className='md:max-w-xl flex flex-col items-center justify-center'>
                    {user && <UserProfile user={user} />}
                    <UpdateMyProfile>
                        <Button className='rounded-full bg-primary text-white mt-4 w-12 h-12 flex items-center justify-center'>
                            <Pencil className="h-6 w-6" />
                        </Button>
                    </UpdateMyProfile>
                </div>
            </div>
        </div>
    )
}
