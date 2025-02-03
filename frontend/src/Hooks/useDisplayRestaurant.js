import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function useDisplayRestaurant() {

    const [displayRestaurant, setDisplayRestaurant] = useState([])
    const [loading, setLoading] = useState(false)

    const restaurant = async() =>{
        try {
            setLoading(true)

            const response = await axios.get('http://localhost:3000/allRestaurant', {withCredentials: true})

            console.log(response.data);

            if (response.status === 200) {
                setDisplayRestaurant(response.data.restaurant)
            }
            
        } catch (error) {
            toast.error("Can't bring restaurant")
            console.log(error);
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        restaurant()
    },[])

  return {restaurant, displayRestaurant}
}

export default useDisplayRestaurant