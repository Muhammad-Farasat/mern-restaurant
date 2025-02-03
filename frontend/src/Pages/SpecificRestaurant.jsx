import React from "react";
import { useParams } from "react-router-dom";

const SpecificRestaurant = () => {

    const {id} = useParams()
     

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Banner Section */}
      <div className="relative h-64 w-full">
        <img
          src="https://via.placeholder.com/1200x400" // Replace with restaurant image
          alt="Restaurant Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white">
            Restaurant Name
          </h1>
        </div>
      </div>

      {/* Dishes Section */}
      <div className="max-w-6xl mx-auto py-10 px-4">
        <h2 className="text-2xl font-semibold mb-6">Dishes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src="https://via.placeholder.com/300" // Replace with dish image
                alt="Dish"
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-medium">Dish Name</h3>
                <p className="text-gray-600 text-sm">Short description of dish</p>
                <div className="mt-3 text-lg font-semibold">$10.99</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecificRestaurant;
