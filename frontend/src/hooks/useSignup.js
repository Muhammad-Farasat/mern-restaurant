import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'


function useSignup() {

    const [loading, setLoading] = useState(false)
    const backend_url = import.meta.env.VITE_BACKEND_URL

    const signup = async ({ data }) => {
        try {
            setLoading(true)

            const response = await axios.post(`${backend_url}/api/signup`, data, { withCredentials: true })

            if (response.status === 200) {
                const userData = response.data.user

                localStorage.setItem("user-email", userData.email);

                window.location.replace('/check-email')
            }

        } catch (error) {
            
            let errorMessage = "Something went wrong"
            if (error.response) {
                errorMessage = error.response.data?.message || "An unexpected error occurred";
            }

            toast.error(errorMessage)
            console.log(error);
            
        } finally {
            setLoading(false)
        }
    }

    return { loading, signup }
}

export default useSignup