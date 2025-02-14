import axios from 'axios'
import React, { useEffect, useState } from 'react'

function useDisplayUser() {

    const [data, setData] = useState("")

    const displayUser = async() => {
        try {
            const response = await axios.get("http://localhost:4000/user-details", {withCredentials: true})

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