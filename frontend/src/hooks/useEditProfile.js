import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

function useEditProfile() {

    const [loading, setLoading] = useState(false)
    const backend_url = import.meta.env.VITE_BACKEND_URL

    const editProfile = async (formData) => {
        try {
            console.log(formData);
            
            setLoading(true)

            const response = await axios.post(`${backend_url}/api/edit-profile`, formData, { withCredentials: true })

            if (response.status === 200) {
                toast.success("Edited Successfully..!")
            }

        } catch (error) {
            toast.error("Can't Edit..!")
            console.log(error);
        } finally {
            setLoading(false)

        }
    }


    return { loading, editProfile }
}

export default useEditProfile