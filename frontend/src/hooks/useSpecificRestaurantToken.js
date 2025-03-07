import React, { useEffect, useState } from 'react'
import axios from 'axios'

function useSpecificRestaurantToken(id) {

  const [restaurantDetails, setRestaurantDetails] = useState()
  const [loading, setLoading] = useState(false)
  const backend_url = import.meta.env.VITE_BACKEND_URL

  const specificRestaurant = async() => {
    try {
    
      setLoading(true)
      const response = await axios.get(`${backend_url}/api/restaurant-by-token`, {withCredentials: true})
      setRestaurantDetails(response.data.restaurant)
      
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  }
  
  useEffect(()=>{
    specificRestaurant()    
  },[])
  
  return {restaurantDetails, loading}
}

export default useSpecificRestaurantToken