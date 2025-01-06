import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bookmark, Users, GraduationCap, Book } from 'lucide-react'
import { FileList } from './FileList'
import { StatCard } from './StatCard'
import { SyllabusCard } from './SyllabusCard'
import { ScheduleCard } from './ScheduleCard'
import ICourseClass from "@/interfaces/CourseClass"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { useEventsContext } from "@/contexts/EventsContext"
import ILesson from "@/interfaces/Lesson"
import { useAuth } from "@/contexts/AuthContext"
import { useStoreContext } from "@/contexts/StoreContext"
import { useInfoClassContext } from "@/contexts/InfoClassContext"
import { StudentDialog } from '../dialog/StudentDialog';
import { ProfessorDialog } from '../dialog/ProfessorDialog';
import { SubjectDialog } from '../dialog/SubjectDialog';

interface CourseClassProps {
  courseClass: ICourseClass
}

export function CourseClassDashboard({ courseClass }: CourseClassProps) {
  const { lessons } = useEventsContext()
  const { user } = useAuth()
  const { students, professors } = useStoreContext()
  const { subjects } = useInfoClassContext()

  const [classLessons, setClassLessons] = useState<ILesson[]>([])
  const [isStudentDialogOpen, setIsStudentDialogOpen] = useState(false)
  const [isProfessorDialogOpen, setIsProfessorDialogOpen] = useState(false)
  const [isSubjectDialogOpen, setIsSubjectDialogOpen] = useState(false)

  useEffect(() => {
    setClassLessons(lessons.filter(lesson => lesson.classID === courseClass.id))
  }, [user])

  const classStudents = students.filter(student => courseClass.studentIDs.includes(student.id))
  const classProfessors = professors.filter(professor => courseClass.professorIDs.includes(professor.id))
  const classSubjects = subjects.filter(subject => courseClass.subjectIDs.includes(subject.id))

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader className="border-b bg-muted/40 px-6">
        <div className="flex flex-col space-y-1.5">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="font-semibold">
              Course ID: {courseClass.courseID}
            </Badge>
            <Badge variant="outline" className="font-semibold">
              Class ID: {courseClass.id}
            </Badge>
          </div>
          <CardTitle className="text-2xl font-bold">{courseClass.name}</CardTitle>
          <div className="flex items-center text-sm text-muted-foreground">
            <Bookmark className="mr-1 h-4 w-4" />
            <span>{courseClass.path}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <StatCard 
                title="Students" 
                value={courseClass.studentIDs.length} 
                icon={Users} 
                onClick={() => setIsStudentDialogOpen(true)}
              />
              <StatCard 
                title="Professors" 
                value={courseClass.professorIDs.length} 
                icon={GraduationCap} 
                onClick={() => setIsProfessorDialogOpen(true)}
              />
              <StatCard 
                title="Subjects" 
                value={courseClass.subjectIDs.length} 
                icon={Book} 
                onClick={() => setIsSubjectDialogOpen(true)}
              />
            </div>
          </TabsContent>
          <TabsContent value="syllabus">
            <SyllabusCard syllabus={courseClass.syllabus} />
          </TabsContent>
          <TabsContent value="schedule">
            <ScheduleCard lessons={classLessons} />
          </TabsContent>
          <TabsContent value="materials">
            <FileList classId={courseClass.id} />
          </TabsContent>
        </Tabs>
      </CardContent>
      <StudentDialog 
        isOpen={isStudentDialogOpen} 
        onClose={() => setIsStudentDialogOpen(false)} 
        students={classStudents}
      />
      <ProfessorDialog 
        isOpen={isProfessorDialogOpen} 
        onClose={() => setIsProfessorDialogOpen(false)} 
        professors={classProfessors}
      />
      <SubjectDialog 
        isOpen={isSubjectDialogOpen} 
        onClose={() => setIsSubjectDialogOpen(false)} 
        subjects={classSubjects}
      />
    </Card>
  )
}