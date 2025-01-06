import { useState, useEffect } from "react"
import { LogIn, User } from "lucide-react" // Importa le icone LogIn e User da Lucide
import LogoGif from "../LogoGif" // Presumendo che il logo sia in questo componente
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const NavbarOutside = () => {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className={`fixed top-0 w-screen  left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-white'}`}>
            <div className="md:max-w-7xl md:mx-auto md:p-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <LogoGif />

                    <div className="flex-1"></div>

                    <div className="flex items-center mx-auto space-x-1 md:space-x-6 md:max-w-md md:px-20 shadow-md rounded-md bg-blue-100">
                        <Link to="login">
                            <Button variant="link" className="text-gray-700 hover:text-[#818bff] flex items-center space-x-2">
                                <LogIn className="w-5 h-5" />
                                <span className="hidden md:block">Login</span> {/* Solo visibile su schermi md e superiori */}
                            </Button>
                        </Link>

                        <Link to="register">
                            <Button className="hover:bg-[#818bff] text-white px-4 py-2 flex items-center space-x-2">
                                <User className="w-5 h-5" />
                                <span className="hidden md:block">Register</span> {/* Solo visibile su schermi md e superiori */}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavbarOutside
