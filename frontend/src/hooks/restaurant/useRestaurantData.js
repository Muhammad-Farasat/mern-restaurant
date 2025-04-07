import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function useRestaurantData() {

    const [displayRestaurant, setDisplayRestaurant] = useState([])
    const [loading, setLoading] = useState(false)
    const backend_url = import.meta.env.VITE_BACKEND_URL

    const restaurant = async() =>{
        try {
            setLoading(true)

            const response = await axios.get(`${backend_url}/api/allRestaurant`, {withCredentials: true})

            if (response.status === 200) {
                setDisplayRestaurant(response.data.restaurant)
            }
            
        } catch (error) {
            toast.error("Can't bring restaurant")
            console.log(error);
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        restaurant()
    },[])

  return {restaurant, displayRestaurant}
}

export default useRestaurantData