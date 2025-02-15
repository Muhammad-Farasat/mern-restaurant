import React, { useState, useEffect } from "react";
import useLogin from "../hooks/useLogin";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
import '../App.css'

const Login = () => {

  const [data, setData] = useState({ email: '', password: '' })

  const { loading, login } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login({ data })
  }

  const navigate = useNavigate()

  useEffect(() => {
    const restaurantData = Cookies.get("restaurant-user");
    if (restaurantData) {
      const data = JSON.parse(restaurantData)
      navigate(`/RestaurantHome/${data._id}`); 
    }
  }, []);

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-[#F5F0E6]">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-[#E0E3E6]">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#2A3B4D]">
            Welcome Back
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
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

            <div className="mb-8">
              <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-[#A79B8D] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8AA896] focus:border-transparent transition-all duration-200"
                placeholder="Enter your password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#D87C5A] text-white py-3 rounded-lg font-semibold hover:bg-[#C56947] transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md"
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                </div>
              ) : (
                'Login'
              )}
            </button>
          </form>

          <div className="mt-6 space-y-4 text-center">
            <p className="text-sm text-[#4A4A4A]">
              Don't have an account?{" "}
              <a href="/signup" className="text-[#8AA896] hover:text-[#769382] font-medium transition-colors duration-200">
                Sign up
              </a>
            </p>
            <p className="text-sm text-[#4A4A4D]">
              <a href="/registerRestaurant" className="text-[#8AA896] hover:text-[#769382] font-medium transition-colors duration-200">
                Register your restaurant
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
