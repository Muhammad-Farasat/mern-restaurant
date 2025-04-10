import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IoNavigate } from "react-icons/io5";



function QuickAccessItem({ heading, image }) {

    const nav = useNavigate()

    const handleNavigation = async () => {


        const routes = {
            "RESTAURANTS": "/all-restaurant",
            "EDIT PROFILE": "/edit-profile",
            "ORDER TRACKING": "/order-tracking"

        }

        nav(routes[heading] || "/")
    }

    return (
        <>

            <div
                onClick={handleNavigation}
                className=' cursor-pointer w-full h-full overflow-y-hidden border-[#BDD0A0] border-r-3 bg-[#BDD0A0] max-sm:border-r-0 max-sm:h-[100vh] max-md:border-r-0 max-md:h-[100vh] max-lg:border-r-0 max-lg:h-[100vh] '
            >

                <div className='  w-full h-32 bg-[#004632] text-[#BDD0A0] border-[#BDD0A0] border-y-3 transition-all duration-300 flex justify-center gap-x-8 items-center text-4xl tracking-wider hover:font-bold hover:gap-x-12 hover:bg-[#BDD0A0] hover:text-[#004632] max-sm:text-3xl max-sm:border-b-4 max-sm:border-[#BDD0A0] max-md:border-b-4 max-md:border-[#BDD0A0] max-lg:border-b-4 max-lg:border-[#BDD0A0] '>

                    <p>{heading}</p>

                    <IoNavigate />

                </div>

                <div className=' relative h-full  '>

                    <div className='bg-[#111] opacity-50 absolute top-0 w-full h-full '></div>

                    <img src={image} alt="" className=' object-cover h-full max-md:w-full max-lg:w-full ' />

                </div>


            </div>

        </>
    )
}

export default QuickAccessItem