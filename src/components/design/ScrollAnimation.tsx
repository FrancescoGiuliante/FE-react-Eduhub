import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

// Registrare il plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const ScrollAnimation = () => {
  useEffect(() => {
    // Animazione per l'immagine
    gsap.to("#image", {
      scrollTrigger: {
        trigger: "#image", // L'animazione inizia quando l'immagine entra nel viewport
        start: "top bottom", // Inizia quando la parte superiore dell'immagine entra nel viewport
        end: "bottom top", // L'animazione finisce quando la parte inferiore dell'immagine esce dalla parte superiore del viewport
        scrub: true, // L'animazione segue lo scroll
      },
      x: "-80vw", // L'immagine si sposterà da destra a sinistra
      duration: 1, // Imposta una durata per un movimento fluido
      ease: "none", // Per un movimento lineare
    });

    // Animazione per il testo (cambia l'opacità in base allo scroll)
    gsap.to("#text", {
      scrollTrigger: {
        trigger: "#image", // La visibilità segue la stessa trigger dell'immagine
        start: "bottom bottom", // Inizia quando la parte superiore dell'immagine entra nel viewport
        end: "bottom center", // Finisce quando la parte inferiore dell'immagine esce dalla parte superiore
        scrub: true, // L'animazione segue lo scroll
      },
      opacity: 1, // Il testo diventa visibile
      duration: 1, // Velocità di transizione
      ease: "none", // Per un movimento lineare
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
