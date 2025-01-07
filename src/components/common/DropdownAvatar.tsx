import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export interface DropdownItem {
    label: string
    icon: React.ElementType
    to?: string
    onClick?: () => void
}

interface IDropdownProps {
    trigger: React.ReactNode
    items: DropdownItem[]
}

export function DropdownAvatar({ trigger, items }: IDropdownProps) {
    const [isOpen, setIsOpen] = React.useState(false)
    const dropdownRef = React.useRef<HTMLDivElement>(null)
    const navigate = useNavigate();

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <div
                className="cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                {trigger}
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute -right-10 md:left-2 -mt-5 w-48 md:w-64 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-10"
                    >
                        <div className="py-1">
                            {items.map((item, index) => (
                                <motion.button
                                    key={index}
                                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    onClick={() => {
                                        setIsOpen(false);
                                        if (item.onClick) {
                                            item.onClick();
                                        }
                                        else if (item.to) {
                                            navigate(item.to);
                                        }
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <item.icon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                    {item.label}
                                </motion.button>
                            ))}

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

