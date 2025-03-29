import React, { useState } from 'react'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'
import axios from 'axios'

function useUpdateDish() {
    const [loading, setLoading] = useState(false)
    const backend_url = import.meta.env.VITE_BACKEND_URL

    const updateFood = async (foodData) => {
        try {
            setLoading(true)
            console.log(foodData);
            
            const formData = new FormData()
            let imageUrl = foodData.image; 

            if (foodData.image instanceof File) {
                formData.append("image", foodData.image)

                const imageResponse = await axios.post(`${backend_url}/api/upload`, formData)
                console.log("Image Upload Response:", imageResponse.data)

                if (!imageResponse.data.image_url) {
                    throw new Error("Error uploading image")
                }

                imageUrl = imageResponse.data.image_url 
            }


            const foodDetails = {
                ...foodData,
                image: imageUrl, 
            }

            console.log("Updating Food with Data:", foodDetails) 

            const response = await axios.post(`${backend_url}/api/updateFood`, foodDetails, {
                withCredentials: true
            })

            if (response.status === 200) {
                toast.success("Food updated successfully!")
            }


        } catch (error) {
            toast.error("Error while updating food")
            console.error("Update Error:", error.response?.data || error.message)
        } finally {
            setLoading(false)
        }
    }

    return { updateFood, loading }
}

export default useUpdateDish
