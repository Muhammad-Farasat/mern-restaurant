import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'

function useRestaurantSignup() {

    const [loading, setLoading] = useState(false)
    const backend_url = import.meta.env.VITE_BACKEND_URL

    const restaurantSignup = async({data}) => {
        try {
            setLoading(true)
            
            const formData = new FormData()
            formData.append("image", data.image)

            const imgUrl = await axios.post(`/api/upload`, formData)

            // console.log(imgUrl);
            if (!imgUrl.data.image_url) {
                throw new Error("Image upload failed")
            }

            const restaurantData = {...data, image: imgUrl.data.image_url}

            const response = await axios.post(`/api/registerRestaurant`, restaurantData, {withCredentials: true})

            if (response.status === 200) {
                console.log(response);
                const restaurantUser = response.data.restaurant
                const cookie =  Cookies.set('restaurant-user', JSON.stringify(restaurantUser), {expiresIn: '1d'})
                const data = JSON.parse(Cookies.get(cookie))
                const id = data._id
                window.location.replace(`/RestaurantHome/${id}`)
            }

        } catch (error) {
            toast.error("Can't sign up") 
            console.log(error);           
        }finally{
            setLoading(false)
        }
    }

    
  return {loading, restaurantSignup}
}

export default useRestaurantSignup