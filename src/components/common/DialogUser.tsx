import IUser from "@/interfaces/User"
import { useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { UserProfile } from "./UserProfile"
import { CourseClassSelector } from "../form/SelectorCourseClass"
import { Button } from "../ui/button"
import { useStoreContext } from "@/contexts/StoreContext"

interface IDialogUserProps {
    isOpen: boolean
    onClose: () => void
    user: IUser
}

export const DialogUser: React.FC<IDialogUserProps> = ({ isOpen, onClose, user }) => {
    const [selectedClassId, setSelectedClassId] = useState<number>(0)
    const [selectedRole, setSelectedRole] = useState<string>('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)
    const { handleUserUpdateRole } = useStoreContext();

    const handleClassSelect = (classId: number) => {
        setSelectedClassId(classId)
    }

    const handleRoleSelect = (role: string) => {
        setSelectedRole(role)
    }


    const handleSubmit = async () => {
        if (selectedClassId && selectedRole) {
            setIsSubmitting(true);
            setFeedbackMessage(null);
            try {
                await handleUserUpdateRole(user.id, selectedRole, selectedClassId);

                setFeedbackMessage(`User ${user.name} has been successfully enrolled as ${selectedRole} in the selected class.`);
                setTimeout(() => {
                    onClose();
                }, 2000);

            } catch (error) {
                setFeedbackMessage("Failed to enroll user. Please try again.");
                console.log(error);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Manage User</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                    <UserProfile user={user} />
                    <CourseClassSelector onClassSelect={handleClassSelect} onRoleSelect={handleRoleSelect} />
                    {feedbackMessage && (
                        <div className={`text-sm ${feedbackMessage.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                            {feedbackMessage}
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button
                        onClick={handleSubmit}
                        disabled={!selectedClassId || !selectedRole || isSubmitting}
                    >
                        {isSubmitting ? 'Enrolling...' : 'Enroll in Class'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

