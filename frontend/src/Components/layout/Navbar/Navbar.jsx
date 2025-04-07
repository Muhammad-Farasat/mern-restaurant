import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import ProfileDropdown from "./ProfileDropdown";
import useUserProfile from "../../../hooks/user/useUserProfile";
import  useRestaurantByToken  from "../../../hooks/restaurant/useRestaurantByToken";
import { Player } from "@lordicon/react";
import Location from "../../../../public/Icon/Location.json";

const Navbar = () => {
  const userData = Cookies.get("authorization");
  const restaurantData = Cookies.get("restaurant-auth");

  const [userType, setUserType] = useState("");

  const { data, loading: userLoading } = useUserProfile();
  const { restaurantDetails, loading: restaurantLoading } =  useRestaurantByToken ();

  const playerRef = useRef(null);

  useEffect(() => {
    if (!userData) {
      setUserType("restaurant");
    } else if (!restaurantData) {
      setUserType("customer");
    }
    // Removed the play() call from here
  }, []);

  const id = restaurantDetails?._id;

  return (
    <>
      {userLoading || restaurantLoading ? (
        <div className="flex justify-center bg-transparent items-center">
          <div className="animate-spin rounded-full h-10 w-10 mt-10 border-b-2 border-black"></div>
        </div>
      ) : (
        <nav className="flex items-center justify-between bg-[#2A3B4D] px-6 py-3 shadow-xl text-white">
          <div className="text-2xl font-[Nunito-ExtraBold] text-[#F5F0E6]">
            {userType === "customer" ? "ZenBites" : restaurantDetails?.name || null}
          </div>

          {userType === "customer" && (
            <div className="text-center mx-4 flex items-center gap-x-2 max-sm:hidden">
              <Player
                ref={playerRef}
                icon={Location}
                colorize={"#E8B7A3"}
                onEvent={(e) => {
                  if (e === "ready" && playerRef.current) {
                    playerRef.current.play(); // Ensure play is called only when ready
                  }
                }}
                loop={true} // Ensure loop is a boolean
              />
              <p className="text-sm md:text-base text-[#E8B7A3] truncate max-w-[200px] md:max-w-[400px]">
                {data.location}
              </p>
            </div>
          )}

          <ProfileDropdown />
        </nav>
      )}
    </>
  );
};

export default Navbar;