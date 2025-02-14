import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'


function useSignup() {

    const [loading, setLoading] = useState(false)

    const signup = async ({ data }) => {
        try {
            setLoading(true)

            const response = await axios.post('http://localhost:4000/signup', data, { withCredentials: true })

            if (response.status === 200) {
                
                console.log(response);
                const userData = response.data.user

                console.log(response.data.user);
                Cookies.set('user-data', JSON.stringify(userData), { expiresIn: '1d' })

                window.location.replace('/')
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