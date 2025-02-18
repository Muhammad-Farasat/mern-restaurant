import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Cookies from 'js-cookie'

function useLogout() {

  const [loading, setLoading] = useState(false)
  const backend_url = import.meta.env.VITE_BACKEND_URL

  const logout = async() => {
      try {
        setLoading(true)

        await axios.post(`${backend_url}/api/logout`,  {withCredentials: true})

        Cookies.remove('authorization')
        Cookies.remove('user-data')

        window.location.replace('/login')

      } catch (error) {
        console.log(error);
        toast.error("Can't logout")
      }
  }

  return {loading, logout}
}

export default useLogout