import React from "react";
import { useNavigate } from "react-router-dom";

const RestaurantCard = ({ name, description, image, id, location }) => {
  const nav = useNavigate();

  const redirect = (id) => {
    nav(`/restaurant/${id}`);
  };

  return (
    <div
      onClick={() => redirect(id)}
      className="bg-[#FAF8F5] rounded-sm overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border border-[#e3dfd9]"
    >
      {/* Image */}
      <div className="relative h-[32rem] max-sm:h-52 max-sm:w-full max-md:h-96 max-md:w-full max-lg:h-96 max-lg:w-full overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
        />

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#BDD0A0] to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 h-full w-full bg-[#11111151] transparent" />

        <p className="absolute bottom-10 left-1/2 -translate-x-1/2 text-5xl font-black uppercase tracking-wider text-[#2A3B4D] stroke-text text-center max-sm:text-2xl max-sm:bottom-2 max-md:text-4xl max-md:bottom-6 max-lg:text-4xl max-lg:bottom-6 ">
          {name}
        </p>


        {/* <div className="px-4 pt-2 pb-4 text-center">
      </div> */}
      </div>

      {/* Title */}
    </div>
  );
};

export default RestaurantCard;
