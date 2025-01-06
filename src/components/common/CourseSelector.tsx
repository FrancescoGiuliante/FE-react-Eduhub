import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";
import { useStoreContext } from "@/contexts/StoreContext";


interface CourseClassSelectorProps {
  onClassSelect: (classId: number) => void
  onRoleSelect: (role: string) => void
}

export function CourseClassSelector({ onClassSelect, onRoleSelect }: CourseClassSelectorProps) {
  const { courseClasses } = useStoreContext()
  const [selectedCourse, setSelectedCourse] = useState<string | undefined>()
  const [availableClasses, setAvailableClasses] = useState<typeof courseClasses>([])

  const courses = [
    { id: "3", name: "Graphic design" },
    { id: "4", name: "Software Development" },
    { id: "5", name: "Design" },
    { id: "6", name: "Cyber Security" },
  ]

  useEffect(() => {
    if (selectedCourse) {
      const filteredClasses = courseClasses.filter(classItem => classItem.courseID === parseInt(selectedCourse, 10))
      setAvailableClasses(filteredClasses)
    } else {
      setAvailableClasses([])
    }
  }, [selectedCourse, courseClasses])

  const handleCourseChange = (value: string) => {
    setSelectedCourse(value)
    onClassSelect(0) // Reset selected class when course changes
  }

  const handleClassChange = (value: string) => {
    const classId = parseInt(value, 10)
    onClassSelect(classId)
  }

  const handleRoleChange = (value: string) => {
    onRoleSelect(value)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="course-select">Select Course</Label>
        <Select onValueChange={handleCourseChange}>
          <SelectTrigger id="course-select">
            <SelectValue placeholder="Select a course" />
          </SelectTrigger>
          <SelectContent>
            {courses.map((course) => (
              <SelectItem key={course.id} value={course.id}>
                {course.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="class-select">Select Class</Label>
        <Select onValueChange={handleClassChange} disabled={!selectedCourse}>
          <SelectTrigger id="class-select">
            <SelectValue placeholder={selectedCourse ? "Select a class" : "First select a course"} />
          </SelectTrigger>
          <SelectContent>
            {availableClasses.map((classItem) => (
              <SelectItem key={classItem.id} value={classItem.id.toString()}>
                {classItem.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="role-select">Enroll in the class as:</Label>
        <Select onValueChange={handleRoleChange}>
          <SelectTrigger id="role-select">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PROFESSOR">Professor</SelectItem>
            <SelectItem value="STUDENT">Student</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

