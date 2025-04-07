import React from "react";
import { useNavigate } from "react-router-dom";

const RestaurantCard = ({ name, description, image, id, location }) => {
  const nav = useNavigate();

  const redirect = (id) => {
    nav(`restaurant/${id}`);
  };

  return (
    <div
      onClick={() => redirect(id)}
      className="max-w-sm bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer border border-[#E0E3E6] group"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-[#2A3B4D]/20 group-hover:bg-transparent transition-colors duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h2 className="text-xl font-[Nunito-ExtraBold] text-[#2A3B4D] group-hover:text-[#D87C5A] transition-colors duration-300">
          {name}
        </h2>
        <div className="flex items-center gap-2 mt-4 text-[#4A4A4A] text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 fill-current text-[#8AA896]"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          <span>{location || "Location not available"}</span> {/* Location */}
        </div>
      </div>


    </div>
  );
};

export default RestaurantCard;
