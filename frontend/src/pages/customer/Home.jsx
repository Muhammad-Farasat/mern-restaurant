import React from 'react'
import Navbar from '../../components/layout/Navbar/Navbar'
import DisplayRestaurant from '../../components/restaurant/DisplayRestaurant'
import Logout from '../../components/comman/button/Logout'
import Hero from '../../components/layout/hero/Hero'
import QuickAccess from '../../components/layout/quickAccess/QuickAccess'
import AboutRestaurant from '../../components/layout/aboutRestaurant/AboutRestaurant'
import WallOfLove from '../../components/layout/wallOfLove/WallOfLove'



const Home = () => {
  return (
    <>
      {/* <Navbar />
      <DisplayRestaurant /> */}

        <Hero />
        <QuickAccess />
        <AboutRestaurant />
        <WallOfLove />
        
        {/* <Logout /> */}

    </>
  )
}

export default Home