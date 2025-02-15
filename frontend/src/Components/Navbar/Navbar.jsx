import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import useAddFood from "../../Hooks/useAddFood";
import { useNavigate } from 'react-router-dom'
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";
import useDisplayUser from "../../Hooks/useDisplayUser";

const Navbar = () => {

  const userData = Cookies.get("user-data");
  const user = userData ? JSON.parse(userData) : null;

  const restaurantData = Cookies.get("restaurant-user");
  const rUser = restaurantData ? JSON.parse(restaurantData) : null;

  const [userType, setUserType] = useState("");


  useEffect(() => {
    if (user !== null) {
      setUserType("customer");
    } else if (rUser !== null) {
      setUserType("restaurant");
    }
  }, []);

  



 

  const [foodData, setFoodData] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
    restaurantId: null,
    foodId: null,
  }); 

  const {data} = useDisplayUser()
  

  return (
    <>
      <nav className="flex items-center justify-between bg-[#2A3B4D] px-6 py-3 shadow-xl text-white">
        {/* Logo Section */}
        <div className="text-2xl font-bold text-[#F5F0E6]">
          {userType === "customer" ?
            'MyApp' : (rUser?.name || null)
          }
        </div>

        {/* User Address Section */}
        {userType === "customer" && (
          <div className="text-center flex-grow mx-4 max-sm:hidden ">
            <p className="text-sm md:text-base text-[#E8B7A3] truncate max-w-[200px] md:max-w-[400px]">
              📍 {data.location}
            </p>
          </div>
        )}

          <ProfileDropdown />


        {/* Action Buttons */}
        {/* <div className="flex items-center gap-4">
          {userType === "restaurant" ? (
            
          ) : (
           null 
          )}
        </div> */}
      </nav>

      

      
    </>
  );
};

export default Navbar;
