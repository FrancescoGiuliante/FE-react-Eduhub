import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LogoImg } from '../common/LogoImg'

export default function Footer() {
    return (
        <footer className="bg-gradient-to-r to-[#818bff] from-black text-white py-16 ">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="space-y-4 md:ml-10">
                        <LogoImg />
                        <p className="text-lg italic">"Smile at school"</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {['Home', 'About', 'Services', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link to={`/${item.toLowerCase()}`} className="hover:text-blue-200 transition duration-300">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                        <address className="not-italic">
                            <p>Via Nazionale 14</p>
                            <p>Sant'Apollinare | CH 66038</p>
                            <p>Email: francesco.giuliante@gmail.com</p>
                            <p>Phone: (327) 776-7249</p>
                        </address>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            {[
                                { Icon: Facebook, href: 'https://facebook.com' },
                                { Icon: Twitter, href: 'https://twitter.com' },
                                { Icon: Instagram, href: 'https://instagram.com' },
                                { Icon: Linkedin, href: 'https://linkedin.com' },
                                { Icon: Youtube, href: 'https://youtube.com' },
                            ].map(({ Icon, href }, index) => (
                                <Link key={index} to={href} className="hover:text-blue-200 transition duration-300">
                                    <Icon size={24} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-blue-400 text-center">
                    <p>&copy; {new Date().getFullYear()} EduHub! All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

