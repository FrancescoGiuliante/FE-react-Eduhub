import IUser from "@/interfaces/User"
import { Card, CardContent } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

interface UserProfileProps {
    user: IUser
  }
  
  export function UserProfile({ user }: UserProfileProps) {
    const initials = `${user.name[0]}${user.lastName[0]}`.toUpperCase()
  
    return (
      <Card className="w-full">
        <CardContent className="flex items-center space-x-4 p-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/assets/avatars/girl-graduation.gif" alt={`${user.name} ${user.lastName}`} />
            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-teal-400 text-white text-lg">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">{user.name} {user.lastName}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <div className="flex items-center">
              <span className="rounded-full bg-primary px-2 py-1 text-xs font-semibold text-primary-foreground">
                {user.role}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
  