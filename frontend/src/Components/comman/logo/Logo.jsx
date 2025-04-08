import React, {useRef, useEffect, useState} from 'react'
import { motion } from "framer-motion"; // Import Framer Motion
import gsap from "gsap";




function Logo({img}) {

    const mascotRef = useRef(null);

    const handleMouseMove = (event) => {
        const { clientX, clientY } = event;

        gsap.to(mascotRef.current, {
            x: (clientX - window.innerWidth / 2) * 0.02, // Move slightly left/right
            y: (clientY - window.innerHeight / 2) * 0.02, // Move slightly up/down
            rotation: (clientX - window.innerWidth / 2) * 0.005, // Slight tilt effect
            scale: 1.05, // Slightly enlarge on hover
            ease: "power2.out",
            duration: 0.3,
        });
    };

    const handleMouseLeave = () => {
        gsap.to(mascotRef.current, {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            ease: "elastic.out(1, 0.5)",
            duration: 1,
        });
    };


    return (
        <div
            className=""

        >

            <div className="relative cursor-pointer "
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}>

                {/* <div className=" absolute inset-0 overflow-hidden w-96  ">
              {particles.map((p, i) => (
                <div
                  key={i}
                  className=" relative z-[-1] bg-[#d0e300] rounded-full opacity-30 animate-float"
                  style={{
                    left: p.left,
                    width: p.size,
                    height: p.size,
                    animationDelay: p.animationDelay,
                  }}
                />
              ))}
            </div> */}

                <img
                    src={img}
                    alt="mascot"
                    ref={mascotRef}
                    className="w-[27vw] max-sm:w-[46vw] max-w-[400px] md:max-w-[450px] lg:max-w-[800px]"
                />

            </div>


        </div>

    )
}

export default Logo