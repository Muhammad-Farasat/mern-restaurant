import React, { useState } from "react";
import axios from "axios";
import useRestaurantSignup from "../Hooks/useRestaurantSignup";

const RestaurantSignup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    location: null,
    image: null,
  });

  const { loading, restaurantSignup } = useRestaurantSignup();

  const geoLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      let lat = position.coords.latitude;
      let log = position.coords.longitude;
      // console.log(lat, log);

      try {
        const response = await axios.get(
          `https://api.positionstack.com/v1/reverse?access_key=b4f083b25cc72a7b04fcda2825f8e04d&query=${lat},${log}`
        );

        // console.log(response.data);

        const result = response.data;

        if (result.data && result.data.length > 0) {
          data.location = result.data[0].label;
          console.log(data.location);
        } else {
          console.error("No location");
        }
      } catch (error) {
        console.error(error);
      }
    });
  };

  const handleImage = (e) => {
    const { name, files, value } = e.target;
    setData({ ...data, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await restaurantSignup({ data });
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg p-8 bg-white rounded-xl shadow-xl"
        >
          <h2 className="mb-6 text-3xl font-extrabold text-center text-gray-800">
            Register Your Restaurant
          </h2>

          {/* Restaurant Name */}
          <div className="mb-5">
            <label className="block mb-2 text-lg font-semibold text-gray-700">
              Restaurant Name
            </label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter restaurant name"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block mb-2 text-lg font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter restaurant email"
              required
            />
          </div>

          {/* Location */}
          <div className="mb-5 flex items-center gap-x-4">
            <button
              type="button"
              className="px-5 py-2.5 text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 transition-all"
              onClick={geoLocation}
            >
              Get My Location
            </button>
            <p className="text-gray-700 font-medium">
              {data.location ? (
                <span className="text-green-600">{data.location}</span>
              ) : (
                "Select Location"
              )}
            </p>
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block mb-2 text-lg font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter password"
              required
            />
          </div>

          {/* Upload Image */}
          <div className="mb-5">
            <label className="block mb-2 text-lg font-semibold text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImage}
              className="w-full border border-gray-300 rounded-lg file:px-4 file:py-2 file:bg-gray-200 file:text-gray-700 file:rounded-lg file:border-none file:shadow-sm"
              required
            />
          </div>

          <div>
            <p className="text-sm text-center text-gray-600 mt-4 mb-4">Already have an account? <a href="/loginRestaurant" className="text-blue-500 hover:underline" >Login</a></p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition-all"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
    </>
  );
};

export default RestaurantSignup;
