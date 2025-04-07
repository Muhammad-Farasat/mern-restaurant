import React from 'react'
import Navbar from '../../components/layout/Navbar/Navbar'
import DisplayRestaurant from '../../components/restaurant/DisplayRestaurant'
import Logout from '../../components/comman/button/Logout'
import Hero from '../../components/layout/hero/Hero'
import QuickAccess from '../../components/layout/quickAccess/QuickAccess'



const Home = () => {
  return (
    <>
      {/* <Navbar />
      <DisplayRestaurant /> */}

        <Hero />
        <QuickAccess />

        
        {/* <Logout /> */}

    </>
  )
}

export default Home