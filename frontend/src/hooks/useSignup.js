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

            const response = await axios.post(`/api/signup`, data, { withCredentials: true })

            if (response.status === 200) {
                
                console.log(response);
                const userData = response.data.user

                console.log(userData);

                localStorage.setItem("user-email", userData.email);

                window.location.replace('/check-email')
            }

        } catch (error) {
            toast.error("Couldn't signup")
        } finally {
            setLoading(false)
        }
    }

    return { loading, signup }
}

export default useSignup