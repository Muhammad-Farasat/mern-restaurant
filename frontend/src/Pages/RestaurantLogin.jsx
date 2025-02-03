import React, { useState } from "react";
import useRestaurantLogin from "../Hooks/useRestaurantLogin";

const RestaurantLogin = () => {

    const [data, setData] = useState({email: '', password: ''})

    const {loading, login} = useRestaurantLogin()

    const handleSubmit = async(e) => {
      e.preventDefault()
      await login({data})
    }


  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl">
          <h2 className="mb-6 text-3xl font-extrabold text-center text-gray-800">
            Login to Your Account
          </h2>

          {/* Email Input */}
          <div className="mb-5">
            <label className="block mb-2 text-lg font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
              value={data.email}
              onChange={(e)=>{setData({...data, email:e.target.value})}}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-5">
            <label className="block mb-2 text-lg font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
              value={data.password}
              onChange={(e)=>{setData({...data, password:e.target.value})}}
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full px-4 py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition-all"
            onClick={handleSubmit}
          >
            { loading ? 'loading' : 'Login'}
          </button>

          {/* Divider */}
          <div className="my-6 text-center text-gray-500">or</div>

          {/* Sign Up Link */}
          <p className="text-center text-gray-700">
            Don't have an account?{" "}
            <a href="/registerRestaurant" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default RestaurantLogin;
