
import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom";
import { IMenuItemProps } from "./MenuItem";


export interface MegaMenuItemProps {
  title: string
  items: IMenuItemProps[]
}

interface MegaMenuProps {
  menuItems: MegaMenuItemProps[]
  activeMenu: string | null
  setActiveMenu: (menu: string | null) => void
}

const MegaMenu: React.FC<MegaMenuProps> = ({ menuItems, activeMenu, setActiveMenu }) => {
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = (title: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveMenu(title)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
      setActiveMenu(null)
    }, 300)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setActiveMenu(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [setActiveMenu])

  return (
    <div className="relative w-full mx-12 bg-blue-100 shadow-md rounded-xl" ref={menuRef}>
      <div className="flex justify-center gap-24">
        {menuItems.map((item) => (
          <button
            key={item.title}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${activeMenu === item.title
              ? "bg-gray-900 text-white"
              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            onMouseEnter={() => handleMouseEnter(item.title)}
            onMouseLeave={handleMouseLeave}
          >
            {item.title}
          </button>
        ))}
      </div>
      {isOpen && activeMenu && (
        <div
          className="absolute  mt-2 rounded-xl border-2 border-blue-100 bg-white/80 backdrop-blur-md shadow-lg"
          onMouseEnter={() => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
          }}
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-w-7xl justify-center px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {menuItems
              .find((item) => item.title === activeMenu)
              ?.items.map((subItem, index) => (
                <Link
                  key={index}
                  to={subItem.to}
                  className="block p-3 rounded-lg hover:bg-gray-50 transition duration-150 ease-in-out"
                >
                  <h3 className="font-medium text-gray-900">{subItem.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{subItem.description}</p>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MegaMenu

