import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";
import useDisplayUser from "../../hooks/useDisplayUser";

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

  const { data } = useDisplayUser()


  return (
    <>
      <nav className="flex items-center justify-between bg-[#2A3B4D] px-6 py-3 shadow-xl text-white">

        <div className="text-2xl font-bold text-[#F5F0E6]">
          {userType === "customer" ?
            ' ZenBites' : (rUser?.name || null)
          }
        </div>

        {userType === "customer" && (
          <div className="text-center mx-4 max-sm:hidden ">
            <p className="text-sm md:text-base text-[#E8B7A3] truncate max-w-[200px] md:max-w-[400px]">
              📍 {data.location}
            </p>
          </div>
        )}

        <ProfileDropdown />

      </nav>
    </>
  );
};

export default Navbar;
