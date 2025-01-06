'use client'

import React, { useState, useEffect, useRef } from 'react'
import { CalendarMinus, CalendarPlus, ChevronLeft, ChevronRight } from 'lucide-react'
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth, isSaturday, isSunday, isSameDay } from 'date-fns'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence, useDragControls } from 'framer-motion'
import { DayModal } from './DayModal'
import { MonthView } from './MonthView'
import { useAuth } from '@/contexts/AuthContext'
import { useEventsContext } from '@/contexts/EventsContext'
import ILesson from '@/interfaces/Lesson'
import { useStoreContext } from '@/contexts/StoreContext'
import { useInfoClassContext } from '@/contexts/InfoClassContext'

interface WeekdaySliderProps {
  lessons: ILesson[];
  showButtons?: boolean
}

const getDaysInMonth = (date: Date) => {
  const start = startOfMonth(date)
  const end = endOfMonth(date)
  return eachDayOfInterval({ start, end })
}

const WeekdaySlider: React.FC<WeekdaySliderProps> = ({ lessons, showButtons = true }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [days, setDays] = useState<Date[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isMonthView, setIsMonthView] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)
  const dragControls = useDragControls()

  const { user } = useAuth()
  const { courseClasses, professors } = useStoreContext()
  const { subjects } = useInfoClassContext()
  const { handleLessonCreate } = useEventsContext()

  useEffect(() => {
    const daysInMonth = getDaysInMonth(currentMonth)
    setDays(daysInMonth)

    const currentDayIndex = daysInMonth.findIndex(day => isToday(day))
    setCurrentIndex(currentDayIndex !== -1 ? Math.max(0, currentDayIndex - 2) : 0)
  }, [currentMonth])

  useEffect(() => {
    if (sliderRef.current && !isMonthView) {
      sliderRef.current.scrollTo({
        left: currentIndex * (200 + 16),
        behavior: 'smooth'
      })
    }
  }, [currentIndex, isMonthView])

  const handlePrevMonth = () => {
    setDirection(-1)
    setCurrentMonth(prevMonth => subMonths(prevMonth, 1))
  }

  const handleNextMonth = () => {
    setDirection(1)
    setCurrentMonth(prevMonth => addMonths(prevMonth, 1))
  }

  const handleScroll = (scrollDirection: 'left' | 'right') => {
    if (!isMonthView) {
      setCurrentIndex(prevIndex => {
        const newIndex = scrollDirection === 'left' ? Math.max(0, prevIndex - 1) : Math.min(days.length - 5, prevIndex + 1)
        return newIndex
      })
    }
  }

  const handleDayClick = (day: Date) => {
    setSelectedDate(day)
    setIsModalOpen(true)
  }

  const handleDragEnd = (event: any, info: any) => {
    if (!isMonthView) {
      const threshold = 50 // Minimum drag distance to trigger a scroll
      if (Math.abs(info.offset.x) > threshold) {
        if (info.offset.x > 0) {
          handleScroll('left')
        } else {
          handleScroll('right')
        }
      }
    }
    setIsDragging(false)
  }

  const toggleView = () => {
    setIsMonthView(!isMonthView)
  }

  const getDayEvents = (day: Date) => {
    return lessons.filter(lesson => isSameDay(new Date(lesson.date[0], lesson.date[1] - 1, lesson.date[2]), day))
  }

  return (
    <div className="relative max-w-xs md:max-w-7xl mx-auto px-4">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentMonth.toISOString()}
          initial={{ opacity: 0, x: 100 * direction }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 * direction }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="overflow-hidden"
        >
          {isMonthView ? (
            <MonthView
              currentMonth={currentMonth}
              lessons={lessons}
              onDayClick={handleDayClick}
            />
          ) : (
            <motion.div
              ref={sliderRef}
              className="flex space-x-4 py-4"
              initial={false}
              animate={{ x: -currentIndex * (200 + 16) }}
              transition={{ type: "spring", stiffness: 100, damping: 30 }}
              drag="x"
              dragControls={dragControls}
              dragConstraints={{ left: -((days.length - 5) * (200 + 16)), right: 0 }}
              dragElastic={0.1}
              onDragStart={() => setIsDragging(true)}
              onDrag={() => setIsDragging(true)}
              onDragEnd={handleDragEnd}
            >
              {days.map((day) => {
                const isWeekend = isSaturday(day) || isSunday(day)
                const dayEvents = getDayEvents(day)
                return (
                  <motion.div
                    key={day.toISOString()}
                    className={`
                      flex-shrink-0 w-48 h-48 p-4
                      rounded-lg shadow-md flex flex-col justify-between
                      transition-colors duration-200 cursor-pointer
                      ${isToday(day) ? 'bg-primary text-primary-foreground' :
                        isSameMonth(day, currentMonth) ? 'bg-card' : 'bg-muted'}
                      ${isWeekend ? 'border-2 border-orange-300 dark:border-orange-700' : ''}
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (!isDragging) {
                        handleDayClick(day)
                      }
                    }}
                  >
                    <div>
                      <div className={`text-sm font-semibold ${isWeekend ? 'text-orange-600 dark:text-orange-400' : 'text-muted-foreground'}`}>
                        {format(day, 'EEEE')}
                      </div>
                      <div className="text-3xl font-bold mt-1">
                        {format(day, 'd')}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {format(day, 'MMMM yyyy')}
                      </div>
                    </div>
                    {dayEvents.length > 0 && (
                      <div className="text-xs text-muted-foreground mt-2 space-y-1">
                        {dayEvents.map((event, eventIndex) => {
                          const subject = subjects.find(s => s.id === event.subjectID);
                          const courseClass = courseClasses.find(c => c.id === event.classID);
                          const professor = professors.find(p => p.id === event.professorID);

                          return (
                            <div key={eventIndex} className="flex items-center space-x-2">
                              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                              <div className="truncate">
                                {user?.role === 'PROFESSOR'
                                  ? `${subject?.name || 'Unknown Subject'} - ${courseClass?.name || 'Unknown Class'}`
                                  : `${subject?.name || 'Unknown Subject'} - ${courseClass?.name || 'Unknown Class'} - ${professor?.name || 'Unknown Professor'}`}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
      {!isMonthView && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2"
            onClick={() => handleScroll('left')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2"
            onClick={() => handleScroll('right')}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}
      <div>
        {showButtons && (
          <div className="flex justify-center mt-4 space-x-4">
            <Button onClick={handlePrevMonth}><CalendarMinus /></Button>
            <Button onClick={toggleView}>{isMonthView ? 'Week View' : 'Month View'}</Button>
            <Button onClick={handleNextMonth}><CalendarPlus /></Button>
          </div>
        )}
      </div>
      <DayModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDate}
        onAddLesson={handleLessonCreate}
        lessons={selectedDate ? getDayEvents(selectedDate) : []}
      />
    </div>
  )
}

export default WeekdaySlider

