import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const LogoGif = () => {
    const [imageKey, setImageKey] = useState(Date.now());

    const handleLogoClick = () => {
        setImageKey(Date.now());
    };

    const logoSrc = `/assets/gifs/logoEdu.gif?${imageKey}`;
    const { token } = useAuth();

    return (
        <Link to={token? "/home" : "/"} >
            <img onClick={handleLogoClick} src={logoSrc} alt="Logo" className="max-w-32 p-4" />
        </Link>
    );
};

export default LogoGif;
