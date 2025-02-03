import React from "react";
import {useNavigate} from 'react-router-dom'


const Card = ({ name, description, image, price, id }) => {

  const nav = useNavigate()

  const redirect = (id) => {
    nav(`restaurant/${id}`)
  }

  return (
    <div onClick={()=>redirect(id)}  className="max-w-sm bg-white shadow-lg rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
      {/* Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover"
      />

      {/* Content */}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
        <p className="text-gray-600 text-sm mt-2">{description}</p>
      </div>

      {/* Button */}
      <div className="p-4">
        <button className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 ${price == null ? 'hidden' : 'block'} `}>
          {price}
        </button>
      </div>
    </div>
  );
};

export default Card;
