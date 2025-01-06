import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const SliderImages = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        rtl: true,
    };

    return (
        <div className="w-full max-w-3xl">
            <Slider {...settings}>
                <div className='relative'>
                    <div className='absolute inset-0 top-14 md:right-16 md:top-10 flex flex-col gap-2 items-center justify-center max-w-xs md:max-w-md mx-auto text-center'>
                        <h2 className='text-white text-4xl md:text-7xl font-bold'>SMILE AT SCHOOL!</h2>
                        <p className='text-slate-100 text-lg md:text-xl'>Discover Your Learning Path with EduHub!</p>
                    </div>
                    <img className='w-full md:max-w-2xl object-cover' src="/assets/images/firstHero-model1.png" alt="" />
                </div>
                <div className="bg-yellow-100 rounded-full mt-4">
                    <img className="w-full object-cover" src="assets/images/photo-slider1.png" alt="Slider 1" />
                </div>
                <div className="bg-blue-100 rounded-full mt-4">
                    <img className="w-full object-cover" src="assets/images/photo-slider-2.png" alt="Slider 2" />
                </div>
                <div className="bg-green-100 rounded-full mt-4">
                    <img className="w-full object-cover" src="assets/images/photo-slider3.png" alt="Slider 3" />
                </div>
            </Slider>
        </div>
    );
};
