import React, { useState } from "react";
import useSignup from "../hooks/useSignup";
import axios from "axios";

const Signup = () => {

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
      <div className="flex justify-center items-center min-h-screen bg-[#F5F0E6] p-4">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md border border-[#E0E3E6]">
          {/* Header */}
          <div className="p-6 border-b  border-[#E0E3E6]">
            <h2 className="text-3xl font-[Nunito-ExtraBold] text-[#2A3B4D] text-center">
              Join Us
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Name */}
            <div>
              <label className="block max-sm:text-sm font-[Nunito-Bold] text-[#4A4A4A] mb-2">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-[#A79B8D] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8AA896] focus:border-transparent transition-all"
                placeholder="Enter your name"
                value={data.username}
                onChange={(e) => setData({ ...data, username: e.target.value })}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block max-sm:text-sm font-[Nunito-Bold] text-[#4A4A4A] mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2.5 border border-[#A79B8D] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8AA896] focus:border-transparent transition-all"
                placeholder="Enter your email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>

            {/* Password and Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block max-sm:text-sm font-[Nunito-Bold] text-[#4A4A4A] mb-2">
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
                <label className="block max-sm:text-sm font-[Nunito-Bold] text-[#4A4A4A] mb-2">
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

            {/* Location Button */}
            <button
              type="button"
              className="w-full px-4 py-2.5 text-[#2A3B4D] bg-[#E0E3E6] rounded-lg font-[Nunito-Bold] hover:bg-[#D87C5A] hover:text-white transition-all transform hover:scale-105 active:scale-95"
              onClick={geoLocation}
            >
              {data.location === null ? (
                '📍 Get My Location'
              ) : (
                `📍 ${data.location}`
              )}
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-4 py-2.5 text-white bg-[#8AA896] rounded-lg font-[Nunito-Bold] hover:bg-[#769382] transition-all transform hover:scale-105 active:scale-95 shadow-md"
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

          {/* Login Link */}
          <div className="py-3 border-t border-[#E0E3E6] text-center">
            <p className="text-sm text-[#4A4A4A]">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-[#8AA896] hover:text-[#769382] font-[Nunito-Medium] transition-colors"
              >
                Login
              </a>
            </p>
          </div>

          {/* Divider */}
          <div className="px-2">
            <div className="flex items-center">
              <div className="flex-1 border-t border-[#A79B8D]"></div>
              <span className="px-4 text-sm text-[#4A4A4A]">or</span>
              <div className="flex-1 border-t border-[#A79B8D]"></div>
            </div>
          </div>

          {/* Register Restaurant Link */}
          <div className="mb-8 mt-4 text-center">
            <p className="text-sm text-[#4A4A4A]">
              <a
                href="/registerRestaurant"
                className="text-[#8AA896] hover:text-[#769382] font-[Nunito-Bold] transition-colors"
              >
                Register your restaurant
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
