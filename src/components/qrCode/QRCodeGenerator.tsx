import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface IQRCodeGeneratorProps {
    lessonID: string;
}

const QRCodeGenerator: React.FC<IQRCodeGeneratorProps> = ({ lessonID }) => {
    const [qrCodeData, setQrCodeData] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const API_URL = import.meta.env.VITE_API_URL;
    const { token } = useAuth();

    useEffect(() => {
        fetch(`${API_URL}/qr-code/generate/${lessonID}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((response) => response.text()) 
            .then((data) => {
                setQrCodeData(data);
                setError(null); 
            })
            .catch((error) => {
                setError('Error fetching QR code');
                console.error('Error fetching QR code:', error);
            });
    }, [lessonID]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!qrCodeData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <img src={`data:image/png;base64,${qrCodeData}`} alt="QR Code" />
        </div>
    );
};

export default QRCodeGenerator;
