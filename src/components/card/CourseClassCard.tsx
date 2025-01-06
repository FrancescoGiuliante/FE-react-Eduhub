import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bookmark, Users, GraduationCap } from 'lucide-react'
import { Link } from "react-router-dom"
import ICourseClass from "@/interfaces/CourseClass"

interface CourseClassCardProps {
  courseClass: ICourseClass
}

export function CourseClassCard({ courseClass }: CourseClassCardProps) {
  return (
    <Link to={`/home/course-class/${courseClass.id}`} >
      <Card className="h-full cursor-pointer transition-shadow hover:shadow-md">
        <CardHeader className="border-b bg-muted/40 px-4 py-3">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="font-semibold">
              ID: {courseClass.id}
            </Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Bookmark className="mr-1 h-4 w-4" />
              <span>{courseClass.path}</span>
            </div>
          </div>
          <CardTitle className="text-lg font-bold truncate">{courseClass.name}</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{courseClass.studentIDs.length} Students</span>
            </div>
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{courseClass.professorIDs.length} Professors</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

