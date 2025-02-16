import React, {useState} from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from 'js-cookie'

function useRestaurantLogout() {
  const [loading, setLoading] = useState(false);
  const backend_url = process.env.FRONTEND_URL

  const restaurantLogout = async () => {
    try {
      setLoading(true);

      await axios.post(`${backend_url}/removeRestaurant`, {
        withCredentials: true,
      });

      Cookies.remove("restaurant-auth");
      Cookies.remove("restaurant-user");

      window.location.replace("/loginRestaurant");
    } catch (error) {
      console.log(error);
      toast.error("Can't logout");
    }finally{
      setLoading(false)
    }
  };

  return { restaurantLogout, loading };
}

export default useRestaurantLogout;
