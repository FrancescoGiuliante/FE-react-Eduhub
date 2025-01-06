
// import * as React from "react"
// import { useState, useRef } from "react"
// import { ChevronDown, Link } from 'lucide-react'

// import { Button } from "@/components/ui/button"

// interface DropdownMenuProps {
//   title: string
//   items: { title: string; description: string }[]
// }

// const CustomDropdownMenu: React.FC<DropdownMenuProps> = ({ title, items }) => {
//   const [isOpen, setIsOpen] = useState(false)
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null)

//   const handleMouseEnter = () => {
//     if (timeoutRef.current) clearTimeout(timeoutRef.current)
//     setIsOpen(true)
//   }

//   const handleMouseLeave = () => {
//     timeoutRef.current = setTimeout(() => setIsOpen(false), 300)
//   }

//   return (
//     <div
//       className="relative"
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       <Button variant="ghost" className="h-full px-4 py-2">
//         {title} <ChevronDown className="ml-1 h-4 w-4" />
//       </Button>
//       {isOpen && (
//         <div className="absolute left-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
//           <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
//             {items.map((item, index) => (
//               <Link
//                 key={index}
//                 to="#"
//                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
//                 role="menuitem"
//               >
//                 <span className="font-medium">{item.title}</span>
//                 <span className="block text-xs text-gray-500">{item.description}</span>
//               </Link>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default CustomDropdownMenu

