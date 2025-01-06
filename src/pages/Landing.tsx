import ScrollAnimation from "@/components/design/ScrollAnimation"
import { SquareAnimation } from "@/components/design/SquareAnimation"
import { BannerQuiz } from "@/components/landing/BannerQuiz"
import { FirstHero } from "@/components/landing/FirstHero"
import { FirstHeroResponsive } from "@/components/responsive/FirstHeroResponsive"
import { LearningPowerResponsive } from "@/components/responsive/LearningPowerResponsive"

export const Landing = () => {

  return (
    <>
      <div className="hidden md:block">
        <FirstHero />
      </div>
      <div className="block md:hidden">
        <FirstHeroResponsive />
      </div>

      <div className="hidden md:block">
        <ScrollAnimation />
      </div>
      <div className="block md:hidden">
        <LearningPowerResponsive />
      </div>
      
      <SquareAnimation />
      <BannerQuiz />
    </>
  )
}
