import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

function useResendEmail() {

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const backend_url = import.meta.env.VITE_BACKEND_URL

    const resendVerificationEmail = async (email) => {
        try {
            setLoading(true)

            const response = await axios.post(`${backend_url}/api/resend-verification-email`, { email })

            if (response.status === 200) {
                setSuccess(response.data.message)
                toast.success("Email has been resend!")
            }


        } catch (error) {
            console.log(error);
            toast.error("Problem while resending")
        } finally {
            setLoading(false)
        }
    }

      return {success, resendVerificationEmail, loading}
}

export default useResendEmail