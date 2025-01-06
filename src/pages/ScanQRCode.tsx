import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Html5QrcodeScanner } from 'html5-qrcode';
import axios from 'axios';
import { useStoreContext } from '@/contexts/StoreContext';
import IStudent from '@/interfaces/IStudent';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ScanQRCode: React.FC = () => {
    const { user, token } = useAuth();
    const { students } = useStoreContext();
    const navigate = useNavigate();

    const [student, setStudent] = useState<IStudent | null>(null);
    const [qrResult, setQrResult] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [response, setResponse] = useState<string | null>(null);

    const qrCodeRef = useRef<HTMLDivElement>(null);
    const scannerRef = useRef<Html5QrcodeScanner | null>(null);

    useEffect(() => {
        if (user) {
            const student = students.find((s) => s.userId === user.id);
            if (student) {
                setStudent(student);
            }
        }
    }, [user, students]);

    useEffect(() => {
        if (qrCodeRef.current) {
            const scanner = new Html5QrcodeScanner(qrCodeRef.current.id, {
                fps: 10,
                qrbox: 250,
            }, false);

            const onScanSuccess = (decodedText: string) => {
                setQrResult(decodedText);
            };

            scanner.render(onScanSuccess, (errorMessage: string) => {
                console.log(errorMessage);
            });

            return () => {
                scanner.clear();
            };
        }
    }, []);

    const registerAttendance = async (qrResult: string) => {
        if (qrResult && student?.id) {
            const urlWithUserId = `${qrResult}/${student.id}`;
            setLoading(true);
            try {
                const response = await axios.post(urlWithUserId, {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                setLoading(false);
                setResponse(response.data);

                if (scannerRef.current) {
                    scannerRef.current.clear(); 
                }

                setTimeout(() => {
                    navigate('/home');
                }, 3000);
            } catch (err) {
                setLoading(false);
                console.error('Error in registration:', err);
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen text-center flex-col container mx-auto px-4 py-8 bg-[url('/assets/images/bg-home.png')] bg-center bg-repeat bg-cover"
            style={{ backgroundSize: '50%' }}>
            <div id="qr-scanner" ref={qrCodeRef} className="w-72 h-72 mb-5 bg-white"></div>

            {qrResult && !loading && (
                <div>
                    <Button onClick={() => qrResult && registerAttendance(qrResult)} className="mt-3 px-4 py-2 text-white rounded">
                        Register your Attendance
                    </Button>
                </div>
            )}

            <h1 className='text-center text-2xl mt-4 font-bold text-green-800'>{response}</h1>
            {loading && <p>Loading...</p>}
        </div>
    );
};

export default ScanQRCode;

