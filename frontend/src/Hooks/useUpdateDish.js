import React, { useState } from 'react'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'
import axios from 'axios'

function useUpdateDish() {
    const [loading, setLoading] = useState(false)
    const backend_url = process.env.FRONTEND_URL

    const updateFood = async (foodData) => {
        try {
            setLoading(true)

            const formData = new FormData()
            let imageUrl = foodData.image; // Default to existing image

            if (foodData.image instanceof File) {
                formData.append("image", foodData.image)

                const imageResponse = await axios.post(`${backend_url}/upload`, formData)
                console.log("Image Upload Response:", imageResponse.data)

                if (!imageResponse.data.image_url) {
                    throw new Error("Error uploading image")
                }

                imageUrl = imageResponse.data.image_url 
            }

            const restaurantData = Cookies.get('restaurant-user')
            const user = restaurantData ? JSON.parse(restaurantData) : null

            if (!user) {
                throw new Error("User not found in cookies.")
            }

            const foodDetails = {
                ...foodData,
                restaurantId: user._id,
                image: imageUrl, 
            }

            console.log("Updating Food with Data:", foodDetails) // Debugging

            const response = await axios.post(`${backend_url}/updateFood`, foodDetails, {
                withCredentials: true
            })

            toast.success("Food updated successfully!")

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
