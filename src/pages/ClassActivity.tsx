import WeekdaySlider from '@/components/elaborated/WeekdaySlider'
import { useEventsContext } from '@/contexts/EventsContext'


export const ClassActivity = () => {
  const { lessons } = useEventsContext()
  return (
    <div className='flex flex-col justify-center items-center px-4 py-8 gap-5'>
      <div className="bg-blue-100 rounded-lg p-6 mb-8 w-full">
        <h1 className="text-3xl font-bold text-blue-800">Class activities</h1>
      </div>
      <img src="/assets/gifs/schedule.gif" className='max-w-60' alt="" />

      <WeekdaySlider lessons={lessons} />
    </div>
  )
}
