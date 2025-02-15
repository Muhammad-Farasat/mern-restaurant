import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import useDisplayDish from "../../hooks/useDisplayDish";
import useUpdateDish from "../../hooks/useUpdateDish";
import { Modal } from "antd";
import Cookies from "js-cookie";
import axios from "axios";

const Card = ({ name, description, image, price, foodId, id }) => {

  const dispatch = useDispatch();

  const fetchCookies = Cookies.get("user-data");
  const fetchRestaurantCookies = Cookies.get("restaurant-user");

  const userData = fetchCookies ? JSON.parse(fetchCookies) : null;
  const restaurantData = fetchRestaurantCookies
    ? JSON.parse(fetchRestaurantCookies)
    : null;

  const userId = userData?._id || null;
  const restaurantId = restaurantData?._id || null;

  const [foodData, setFoodData] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
    foodId: null,
  });

  const { loading, updateFood } = useUpdateDish();

  const [editOpen, setEditOpen] = useState(false);

  const handleAddToCart = () => {
    if (!userId) {
      console.error("User ID is missing");
      return;
    }
    dispatch(
      addToCart({ userId, name, price, foodId, restaurantId: id, quantity: 1 })
    );
  };

  const handleDelete = async (foodId) => {

    const response = await axios.post(
      "/deleteFood",
      { foodId },
      { withCredentials: true }

      
    );

    if (response.status === 200) {
      console.log(response);

      window.location.reload();
    } else {
      toast.error("Error on delete");
    }
  };

  const handleEdit = async () => {
    try {
        await updateFood(foodData);  // Attempt to update
        setEditOpen(false);  // Close modal only if successful
        window.location.reload();  // Refresh the page to reflect changes
    } catch (error) {
        console.error("Error updating food:", error);
        toast.error("Failed to update food. Please try again!"); // Show error message
    }
};

  const handleImage = (e) => {
    const { name, files, value } = e.target;
    setFoodData({ ...foodData, [name]: files ? files[0] : value });
  };

  console.log(name, price, description);
  

  return (
    <>
      <div className="max-w-sm bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-[#E0E3E6]">
        {/* Image */}
        <img src={image} alt={name} className="w-full h-48 object-cover" />

        {/* Content */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-[#2A3B4D]">{name}</h2>
          <p className="text-[#4A4A4A] text-sm mt-3 line-clamp-2">
            {description}
          </p>
          <p className="text-[#D87C5A] text-lg font-semibold mt-4">
            Rs. {price}
          </p>
        </div>

        {/* Buttons */}
        {userId ? (
          <div className="px-6 pb-6">
            <button
              onClick={handleAddToCart}
              className="w-full bg-[#8AA896] text-white py-3 rounded-lg font-medium hover:bg-[#769382] transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md"
            >
              Add to Cart
            </button>
          </div>
        ) : restaurantId ? (
          <div className="flex justify-between px-6 pb-6">
            <button
              onClick={() => {
                setFoodData({
                  name,
                  description,
                  image,
                  price,
                  foodId,
                }
                )
                setEditOpen(true);
              }
              }
              className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-all"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(foodId)}
              className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all"
            >
              Delete
            </button>
          </div>
        ) : null}
      </div>

      <Modal
        title={<p className="text-lg font-semibold">Edit Item</p>}
        open={editOpen}
        onCancel={() => setEditOpen(false)}
        footer={null}
      >
        <div className="space-y-4">
          {/* Food Name */}
          <div>
            <label className="block font-medium text-gray-700">Food Name</label>
            <input
              type="text"
              name="name"
              value={foodData.name}
              onChange={(e) => {
                setFoodData({ ...foodData, name: e.target.value });
              }}
              placeholder="Enter food name"
              className="mt-1 border rounded-md px-3 py-2 w-full"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={foodData.description}
              onChange={(e) => {
                setFoodData({ ...foodData, description: e.target.value });
              }}
              placeholder="Enter food description"
              className="mt-1 border rounded-md px-3 py-2 w-full h-24"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block font-medium text-gray-700">Price ($)</label>
            <input
              type="number"
              name="price"
              value={foodData.price}
              onChange={(e) => {
                setFoodData({ ...foodData, price: e.target.value });
              }}
              placeholder="Enter price"
              className="mt-1 border rounded-md px-3 py-2 w-full"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-medium text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleImage}
              className="mt-1 w-full"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleEdit}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            {loading ? "loading" : "Edit Item"}
          </button>
        </div>
      </Modal>
    </>

  );
};

export default Card;
