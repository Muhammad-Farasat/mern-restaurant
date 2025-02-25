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

  const isFormFilled = () => {
    return(
      data.email.trim() !== "" &&
      data.password.trim() !== ""
    );
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-[#F5F0E6] bg-[url(/Images/bg-image.png)] bg-repeat bg-contain overflow-hidden ">
        <div className="bg-[#ffffff93] backdrop-blur-xs   p-8 max-sm:p-3 max-sm:py-8 rounded-2xl shadow-lg w-full max-w-md border border-[#E0E3E6]">
          <h2 className="text-3xl font-[Nunito-ExtraBold] text-center mb-8 text-[#2A3B4D]">
            Welcome Back
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block max-sm:text-sm font-[Nunito-Bold] text-[#4A4A4A] mb-2">
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
              <label className="block max-sm:text-sm font-[Nunito-Bold] text-[#4A4A4A] mb-2">
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
              disabled={!isFormFilled()}
              className={`w-full text-white py-3 rounded-lg text-lg font-[Nunito-ExtraBold] tracking-wide transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md ${isFormFilled() ? 'bg-[#D87C5A] hover:bg-[#C56947]' : 'bg-[#997061] cursor-not-allowed ' } `}
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
            <p className="max-sm:text-sm text-[#4A4A4A]">
              Don't have an account?{" "}
              <a href="/signup" className="text-[#8AA896] hover:text-[#769382] font-[Nunito-Bold] transition-colors duration-200">
                Sign up
              </a>
            </p>
            <p className="text-sm text-[#4A4A4D]">
              <a href="/registerRestaurant" className="text-[#8AA896] hover:text-[#769382] font-[Nunito-Bold] transition-colors duration-200">
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
