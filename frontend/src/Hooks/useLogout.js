import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

function useLogout() {

  const [loading, setLoading] = useState(false)

  const logout = async() => {
      try {
        setLoading(true)

        await axios.post('http://localhost:3000/logout', {withCredentials: true})

        window.location.replace('/login')

      } catch (error) {
        console.log(error);
        toast.error("Can't logout")
      }
  }

  return {loading, logout}
}

export default useLogout