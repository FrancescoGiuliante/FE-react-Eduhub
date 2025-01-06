import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registriamo il plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export const SquareAnimation = () => {
    useEffect(() => {
        // Animazione per ogni quadrato
        gsap.fromTo(
            ".square-element", // Selettore per gli elementi
            {
                opacity: 0, 
                y: 200,
            },
            {
                opacity: 1, 
                y: 0, 
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
                duration: 1, 
                stagger: 0.2,
                scrollTrigger: {
                    trigger: ".square-animation", 
                    start: "top bottom",
                    end: "bottom top", 
                    scrub: true, // Permette l'animazione durante lo scroll
                    // markers: true, // Mostra i markers per il debug
                },
            }
        );
    }, []);

    return (
        <div className="square-animation justify-items-center mt-10">
            <div className="grid grid-cols-2 gap-2 grid-rows-2 text-center max-w-2xl rounded-xl relative">
                <div className="square-element border-b-2 border-r-2 rounded-xl p-4 flex flex-col items-center justify-center">
                    <img src="assets/gifs/lesson-materials.gif" className="max-w-48 md:max-w-xs" alt="" />
                    <div>
                        <h1 className="text-xl text-[#818bff]">LESSON MATERIALS</h1>
                        <p className="text-sm text-slate-600">Access a variety of educational materials published by professors to support your learning.</p>
                    </div>
                </div>
                <div className="square-element border-b-2 border-l-2 rounded-xl p-4 flex flex-col items-center justify-center">
                    <img src="assets/gifs/calendar-work.gif" className="max-w-48 md:max-w-xs"  alt="" />
                    <div>
                        <h1 className="text-xl text-[#818bff]">PLAN YOUR CALENDAR</h1>
                        <p className="text-sm text-slate-600">Organize your study plan with the calendar and never miss a lesson.</p>
                    </div>
                </div>
                <div className="square-element border-t-2 border-r-2 rounded-xl p-4 flex flex-col items-center justify-center">
                    <img src="assets/gifs/freeCourse.gif" className="max-w-48 md:max-w-xs"  alt="" />
                    <div>
                        <h1 className="text-xl text-[#818bff]">FREE COURSES</h1>
                        <p className="text-sm text-slate-600">Access free courses to improve your knowledge and skills in various fields.</p>
                    </div>
                </div>
                <div className="square-element border-t-2 border-l-2 rounded-xl p-4 flex flex-col items-center justify-center">
                    <img src="assets/gifs/happy-students.gif" className="max-w-48 md:max-w-xs"  alt="" />
                    <div>
                        <h1 className="text-xl text-[#818bff]">HAPPY STUDENTS</h1>
                        <p className="text-sm text-slate-600">Join a community of happy students who share their knowledge and experiences.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

