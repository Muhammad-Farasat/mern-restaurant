import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'

function useAddFood() {

    const [loading, setLoading] = useState(false)
    const backend_url = import.meta.env.VITE_BACKEND_URL

    const addFood = async({foodData}) => {
        try {
            setLoading(true)

            const formData = new FormData()
            formData.append("image", foodData.image)

            const restaurantData = Cookies.get('restaurant-user')
            const user = restaurantData ? JSON.parse(restaurantData) : null

           
            const imageUrl = await axios.post(`${backend_url}/upload`, formData)
           
            console.log(imageUrl);
           
            if (!imageUrl.data.image_url) {
                throw new Error("Error in uploading image", error)
            }

            const foodDetails = {...foodData, restaurantId: user._id, image: imageUrl.data.image_url}

            const response = await axios.post(`${backend_url}/api/addFood`, foodDetails, {withCredentials: true})

            console.log(response.data.data);

            toast.success('Hurray added')

        } catch (error) {
            console.error(error);
            toast.error("Error while adding")
        }finally{
            setLoading(false)
        }
    }


  return {loading, addFood}
}

export default useAddFood