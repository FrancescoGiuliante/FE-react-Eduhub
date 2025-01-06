import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useInfoClassContext } from '@/contexts/InfoClassContext'
import { useStoreContext } from '@/contexts/StoreContext'
import { useAuth } from '@/contexts/AuthContext'
import ILesson from '@/interfaces/Lesson'
import IProfessor from '@/interfaces/IProfessor'
import { toast } from '@/hooks/use-toast'
import { Toaster } from '../ui/toaster'

interface DayModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  onAddLesson: (lessonData: Omit<ILesson, "id">) => Promise<ILesson>;
  lessons: ILesson[];
}

export function DayModal({ isOpen, onClose, selectedDate, onAddLesson, lessons }: DayModalProps) {
  const [selectedProfessor, setSelectedProfessor] = useState<string>('')
  const [selectedSubject, setSelectedSubject] = useState<string>('')
  const [selectedClass, setSelectedClass] = useState<string>('')
  const [filteredSubjects, setFilteredSubjects] = useState<typeof subjects>([])
  const [filteredClasses, setFilteredClasses] = useState<typeof courseClasses>([])
  const [professor, setProfessor] = useState<IProfessor | undefined>(undefined)

  const { subjects } = useInfoClassContext()
  const { courseClasses, professors } = useStoreContext()
  const { user } = useAuth()

  useEffect(() => {
    if (user?.role === 'PROFESSOR') {
      const currentProfessor = professors.find(p => p.userId === user.id)
      setProfessor(currentProfessor)
      if (currentProfessor) {
        const professorSubjects = subjects.filter(subject =>
          subject.professorIDs.includes(currentProfessor.id)
        )
        setFilteredSubjects(professorSubjects)
      }
    } else if (user?.role === 'ADMIN' && selectedProfessor) {
      const professorSubjects = subjects.filter(subject =>
        subject.professorIDs.includes(parseInt(selectedProfessor))
      )
      setFilteredSubjects(professorSubjects)
    } else {
      setFilteredSubjects([])
    }
    setSelectedSubject('')
    setSelectedClass('')
  }, [user, professors, subjects, selectedProfessor])

  useEffect(() => {
    if (selectedSubject) {
      const subjectClasses = courseClasses.filter(cc => cc.subjectIDs.includes(parseInt(selectedSubject)))
      setFilteredClasses(subjectClasses)
    } else {
      setFilteredClasses([])
    }
    setSelectedClass('')
  }, [selectedSubject, courseClasses])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedProfessor || !selectedSubject || !selectedClass) {
      toast({
        title: 'Error',
        description: 'Please select a professor, subject, and class.',
        variant: 'destructive',
      })
      return
    }

    if (selectedDate && (user?.role === 'PROFESSOR' || (user?.role === 'ADMIN' && selectedProfessor))) {
      const lessonData: Omit<ILesson, "id"> = {
        professorID: user.role === 'ADMIN' ? parseInt(selectedProfessor) : professor?.id ?? 0,
        subjectID: parseInt(selectedSubject),
        date: [selectedDate.getFullYear(), selectedDate.getMonth() + 1, selectedDate.getDate()],
        participations: [],
        classID: parseInt(selectedClass)
      }
      onAddLesson(lessonData)
      onClose()
    }
  }

  if (!selectedDate) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{format(selectedDate, 'MMMM d, yyyy')}</DialogTitle>
        </DialogHeader>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Lessons for this day:</h3>
          {lessons.length > 0 ? (
            <ul className="space-y-2">
              {lessons.map((lesson, index) => {
                const subject = subjects.find(s => s.id === lesson.subjectID);
                const courseClass = courseClasses.find(c => c.id === lesson.classID);
                const professor = professors.find(p => p.id === lesson.professorID);
                return (
                  <li key={index} className="text-sm">
                    {subject?.name} - {courseClass?.name} - {professor?.name}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No lessons scheduled for this day.</p>
          )}
        </div>
        {(user?.role === 'PROFESSOR' || user?.role === 'ADMIN') && (
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            {user?.role === 'ADMIN' && (
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="professor" className="text-right">
                  Professor
                </label>
                <Select onValueChange={setSelectedProfessor} required value={selectedProfessor}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a professor" />
                  </SelectTrigger>
                  <SelectContent>
                    {professors.map((professor) => (
                      <SelectItem key={professor.id} value={professor.id.toString()}>
                        {professor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="subject" className="text-right">
                Subject
              </label>
              <Select onValueChange={setSelectedSubject} required value={selectedSubject}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  {filteredSubjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id.toString()}>
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="class" className="text-right">
                Class
              </label>
              <Select onValueChange={setSelectedClass} required value={selectedClass}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a class" />
                </SelectTrigger>
                <SelectContent>
                  {filteredClasses.map((courseClass) => (
                    <SelectItem key={courseClass.id} value={courseClass.id.toString()}>
                      {courseClass.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="ml-auto">Add Lesson</Button>
          </form>
        )}
      </DialogContent>
      <Toaster />
    </Dialog>
  )
}
