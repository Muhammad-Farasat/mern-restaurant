import axios from 'axios'
import React, { useEffect, useState } from 'react'

function useDisplayUser() {

    const [data, setData] = useState("")
    const backend_url = import.meta.env.VITE_BACKEND_URL

    const displayUser = async() => {
        try {
            const response = await axios.get(`${backend_url}/user-details`, {withCredentials: true})

            setData(response.data.user)

        } catch (error) {
         console.log(error);
            
        }
    }

    useEffect(()=>{
        displayUser()
    },[])

  return {data}
}

export default useDisplayUser