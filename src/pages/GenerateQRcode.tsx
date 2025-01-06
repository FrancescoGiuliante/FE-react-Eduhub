import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PasswordDialog from '@/components/common/PasswordDialog';
import { useAuth } from '@/contexts/AuthContext';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import ILesson from '@/interfaces/Lesson';
import { useInfoClassContext } from '@/contexts/InfoClassContext';
import { useStoreContext } from '@/contexts/StoreContext';
import QRCodeGenerator from '@/components/qrCode/QRCodeGenerator';

export const GenerateQRcode = () => {
    const { lessonID } = useParams<{ lessonID: string }>();
    const { user, token } = useAuth();
    const { subjects } = useInfoClassContext();
    const { courseClasses } = useStoreContext();

    const navigate = useNavigate();
    const STORAGE_URL = import.meta.env.VITE_STORAGE_URL;

    const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [lesson, setLesson] = useState<ILesson | null>(null);

    const handleOpenPasswordDialog = () => {
        setIsPasswordDialogOpen(true);
    };

    const handleClosePasswordDialog = () => {
        setIsPasswordDialogOpen(false);
    };

    useEffect(() => {
        if (lessonID) {
            axios
                .get(`http://localhost:3000/api/lesson/${lessonID}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setLesson(response.data);
                })
                .catch((err) => {
                    console.error("Error fetching course data:", err);
                });
        }
    }, [lessonID]);

    const submitHandler = (password: string) => {
        setError(null);
        axios
            .post(`${STORAGE_URL}/auth/login`, { email: user?.email, password })
            .then(() => {
                navigate("/home");
            })
            .catch((err) => {
                setError(err.response?.status === 401 ? "Invalid credentials" : "An error occurred");
            });
    };

    const courseClass = courseClasses.find((course) => course.id === lesson?.classID);
    const subjectName = subjects.find((subj) => subj.id === lesson?.subjectID);

    return (
        <div className='flex flex-col justify-center items-center gap-8'>
            <h1 className="text-2xl font-semibold text-center mb-6">
                <span className="text-blue-600">{courseClass?.name}</span> |
                <span className="text-green-600"> {subjectName?.name}</span> |
                <span className="text-gray-500"> ID Lesson: {lesson?.id}</span>
            </h1>
            {lessonID && <QRCodeGenerator lessonID={lessonID} />}
            <div className="text-center mt-4">
                <Button
                    onClick={handleOpenPasswordDialog}
                >
                    Go Back
                </Button>
            </div>
            <img src="/assets/images/scan.jpg" className='max-w-xs' alt="" />

            {isPasswordDialogOpen && (
                <PasswordDialog
                    onSubmit={submitHandler}
                    onCancel={handleClosePasswordDialog}
                    error={error}
                />
            )}
        </div>
    );
};
