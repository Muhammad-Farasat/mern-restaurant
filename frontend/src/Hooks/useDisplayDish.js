import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

function useDisplayDish() {

    const [dishesDisplay, setDishesDisplay] = useState([])
    const [loading, setLoading] = useState(false)

    const dishes = async() =>{
        try {
            setLoading(true)

            const response = await axios.get('http://localhost:3000/getFoods', {withCredentials: true})

            console.log(response);

            if (response.status === 200) {
                setDishesDisplay(response.data.foods)
            }

        } catch (error) {
            toast.error("Can't bring dishes")
            console.log(error);
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        dishes()
    },[])

  return {dishes, dishesDisplay, loading}
}

export default useDisplayDish