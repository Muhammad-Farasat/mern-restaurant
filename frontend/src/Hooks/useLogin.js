import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'

function useLogin() {

    const [loading, setLoading] = useState(false)
    const backend_url = import.meta.env.VITE_BACKEND_URL

    const login = async({data}) => {
        try {
            setLoading(true)

            const resposne = await axios.post(`${backend_url}/login`, data, {withCredentials: true})
            // console.log(resposne);
            
            if (resposne.status === 200) {
                toast.success("Logged In")

                const userData = resposne.data.user

                console.log(resposne.data.user);
                Cookies.set('user-data', JSON.stringify(userData), {expiresIn: '1d'})

                window.location.replace('/')
            }
            

        } catch (error) {
            toast.error("Can't login")
            console.log(error);
        }finally{
            setLoading(false)
        }
    }

  return {loading, login}
}

export default useLogin