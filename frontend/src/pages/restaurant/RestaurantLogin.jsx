import React, { useState } from "react";
import useRestaurantLogin from "../../hooks/auth/restaurant/useRestaurantLogin";

const RestaurantLogin = () => {

  const [data, setData] = useState({ email: "", password: "" });

  const { loading, login } = useRestaurantLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ data });
  };

  const isFormFilled = () => {
    return(
      data.email.trim() !== "" &&
      data.password.trim() !== ""
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F5F0E6]">
      
      <div className="w-full max-w-md p-8 max-sm:px-3 max-sm:py-8 bg-white rounded-xl shadow-lg border border-[#E0E3E6]">
        
        <h2 className="mb-8 text-3xl max-sm:text-2xl font-[Nunito-ExtraBold] text-center text-[#2A3B4D]">
          Restaurant Login
        </h2>

        <form onSubmit={handleSubmit} action="">

          {/* Email Input */}
          <div className="mb-6">
           
            <label className="block mb-3 max-sm:text-sm font-[Nunito-Bold] text-[#4A4A4A]">
              Email
            </label>
           
            <input
              type="email"
              className="w-full px-4 py-3 max-sm:px-3 border border-[#A79B8D] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8AA896] focus:border-transparent transition-all"
              placeholder="Enter your email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
            />
          
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block mb-3 max-sm:text-sm font-[Nunito-Bold] text-[#4A4A4A]">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 max-sm:px-3 py-3 border border-[#A79B8D] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8AA896] focus:border-transparent transition-all"
              placeholder="Enter your password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={!isFormFilled()}
            className={`w-full px-4 py-3 max-sm:py-2 font-[Nunito-Bold] text-white rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-md ${isFormFilled() ? 'bg-[#D87C5A] hover:bg-[#C56947]' : 'bg-[#997061] cursor-not-allowed ' } `}
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



        {/* Sign Up Link */}
        <div className="text-center space-y-2 mt-4">
          <p className="text-[#4A4A4A] max-sm:text-sm ">
            Don't have an account?{" "}
            <a
              href="/registerRestaurant"
              className="text-[#8AA896] hover:text-[#769382] font-[Nunito-Bold]"
            >
              Sign Up
            </a>
          </p>
          {/* Divider */}
        </div>
        
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
      
      </div>
      
    </div>
  );
};

export default RestaurantLogin;
