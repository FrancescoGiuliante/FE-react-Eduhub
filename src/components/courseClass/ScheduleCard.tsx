import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ILesson from "@/interfaces/Lesson"
import WeekdaySlider from "../elaborated/WeekdaySlider"

interface IScheduleCardProps {
  lessons: ILesson[]
}

export function ScheduleCard({ lessons }: IScheduleCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Class Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <WeekdaySlider lessons={lessons} />
      </CardContent>
    </Card>
  )
}

