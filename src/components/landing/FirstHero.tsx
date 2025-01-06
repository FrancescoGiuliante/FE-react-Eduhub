import { SliderImages } from "../design/SliderImages"
import { Slogan } from "./Slogan"

export const FirstHero = () => {
    return (
        <div className="relative flex h-fit items-center bg-[#f5dacd] overflow-hidden">
            <div className=""> 
                <Slogan />
            </div>
            <div className="absolute left-1/2 top-0 z-0 w-full">
                <SliderImages /> 
            </div>
        </div>
    );
};


