import React, { useEffect, useState } from "react";
import useLogout from "../../Hooks/useLogout";
import Cookies from "js-cookie";
import useRestaurantLogout from "../../Hooks/useRestaurantLogout";
import useAddFood from "../../Hooks/useAddFood";
import useDisplayDish from "../../Hooks/useDisplayDish";
import { Modal } from "antd";
import useUpdateDish from "../../Hooks/useUpdateDish";

const Navbar = () => {
  const { loading, logout } = useLogout();
  const { restaurantLogout } = useRestaurantLogout();

  const userData = Cookies.get("user-data");
  const user = userData ? JSON.parse(userData) : null;

  const restaurantData = Cookies.get("restaurant-user");
  const rUser = restaurantData ? JSON.parse(restaurantData) : null;

  // console.log("This is restaurant", rUser.name);
  // console.log("This is customer", user.username);

  const [userType, setUserType] = useState("");

  useEffect(() => {
    if (user !== null) {
      setUserType("customer");
    } else if (rUser !== null) {
      setUserType("restaurant");
    }
  }, []);

  console.log("This is userType", userType);

  const handleLogout = async () => {
    userType === "customer" ? await logout() : await restaurantLogout();
  };

  const handleImage = (e) => {
    const { name, files, value } = e.target;
    setFoodData({ ...foodData, [name]: files ? files[0] : value });
  };

  const [editOpen, setEditOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const handleEdit = async() =>{
    await updateFood(foodData)
    console.log(dishesDisplay);
  }

  const [foodData, setFoodData] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
    restaurantId: null,
    foodId: null,
  });

  const { addFood } = useAddFood();
  const { updateFood } = useUpdateDish();

  const handleSubmit = async () => {
    await addFood({ foodData });
  };

  return (
    <>
      <nav className="flex items-center justify-between bg-gray-800 px-4 py-2 shadow-lg text-white">
        {/* Logo Section */}
        <div className="text-xl font-semibold">
          {userType === "customer" ? 
            'MyApp' :rUser?.name || null
          
          }
        </div>

        {/* User Address Section */}
        {userType === "customer" ? (
          <div className="text-center flex-grow text-sm md:text-base">
            <p className="truncate">{user.location}</p>
          </div>
        ) : null}

        {/* Logout Button */}
        {userType === "restaurant" ? (
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setOpen(true)}
              className="px-5 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all"
            >
              Upload Item
            </button>

            <button
              // onClick={() => router.push("/dashboard")} // Update navigation method as needed
              className="px-5 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-all"
            >
              Dashboard
            </button>

            <button
              onClick={handleLogout}
              className="px-5 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-1 text-sm rounded-md hover:bg-red-700 transition-all"
          >
            {loading ? "loading" : "Logout"}
          </button>
        )}
      </nav>

      <Modal
        title={<p className="text-lg font-semibold">Upload Food Item</p>}
        open={open}
        onCancel={() => setOpen(false)}
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
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            {loading ? "loading" : "Upload Item"}
          </button>
        </div>
      </Modal>

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

export default Navbar;
