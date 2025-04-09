import ParallaxGrid from "../../comman/parallaxGrid/ParallaxGrid";
import React from "react";

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Ali",
      quote: "ZenBites helped me find the best food spots in town!",
      image: "/girl.jpg",
      speed: 0.2,
    },
    {
      id: 2,
      name: "Ahmed Raza",
      quote: "Super clean UI and really smooth experience.",
      image: "/guy.jpg",
      speed: 0.4,
    },
    {
      id: 3,
      name: "Fatima Noor",
      quote: "This app is a foodie's dream come true 💯.",
      image: "/girl2.jpg",
      speed: 0.6,
    },
  ];

  return (
    <section className="min-h-screen py-20 bg-white overflow-x-hidden">
      <h1 className="text-center text-4xl font-bold text-[#004632] mb-16">
        WHAT OUR USERS SAY
      </h1>

      <div className="flex gap-10 justify-center items-start overflow-x-auto px-10">
        {testimonials.map((item) => (
          <ParallaxGrid key={item.id} speed={item.speed}>
            <div className="bg-[#f5f5f5] rounded-xl shadow-lg p-8 w-[300px] text-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <p className="italic text-base">"{item.quote}"</p>
              <h3 className="mt-4 text-lg font-semibold text-[#004632]">
                {item.name}
              </h3>
            </div>
          </ParallaxGrid>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
