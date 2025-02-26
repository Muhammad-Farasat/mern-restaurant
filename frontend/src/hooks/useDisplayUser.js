import axios from 'axios'
import React, { useEffect, useState } from 'react'

function useDisplayUser() {

    const [data, setData] = useState("")
    const [loading, setLoading] = useState(false)
    const backend_url = import.meta.env.VITE_BACKEND_URL

    const displayUser = async() => {
        try {
            setLoading(true)
            
            const response = await axios.get(`/api/user-details`, {withCredentials: true})
            
            if (response.status === 200) {
                setData(response.data.user)            
            }

        } catch (error) {
         console.log(error);
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        displayUser()        
    },[])


  return { data, loading }
}

export default useDisplayUser