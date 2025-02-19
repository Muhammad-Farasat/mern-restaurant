import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

function useSpecificRestaurant(id) {

  const [oneRestaurant, setOneRestaurant] = useState()
  const [loading, setLoading] = useState(false)
  const backend_url = import.meta.env.VITE_BACKEND_URL

  const specificRestaurant = async() => {
    try {
    
      setLoading(true)
      const response = await axios.get(`/api/specificRestaurant/${id}`)
      setOneRestaurant(response.data.restaurant)
    
    } catch (error) {
      toast.error("Can't bring")
      console.log(error);
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    specificRestaurant()
  },[])

  return {oneRestaurant, loading}
}

export default useSpecificRestaurant