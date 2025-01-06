import { CardFreeCourses } from '@/components/card/CardFreeCourses'
import React from 'react'

export const FreeCourses = () => {
  return (
    <div className='flex flex-col items-center justify-center pb-20'>
        <img src="/assets/gifs/freeCourse.gif" className='max-w-xs' alt="" />
        <CardFreeCourses />
    </div>
  )
}
