import React from 'react'

interface ILogoImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export const LogoImg: React.FC<ILogoImgProps>  = ({...props}) => {
  return (
    <img src="/assets/images/logoEduImg.png" className='max-w-28' {...props} alt="" />
  )
}
