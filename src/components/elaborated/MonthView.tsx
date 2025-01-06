import React from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay, isSaturday, isSunday, getDay } from 'date-fns'
import { motion } from 'framer-motion'
import ILesson from '@/interfaces/Lesson'
import { useInfoClassContext } from '@/contexts/InfoClassContext'
import { useStoreContext } from '@/contexts/StoreContext'
import { useAuth } from '@/contexts/AuthContext'

interface MonthViewProps {
  currentMonth: Date
  lessons: ILesson[]
  onDayClick: (day: Date) => void
}

export function MonthView({ currentMonth, lessons, onDayClick }: MonthViewProps) {
  const startDate = startOfMonth(currentMonth)
  const endDate = endOfMonth(currentMonth)
  const dateRange = eachDayOfInterval({ start: startDate, end: endDate })

  const { subjects } = useInfoClassContext()
  const { courseClasses, professors } = useStoreContext()
  const { user } = useAuth()

  const getDayEvents = (day: Date) => {
    return lessons.filter(lesson => isSameDay(new Date(lesson.date[0], lesson.date[1] - 1, lesson.date[2]), day))
  }

  const getDayAbbreviation = (date: Date) => {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return dayNames[getDay(date)]
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
      </div>
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {dateRange.map((date) => {
          const dayEvents = getDayEvents(date)
          const isWeekend = isSaturday(date) || isSunday(date)
          const isSundayDay = isSunday(date)
          return (
            <motion.div
              key={date.toString()}
              className={`
                p-2 h-32 overflow-y-auto cursor-pointer
                ${!isSameMonth(date, currentMonth) ? 'bg-gray-100' : 'bg-white'}
                ${isToday(date) ? 'border-2 border-blue-500' : 'border border-gray-200'}
                ${isWeekend ? 'border-2 border-orange-300 dark:border-orange-700' : ''}
                ${isSundayDay ? 'bg-black' : ''}
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onDayClick(date)}
            >
              <div className={`flex justify-between items-center mb-1 ${isWeekend ? 'text-orange-600 dark:text-orange-400' : ''}`}>
                <span className="font-semibold text-sm">{format(date, 'd')}</span>
                <span className="text-xs">{getDayAbbreviation(date)}</span>
              </div>
              <div className="space-y-1">
                {isSundayDay ? null : dayEvents.map((event, eventIndex) => {
                  const subject = subjects.find(s => s.id === event.subjectID);
                  const courseClass = courseClasses.find(c => c.id === event.classID);
                  const professor = professors.find(p => p.id === event.professorID);
                  return (
                    <div key={eventIndex} className="text-xs truncate bg-blue-100 p-1 rounded">
                      {user?.role === 'PROFESSOR'
                        ? `${subject?.name || 'Unknown Subject'} - ${courseClass?.name || 'Unknown Class'}`
                        : `${subject?.name || 'Unknown Subject'} - ${professor?.name || 'Unknown Professor'}`}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

