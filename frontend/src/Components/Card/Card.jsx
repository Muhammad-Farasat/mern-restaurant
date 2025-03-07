import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import useUpdateDish from "../../hooks/useUpdateDish";
import { Modal } from "antd";
import axios from "axios";
import useDisplayUser from "../../hooks/useDisplayUser";
import useSpecificRestaurantToken from "../../hooks/useSpecificRestaurantToken";
import { removeDish } from "../../redux/foodSlice";





const Card = ({ name, description, image, price, foodId, id }) => {

  const dispatch = useDispatch();

  const { data } = useDisplayUser()
  const { restaurantDetails } = useSpecificRestaurantToken()
  const backend_url = import.meta.env.VITE_BACKEND_URL


  const userId = data?._id || null;
  const restaurantId = restaurantDetails?._id || null;

  const [foodData, setFoodData] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
    foodId: null,
    restaurantId: restaurantId
  });

  const { loading, updateFood } = useUpdateDish();

  const [editOpen, setEditOpen] = useState(false);

  const handleAddToCart = () => {
    if (!userId) {
      return;
    }
    dispatch(
      addToCart({ userId, name, price, foodId, restaurantId: id, quantity: 1 })
    );
  };

  const handleDelete = async (foodId) => {

    const response = await axios.post(
      `${backend_url}/api/deleteFood`,
      { foodId },
      { withCredentials: true }
    );

    if (response.status === 200) {
      console.log(response);

      dispatch(removeDish(foodId))
    } else {
      toast.error("Error on delete");
    }

  };

  const handleEdit = async () => {

    try {
      await updateFood(foodData);
      setEditOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating food:", error);
      toast.error("Failed to update food. Please try again!");
    }

  };

  const handleImage = (e) => {
    const { name, files, value } = e.target;
    setFoodData({ ...foodData, [name]: files ? files[0] : value });
  };



  return (
    <>
      <div className="max-w-sm bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-[#E0E3E6]">
        {/* Image */}
        <img src={image} alt={name} className="w-full h-48 object-cover" />

        {/* Content */}
        <div className="p-6">
          <h2 className="text-xl font-[Nunito-ExtraBold] text-[#2A3B4D]">{name}</h2>
          <p className="text-[#4A4A4A] text-sm mt-3 line-clamp-2">
            {description}
          </p>
          <p className="text-[#D87C5A] text-lg font-[Nunito-Bold] mt-4">
            Rs. {price}
          </p>
        </div>

        {/* Buttons */}
        {userId ? (
          <div className="px-6 pb-6">
            <button
              onClick={handleAddToCart}
              className="w-full bg-[#8AA896] text-white py-3 rounded-lg font-[Nunito-Bold] hover:bg-[#769382] transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md"
            >
              Add to Cart
            </button>
          </div>
        ) : restaurantId ? (
          <div className="flex flex-col space-y-1.5  justify-between px-6 pb-6">
            <button
              onClick={() => {
                setFoodData({
                  name,
                  description,
                  image,
                  price,
                  foodId,
                  restaurantId
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
        title={<p className="text-lg font-[Nunito-Bold] text-green-800">Edit Item</p>}
        open={editOpen}
        onCancel={() => setEditOpen(false)}
        footer={null}
        className="rounded-lg overflow-hidden"
      >
        <div className="space-y-4 p-6 bg-green-50">
          {/* Food Name */}
          <div>
            <label className="block font-[Nunito-Bold] text-green-800">Food Name</label>
            <input
              type="text"
              name="name"
              value={foodData.name}
              onChange={(e) => {
                setFoodData({ ...foodData, name: e.target.value });
              }}
              placeholder="Enter food name"
              className="mt-1 border-2 border-green-200 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-[Nunito-Bold] text-green-800">Description</label>
            <textarea
              name="description"
              value={foodData.description}
              onChange={(e) => {
                setFoodData({ ...foodData, description: e.target.value });
              }}
              placeholder="Enter food description"
              className="mt-1 border-2 border-green-200 rounded-lg px-3 py-2 w-full h-24 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block font-[Nunito-Bold] text-green-800">Price ($)</label>
            <input
              type="number"
              name="price"
              value={foodData.price}
              onChange={(e) => {
                setFoodData({ ...foodData, price: e.target.value });
              }}
              placeholder="Enter price"
              className="mt-1 border-2 border-green-200 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-[Nunito-Bold] text-green-800">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleImage}
              className="mt-1 w-full border-2 border-green-200 rounded-lg px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleEdit}
            className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            {loading ? "Loading..." : "Edit Item"}
          </button>
        </div>
      </Modal>

    </>

  );
};

export default Card;
