import React, { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import Cookies from 'js-cookie'

function useRestaurantLogin() {

    const [loading, setLoading] = useState(false)
    const backend_url = import.meta.env.VITE_BACKEND_URL

    const login = async ({ data }) => {
        try {

            setLoading(true)

            const response = await axios.post(`/api/loginRestaurant`, data, { withCredentials: true })
            
            if (response.status === 200) {
                window.location.replace('/RestaurantHome');
            }

        } catch (error) {

            let errorMessage = "Something went wrong"
            if (error.response) {
                errorMessage = error.response.data?.message || "An unexpected error occurred";
            }

            toast.error(errorMessage)
            console.error(error);

        } finally {
            setLoading(false)
        }
    }


    return { loading, login }
}

export default useRestaurantLogin