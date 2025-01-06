import { useEffect, useState } from "react";
import Navbar from "@/components/common/menu-navbar/Navbar";
import Footer from "@/components/elaborated/Footer";
import { Outlet } from "react-router-dom";

const LayoutInside = () => {
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const handleFullscreenChange = () => {
            if (document.fullscreenElement) {
                setIsFullscreen(true);
            } else {
                setIsFullscreen(false);
            }
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);

        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, []);

    return (
        <>
            {!isFullscreen && <Navbar />}
            <div className={`pt-20 md:pt-24 lg:pt-32 ${isFullscreen ? 'h-screen' : ''}`}>
                <Outlet />
            </div>
            {!isFullscreen && <Footer />}
        </>
    );
};

export default LayoutInside;
