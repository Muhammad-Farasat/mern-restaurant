import React, { useEffect, useState, useRef } from "react";
import Logout from "../../comman/button/Logout";
import Logo from "../../comman/logo/Logo";
import img from "../../../../public/Images/Animate.svg";



function Hero() {




  return (
    <>
      <section className="relative flex flex-col items-center justify-center h-screen text-[#BDD0A0]">

        <h1 className="text-[26vw] uppercase tracking-wide relative "  >
          Zenbites
        </h1>

        <div className="absolute inset-0  flex items-center justify-center">

          <Logo img={img} />

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
