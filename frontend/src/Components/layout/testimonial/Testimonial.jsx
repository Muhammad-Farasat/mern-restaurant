import React from 'react';
import ParallaxGrid from '../../comman/parallaxGrid/ParallaxGrid'; 
import sarah from '../../../../public/Images/Sarah.jpg'
import fatima from '../../../../public/Images/fatima.jpg'
import hania from '../../../../public/Images/hania.jpg'
import ahmed from '../../../../public/Images/ahmed.jpg'
import bilal from '../../../../public/Images/bilal.jpg'
import usman from '../../../../public/Images/usman.jpg'

function Testimonial() {
  
  
  const testimonials = [
    {
      id: 1,
      name: "Sarah Ali",
      quote: "ZenBites helped me find the best food spots in town!",
      image: sarah,
      speed: 2
    },
    {
      id: 2,
      name: "Ahmed Raza",
      quote: "Super clean UI and really smooth experience.",
      image: ahmed,
      speed: 1.3
    },
    {
      id: 3,
      name: "Fatima Noor",
      quote: "This app is a foodie's dream come true 💯.",
      image: fatima,
      speed: 1.5
    },
    {
      id: 4,
      name: "Usman Tariq",
      quote: "I love how intuitive everything feels on this platform.",
      image: usman,
      speed: 1.8
    },
    {
      id: 5,
      name: "Hania Shah",
      quote: "Great service and delicious food options everywhere!",
      image: hania,
      speed: 1.2
    },
    {
      id: 6,
      name: "Bilal Khan",
      quote: "Highly recommend ZenBites for quick food discovery.",
      image: bilal,
      speed: 2.1
    },
  ];
  

  return (
    <section className="min-h-screen py-24 ">
      <h1 className="text-center text-4xl text-[#004632] mb-20 font-bold">
        WHAT OUR USERS SAY
      </h1>
      <div className=" flex flex-wrap justify-center gap-10 px-6 mt-52 ">
        {testimonials.map((item) => (
          <ParallaxGrid key={item.id} speed={item.speed}>
            <div className="bg-white shadow-lg rounded-xl p-6 text-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 mx-auto rounded-full mb-4 object-cover"
              />
              <p className="italic text-gray-600">"{item.quote}"</p>
              <h3 className="mt-4 font-semibold text-[#004632]">{item.name}</h3>
            </div>
          </ParallaxGrid>
        ))}
      </div>
    </section>
  );
}

export default Testimonial;
