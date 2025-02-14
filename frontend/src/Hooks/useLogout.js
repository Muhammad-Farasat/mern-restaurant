import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Cookies from 'js-cookie'

function useLogout() {

  const [loading, setLoading] = useState(false)

  const logout = async() => {
      try {
        setLoading(true)

        await axios.post('http://localhost:4000/logout',  {withCredentials: true})

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