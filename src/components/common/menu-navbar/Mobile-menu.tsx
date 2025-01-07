import { Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { AvatarGif } from "../Avatar"
import MenuItem from './MenuItem'

interface MenuItemData {
  title: string;
  description: string;
  to: string;
}

interface MobileMenuProps {
  menuItems: { title: string; items: MenuItemData[] }[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ menuItems, isOpen, setIsOpen }) => {

  const handleMenuItemClick = () => {
    setIsOpen(false); 
  }

  return (
    <div className="flex items-center">
      <AvatarGif />
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:w-[400px] overflow-y-auto">
          <nav className="flex flex-col gap-4 mt-6">
            {menuItems.map((item, index) => (
              <div key={index} className="py-2">
                <h2 className="mb-2 font-semibold text-lg">{item.title}</h2>
                {item.items.map((subItem, subIndex) => (
                  <MenuItem
                    key={subIndex}
                    title={subItem.title}
                    description={subItem.description}
                    to={subItem.to}
                    onClick={handleMenuItemClick}
                  />
                ))}
              </div>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileMenu
