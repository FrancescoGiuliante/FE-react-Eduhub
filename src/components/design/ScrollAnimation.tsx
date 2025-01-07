import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const ScrollAnimation = () => {
  useEffect(() => {
    gsap.to("#image", {
      scrollTrigger: {
        trigger: "#image",
        start: "top bottom", 
        end: "bottom top", 
        scrub: true, 
      },
      x: "-80vw", 
      duration: 1,
      ease: "none", 
    });

    gsap.to("#text", {
      scrollTrigger: {
        trigger: "#image", 
        start: "bottom bottom",
        end: "bottom center",
        scrub: true,
      },
      opacity: 1,
      duration: 1, 
      ease: "none", 
    });
  }, []);

  return (
    <div className="w-full overflow-x-hidden mt-12 flex justify-end items-center relative">
      <img
        id="image"
        src="assets/gifs/learning-power.gif"
        alt="Learning Power"
        className="max-w-lg"
      />

      <h1
        id="text"
        className="absolute text-4xl opacity-0 text-center leading-relaxed text-[#636ee4]"
        style={{
          left: "75%",
          transform: "translateX(-75%)",
        }}
      >
        LEARN THE POWER OF KNOWLEDGE
        <div className="mt-2">
          <Link to="/register">
            <Button className="bg-[#636ee4] text-white py-2 px-6 rounded-xl text-lg hover:bg-black">
              Register here
            </Button>
          </Link>

        </div>
      </h1>
    </div>
  );
};

export default ScrollAnimation;
