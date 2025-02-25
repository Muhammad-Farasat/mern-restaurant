import React, { useState } from "react";
import axios from "axios";
import useRestaurantSignup from "../hooks/useRestaurantSignup";

const RestaurantSignup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    location: null,
    image: null,
  });

  const { loading, restaurantSignup } = useRestaurantSignup();
  const [isFetchingLocation, setIsFetchingLocation] = useState(false)
  
  
  const geoLocation = async () => {
    
    setIsFetchingLocation(true)
    
    
    navigator.geolocation.getCurrentPosition(async (position) => {
    
      let lat = position.coords.latitude;
      let log = position.coords.longitude;

      try {
        // const response = await axios.get(
        //   `https://api.positionstack.com/v1/reverse?access_key=b4f083b25cc72a7b04fcda2825f8e04d&query=${lat},${log}`
        // );

        // const result = response.data;

        // if (result.data && result.data.length > 0) {
        //   data.location = result.data[0].label;

        //   setData((prevData) => ({
        //     ...prevData,
        //     location: data.location,
        //   }));
        // } else {
        //   console.error("No location");
        // }

        const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${log}&key=41cf5ee49ff744a1b40e2b62d046110f`)

        const result = response.data

        if (result.results && result.results.length > 0) {
          const address = result.results[0].formatted;

          setData((prevData) => ({
            ...prevData,
            location: address,
          }));

        } else {
          console.error("No location data found");
        }

      } catch (error) {
        console.error(error);
      } finally {
        setIsFetchingLocation(false)
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

  const isFormFilled = () => {
    return(
      data.name.trim() !== "" && 
      data.email.trim() !== "" &&
      data.password.trim() !== "" &&
      data.image !== null &&
      data.location !== null
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F5F0E6] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-8 bg-white rounded-xl shadow-lg border border-[#E0E3E6]"
      >
        <h2 className="mb-8 text-3xl font-[Nunito-Bold] text-center text-[#2A3B4D]">
          Register Your <span className="text-[#4A4A4A] font-[Nunito-ExtraBold] ">Restaurant</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-sm:gap-0 ">

          <div className="mb-6">
            <label className="block mb-3 max-sm:text-sm font-[Nunito-Bold] text-[#4A4A4A]">
              Restaurant Name
            </label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="w-full px-4 py-3 border border-[#A79B8D] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8AA896] focus:border-transparent transition-all duration-200  "
              placeholder="Enter restaurant name"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-3 max-sm:text-sm font-[Nunito-Bold] text-[#4A4A4A]">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="w-full px-4 py-3 border border-[#A79B8D] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8AA896] focus:border-transparent transition-all"
              placeholder="Enter restaurant email"
              required
            />
          </div>
        </div>


        {/* Location */}
        <div className="mb-6">
          <label className="block mb-3 max-sm:text-sm font-[Nunito-Bold] text-[#4A4A4A]">
            Location
          </label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="px-6 py-3 text-[#2A3B4D] bg-[#8AA896] rounded-lg font-[Nunito-Bold] hover:bg-[#769382] hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-md"
              onClick={geoLocation}
            >
              Get My Location
            </button>
            <p className="text-[#4A4A4A] font-[Nunito-Bold]">
              {isFetchingLocation ? (
                '📍 Fetching Location...'
              ) : data.location === null ? (
                '📍 Get My Location'
              ) : (
                `📍 ${data.location}`
              )}
            </p>
          </div>
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block mb-3 max-sm:text-sm font-[Nunito-Bold] text-[#4A4A4A]">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="w-full px-4 py-3 border border-[#A79B8D] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8AA896] focus:border-transparent transition-all"
            placeholder="Enter password"
            required
          />
        </div>

        {/* Upload Image */}
        <div className="mb-6">
          <label className="block mb-3 max-sm:text-sm font-[Nunito-Bold] text-[#4A4A4A]">
            Upload Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImage}
            className="w-full border border-[#A79B8D] rounded-lg file:px-4 file:py-2 file:bg-[#E0E3E6] file:text-[#4A4A4A] file:rounded-lg file:border-none file:shadow-sm file:hover:bg-[#D87C5A] file:hover:text-white transition-all"
            required
          />
        </div>

        {/* Login Link */}
        <div className="mb-6">
          <p className="text-center max-sm:text-sm text-[#4A4A4A]">
            Already have an account?{" "}
            <a href="/loginRestaurant" className="text-[#8AA896] hover:text-[#769382] font-[Nunito-Bold]">
              Login
            </a>
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormFilled()}
          className={`w-full px-4 py-3 text-lg font-[Nunito-ExtraBold] text-white rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-md ${isFormFilled() ? 'bg-[#D87C5A] hover:bg-[#C56947] ' : 'bg-[#7e5343] cursor-not-allowed '} `}
        >
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            </div>
          ) : (
            'Register'
          )}
        </button>

        <div className="my-4 flex items-center">
          <div className="flex-1 border-t border-[#A79B8D]"></div>
          <span className="px-4 text-[#4A4A4A]">or</span>
          <div className="flex-1 border-t border-[#A79B8D]"></div>
        </div>
        <p className="mt-4 text-center text-[#4A4A4A]">
          <a
            href="/login"
            className="text-[#8AA896] hover:text-[#769382] font-[Nunito-Bold]"
          >
            Login as Customer
          </a>
        </p>

      </form>
    </div>
  );
};

export default RestaurantSignup;
