
import { useState, useEffect } from "react"


import MegaMenu, { MegaMenuItemProps } from "./MegaMenu"
import MobileMenu from "./Mobile-menu"
import LogoGif from "../LogoGif"
import { useAuth } from "@/contexts/AuthContext"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  const { user } = useAuth();

  const menuItems: MegaMenuItemProps[] = [
    {
      title: "Courses",
      items: [
        {
          title: "Graphic Design",
          description: "Create visually compelling designs.",
          to: user?.role === "ADMIN" ? "/home/admin-course/3" : "/home/course/3"
        },
        {
          title: "Software Development",
          description: "Learn to build functional applications.",
          to: user?.role === "ADMIN" ? "/home/admin-course/4" : "/home/course/4"
        },
        {
          title: "Design",
          description: "Craft intuitive user experiences.",
          to: user?.role === "ADMIN" ? "/home/admin-course/5" : "/home/course/5"
        },
        {
          title: "Cybersecurity",
          description: "Protect systems and data from cyber threats.",
          to: user?.role === "ADMIN" ? "/home/admin-course/6" : "/home/course/6"
        }
      ]
    },

    // Menu per Admin
    ...(user?.role === "ADMIN"
      ? [
        {
          title: "Manage Users",
          items: [
            {
              title: "Users",
              description: "Manage all users.",
              to: "/home/users"
            },
            {
              title: "Classes",
              description: "Oversee all classes.",
              to: "/home/classes"
            },
            {
              title: "Subjects | Quizzes",
              description: "Manage all quizzes and subjects.",
              to: "/home/tables-sub&quiz"
            },
            {
              title: "Admins",
              description: "Control admin accounts.",
              to: "/home/admins"
            }
          ]
        },
        {
          title: "Resources",
          items: [
            {
              title: "Show Daily Lessons",
              description: "Display lessons for today.",
              to: "/home/today-lessons"
            },
            {
              title: "Enable QR Code for Attendance",
              description: "Allow QR code scanning for attendance.",
              to: "/home/select-lesson"
            },
            {
              title: "Statistics",
              description: "View course performance data.",
              to: "#"
            },
            {
              title: "Course Activity",
              description: "Track student and course activity.",
              to: "/home/activity"
            }
          ]
        }
      ]
      : []),

    // Menu per studenti e professori
    ...(user?.role === "STUDENT" || user?.role === "PROFESSOR" || user?.role === "USER"
      ? [
        {
          title: "Open space",
          items: [
            {
              title: "Courses",
              description: "Explore our available courses.",
              to: "/home/free-courses"
            },
            {
              title: "Quizzes",
              description: "Test your knowledge.",
              to: "/home/table-free-quizzes"
            }
          ]
        }
      ]
      : []),

    ...(user?.role === "STUDENT" || user?.role === "PROFESSOR"
      ? [
        {
          title: "My Classes",
          items: [
            {
              title: "Classes",
              description: user.role === "STUDENT"
                ? "View your enrolled classes."
                : "View your teaching classes.",
              to: "/home/my-classes"
            },
            {
              title: user.role === "STUDENT"
                ? "Quizzes"
                : "Subjects | Quizzes",
              description: user.role === "STUDENT"
                ? "Access and take your quizzes."
                : "Create and manage quizzes.",
              to: user.role === "STUDENT"
                ? "/home/quizzes"
                : "/home/tables-sub&quiz"
            },
            user.role === "STUDENT"
              ? {
                title: "Scan QR Code",
                description: "Scan QR code for attendance.",
                to: "/home/scan-qr"
              }
              : {
                title: "Questions",
                description: "Manage all your questions",
                to: "/home/my-questions"
              }
          ]
        }
      ]
      : [])
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-white'
      }`}>
      <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <LogoGif />
          <div className="hidden md:flex items-center justify-center flex-1">
            <MegaMenu
              menuItems={menuItems}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
            />
          </div>
          <MobileMenu
            menuItems={menuItems}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </div>
      </div>
    </nav>
  )
}

export default Navbar