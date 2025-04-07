import React, { useEffect, useState, useRef } from "react";
import Logout from "../../comman/button/Logout";
import logo from "../../../../public/Images/Animate.svg";
import { motion } from "framer-motion"; // Import Framer Motion
import gsap from "gsap";


function Hero() {

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
    <>
      <section className="relative flex flex-col items-center justify-center h-screen text-[#BDD0A0]">

        <h1 className="text-[26vw] uppercase tracking-wide relative "  >
          Zenbites
        </h1>

        <div
          className="absolute inset-0 flex items-center justify-center"

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
              src={logo}
              alt="mascot"
              ref={mascotRef}
              className="w-[27vw] max-sm:w-[46vw] max-w-[400px] md:max-w-[450px] lg:max-w-[800px]"
            />

          </div>


        </div>

        <div className=" text-[#004632] absolute bottom-10 flex items-center justify-between w-[80vw] max-w-[1200px]">
          <p className="text-sm md:text-lg tracking-wider">SCROLL DOWN</p>
          <Logout />
        </div>
      </section>
    </>
  );
}

export default Hero;
