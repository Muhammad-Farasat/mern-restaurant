import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useSelector, useDispatch } from 'react-redux'
import { setDishes } from '../../redux/foodSlice'

function useDisplayDish(id) {

    // const [dishesDisplay, setDishesDisplay] = useState([])
    
    // const { dishesDisplay } = useSelector((state) => state.food)
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const backend_url = import.meta.env.VITE_BACKEND_URL

    const dishes = async() =>{
        try {
            setLoading(true)

            const response = await axios.get(`${backend_url}/api/getFoods?restaurantId=${id}`, {withCredentials: true})

            
            if (response.status === 200) {
                dispatch(setDishes(response.data.foods))
            }

        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false)
        }
    }

    // const removeDish = (foodId) => {
    //     setDishesDisplay(dishesDisplay.filter())
    // }

    // const addDish = (newDish) => {
    //     setDishesDisplay([...dishesDisplay, newDish]);
    // };

    useEffect(()=>{
        dishes()
    },[id])

//   return {dishesDisplay, loading}
}

export default useDisplayDish