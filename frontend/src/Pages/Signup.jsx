import React, { useState } from "react";
import useSignup from "../Hooks/useSignup";
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
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Create an Account
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
                value={data.username}
                onChange={(e) => setData({ ...data, username: e.target.value })}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm your password"
                value={data.confirmPassword}
                onChange={(e) =>
                  setData({ ...data, confirmPassword: e.target.value })
                }
              />
            </div>

            <button
              type="button"
              className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition duration-300 mb-4"
              onClick={geoLocation}
            >
              {data.location === null ? 'Location' : data.location}
            </button>

            <button
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
              onClick={handleSubmit}
            >
              {loading ? "loading" : "Sign Up"}
            </button>
          </form>
          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
