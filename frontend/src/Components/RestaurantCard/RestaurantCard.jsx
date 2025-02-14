import React from "react";
import { useNavigate } from "react-router-dom";

const RestaurantCard = ({ name, description, image, id }) => {
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
        <h2 className="text-xl font-bold text-[#2A3B4D] group-hover:text-[#D87C5A] transition-colors duration-300">
          {name}
        </h2>
        <p className="text-[#4A4A4A] text-sm mt-2 line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
};

export default RestaurantCard;
