import React, { useState } from "react";
import useSignup from "../hooks/useSignup";
import axios from "axios";

const Signup = () => {
  // const API_CALL =
  // const API_KEY = 'b4f083b25cc72a7b04fcda2825f8e04d'

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: null,
  });

  const { loading, signup } = useSignup();

  const geoLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      let lat = position.coords.latitude;
      let lgn = position.coords.longitude;

      try {
        const response = await axios.get(
          `http://api.positionstack.com/v1/reverse?access_key=b4f083b25cc72a7b04fcda2825f8e04d&query=${lat},${lgn}`
        )

        const result = response.data

        if (result.data && result.data.length > 0) {
          const address = result.data[0].label;
          data.location = address
          console.log("Location:", data.location);
        } else {
          console.error("No location data found");
        }

      } catch (error) {
        console.error(error);
      }

    });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup({ data });
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-[#F5F0E6]">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-[#E0E3E6]">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#2A3B4D]">
            Join Us
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-[#A79B8D] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8AA896] focus:border-transparent transition-all duration-200"
                placeholder="Enter your name"
                value={data.username}
                onChange={(e) => setData({ ...data, username: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-[#A79B8D] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8AA896] focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2.5 border border-[#A79B8D] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8AA896] focus:border-transparent transition-all"
                  placeholder="Enter your password"
                  value={data.password}
                  onChange={(e) => setData({ ...data, password: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2.5 border border-[#A79B8D] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8AA896] focus:border-transparent transition-all"
                  placeholder="Confirm your password"
                  value={data.confirmPassword}
                  onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
                />
              </div>
            </div>


            {/*  */}

            <button
              type="button"
              className="w-full bg-[#8AA896] text-white py-3 rounded-lg font-medium hover:bg-[#769382] transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md"
              onClick={geoLocation}
            >
              {data.location === null ? (
                '📍 Get Location'
              ) : (
                `📍 ${data.location}`
              )}
            </button>

            <button
              type="submit"
              className="w-full bg-[#D87C5A] text-white py-3 rounded-lg font-semibold hover:bg-[#C56947] transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md"
              onClick={handleSubmit}
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <p className="text-sm text-center text-[#4A4A4A] mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-[#8AA896] hover:text-[#769382] font-medium transition-colors duration-200">
              Login
            </a>
          </p>

          <div className="my-4 flex items-center">
            <div className="flex-1 border-t border-[#A79B8D]"></div>
            <span className="px-4 text-[#4A4A4A]">or</span>
            <div className="flex-1 border-t border-[#A79B8D]"></div>
          </div>
          <p className="text-sm text-center text-[#4A4A4D]">
            <a href="/registerRestaurant" className="text-[#8AA896] hover:text-[#769382] font-medium transition-colors duration-200">
              Register your restaurant
            </a>
          </p>

        </div>
      </div>
    </>
  );
};

export default Signup;
