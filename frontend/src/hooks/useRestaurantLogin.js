import React, { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import Cookies from 'js-cookie'

function useRestaurantLogin() {

    const [loading, setLoading] = useState(false)
    const backend_url = import.meta.env.VITE_BACKEND_URL

    const login = async({data}) =>{
        try {
            
            setLoading(true)

            const response = await axios.post(`${backend_url}/loginRestaurant`, data, {withCredentials: true})

            // console.log(response.data.restaurant);

            if (response.status === 200) {
                const restaurantUser = response.data.restaurant
                Cookies.set('restaurant-user', JSON.stringify(restaurantUser), {expiresIn: '1d'})
                window.location.replace(`/RestaurantHome/${restaurantUser._id}`)
            }

        } catch (error) {
            console.error(error);
            toast.error("Can't login")
        }finally{
            setLoading(false)
        }
    }


  return {loading, login}
}

export default useRestaurantLogin