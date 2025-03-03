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

            
            const imageUrl = await axios.post(`/api/upload`, formData)
           
            console.log(imageUrl);
           
            if (!imageUrl.data.image_url) {
                throw new Error("Error in uploading image", error)
            }

            const foodDetails = {...foodData, image: imageUrl.data.image_url}

            const response = await axios.post(`/api/addFood`, foodDetails, {withCredentials: true})

            if (response.status === 200) {
                toast.success('Hurray added')                
            }

            return response

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