import React from "react";
import { useState } from "react";
import useDisplayDish from "../Hooks/useDisplayDish";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../Components/Navbar/Navbar";

const RestaurantHome = () => {
  const [foodData, setFoodData] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
    restaurantId: null,
    foodId: null,
  });

  const { dishesDisplay } = useDisplayDish();

  const handleDelete = async (id) => {
    const response = await axios.post(
      "http://localhost:3000/deleteFood",
      { id },
      { withCredentials: true }
    );

    if (response.status === 200) {
      window.location.reload();
    } else {
      toast.error("Error on delete");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 px-6 py-8">

        {/* Food Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {dishesDisplay.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-all"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-800">
                {item.name}
              </h2>
              <p className="text-gray-600">{item.price}</p>
              <button
                onClick={() => {
                  setFoodData({
                    name: item.name,
                    description: item.description,
                    image: item.image,
                    price: item.price,
                    foodId: item._id,
                  });
                  setEditOpen(true);
                }}
                className="mt-3 px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-all"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="mt-3 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        
      </div>
    </>
  );
};

export default RestaurantHome;
