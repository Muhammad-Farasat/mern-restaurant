import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";
import useDisplayUser from "../../hooks/useDisplayUser";
import { useParams } from "react-router-dom";
import useSpecificRestaurantToken from "../../hooks/useSpecificRestaurantToken";




const Navbar = () => {

  const {id} = useParams()

  // Cookies checking
  const userData = Cookies.get("authorization");
  const restaurantData = Cookies.get("restaurant-auth");

  const [userType, setUserType] = useState("");

  const { data } = useDisplayUser()
  const {restaurantDetails} = useSpecificRestaurantToken(id)

  useEffect(() => {
    if (!userData) {
      setUserType("restaurant");
    } else if (!restaurantData) {
      setUserType("customer");
    }
  }, []);



  return (
    <>
      <nav className="flex items-center justify-between bg-[#2A3B4D] px-6 py-3 shadow-xl text-white">

        <div className="text-2xl font-[Nunito-ExtraBold] text-[#F5F0E6]">
          {userType === "customer" ?
            ' ZenBites' : (restaurantDetails?.name || null)
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
