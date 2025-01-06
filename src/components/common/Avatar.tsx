import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { LogOut, Settings, User } from "lucide-react";
import { DropdownAvatar, DropdownItem } from "./DropdownAvatar";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export const AvatarGif = () => {

    const { logout } = useAuth();
    const dropdownItems: DropdownItem[] = [
        { label: "My Profile", icon: User, to: "/home/my-profile"},
        { label: "Settings", icon: Settings },
        { label: "Logout", icon: LogOut, onClick: () => logout() }
    ];

    const [imageKey, setImageKey] = useState(Date.now());

    const handleLogoClick = () => {
        setImageKey(Date.now());
    };

    const avatarSrc = `/assets/avatars/boy-headphones.gif?${imageKey}`;

    return (
        <DropdownAvatar
            trigger={
                <div className="relative">
                    <Avatar onClick={handleLogoClick} className="p-4 size-24 sm:size-32">
                        <AvatarImage src={avatarSrc} alt="User" />
                    </Avatar>
                    
                </div>
            }
            items={dropdownItems}
        />
    );
};