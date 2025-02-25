import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'

function useLogin() {

    const [loading, setLoading] = useState(false)
    const backend_url = import.meta.env.VITE_BACKEND_URL

    const login = async ({ data }) => {
        try {
            setLoading(true)

            const resposne = await axios.post(`/api/login`, data, { withCredentials: true })
            console.log(resposne);

            if (resposne.status === 200) {
                toast.success("Logged In")
                window.location.replace('/')
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

    return { loading, login }
}

export default useLogin