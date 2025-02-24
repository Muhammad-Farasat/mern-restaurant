import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

function useDisplayDish(id) {

    const [dishesDisplay, setDishesDisplay] = useState([])
    const [loading, setLoading] = useState(false)
    const backend_url = import.meta.env.VITE_BACKEND_URL

    const dishes = async() =>{
        try {
            setLoading(true)

            const response = await axios.get(`/api/getFoods?restaurantId=${id}`, {withCredentials: true})

            
            if (response.status === 200) {
                setDishesDisplay(response.data.foods)
            }

        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        dishes()
    },[id])

  return {dishesDisplay, loading}
}

export default useDisplayDish