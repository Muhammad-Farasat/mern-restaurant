import React, { useEffect, useState } from 'react'
import { IoExitOutline } from "react-icons/io5";

import useRestaurantLogout from "../../../hooks/auth/restaurant/useRestaurantLogout";
import Cookies from "js-cookie";
import useLogout from "../../../hooks/auth/customer/useLogout";


function Logout() {


    const [userType, setUserType] = useState("");

    // Checking cookies
    const userData = Cookies.get("authorization");
    const restaurantData = Cookies.get("restaurant-auth");

    useEffect(() => {
        if (!userData) {
            setUserType("restaurant");
        } else if (!restaurantData) {
            setUserType("customer");
        }
    }, []);

    const { loading, logout } = useLogout();

    const { restaurantLogout } = useRestaurantLogout();


    const handleLogout = async () => {
        userType === "customer" ? await logout() : await restaurantLogout();
    };


    return (
        <>
            <div>
                <p className=' max-sm:text-sm flex items-center gap-4 text-xl cursor-pointer hover:opacity-30 '>
                    Logout
      
                    <span>
      
                        <IoExitOutline />

                    </span>

                </p>
            </div>
        </>
    )
}

export default Logout