import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'


function useSignup() {
    
    const [loading, setLoading] = useState(false)

    const signup = async({data}) => {
        try {
            setLoading(true)

            const response = await axios.post('http://localhost:3000/signup', data, {withCredentials: true})

            if (response.status === 200) {
                console.log(response);
                window.location.replace('/')
                // toast.success("Signed up")
            }

        } catch (error) {
            toast.error("Couldn't signup")
        }finally{
            setLoading(false)
        }
    }

  return {loading, signup}
}

export default useSignup