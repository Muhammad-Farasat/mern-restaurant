import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

function useDisplayDish(id) {

    const [dishesDisplay, setDishesDisplay] = useState([])
    const [loading, setLoading] = useState(false)

    const dishes = async() =>{
        try {
            setLoading(true)

            const response = await axios.get(`/getFoods?restaurantId=${id}`, {withCredentials: true})

            
            if (response.status === 200) {
                setDishesDisplay(response.data.foods)
            }
            console.log(response.data.foods);

        } catch (error) {
            toast.error("Can't bring dishes")
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