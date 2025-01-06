import NavbarOutside from "@/components/common/menu-navbar/NavbarOutside";
import Footer from "@/components/elaborated/Footer";
import { Outlet } from "react-router-dom";

const LayoutOutside = () => {
    return (
        <>
            <NavbarOutside />
            <div className="pt-20 md:pt-24 lg:pt-32">
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default LayoutOutside;
