import React from 'react'
import { Slogan } from '../landing/Slogan'
import { SliderImages } from '../design/SliderImages'

export const FirstHeroResponsive = () => {
  return (
    <div className='flex flex-col'>
        <Slogan />
        <SliderImages />
    </div>
  )
}
