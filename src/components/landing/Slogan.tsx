export const Slogan = () => {
  return (
    <div className="relative max-w-full justify-items-center overflow-x-hidden md:overflow-x-visible md:mx-auto">
      <img 
        src="assets/images/bg-landing.png" 
        className="max-w-3xl md:max-w-full h-auto object-cover" 
        alt="Slogan background" 
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-9xl md:text-[clamp(15rem,20vw,30rem)] font-bold text-center z-10 w-full px-4">
        <div className="leading-tight">EDU</div>
        <div className="leading-tight">HUB!</div>
      </div>
    </div>
  );
};