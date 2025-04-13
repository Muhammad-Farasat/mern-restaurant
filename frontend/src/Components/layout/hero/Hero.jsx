import React, { useEffect, useState, useRef } from "react";
import Logout from "../../comman/button/Logout";
import Logo from "../../comman/logo/Logo";
import img from "../../../../public/Images/Animate.svg";
import { IoChevronDown } from "react-icons/io5";
import { motion } from "framer-motion";



function Hero() {

  const scrollRef = useRef(null);



  return (
    <>
      <section className="relative flex flex-col items-center justify-center h-screen text-[#BDD0A0]">

        <h1 className="text-[22vw] uppercase tracking-wide relative "  >
          Zenbites
        </h1>

        <div className="absolute inset-0  flex items-center justify-center">

          <Logo img={img} width={' w-[27vw] '} />

        </div>


        <div className=" text-[#004632] absolute bottom-10 flex items-center justify-between w-[80vw] max-w-[1200px]">
          
          <motion.div
            className="flex justify-center mb-10"
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <button
              onClick={() => scrollRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="text-4xl text-[#004632] flex flex-col items-center"
            >

              <IoChevronDown className="absolute bottom-2 " />
              
              <IoChevronDown />

            </button>
          </motion.div>


          <Logout />

        </div>

      </section>
    </>
  );
}

export default Hero;
