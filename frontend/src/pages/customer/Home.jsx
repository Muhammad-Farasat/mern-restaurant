import React from 'react'
import Navbar from '../../components/layout/Navbar/Navbar'
import DisplayRestaurant from '../../components/restaurant/DisplayRestaurant'
import Logout from '../../components/comman/button/Logout'
import Hero from '../../components/layout/hero/Hero'
import QuickAccess from '../../components/layout/quickAccess/QuickAccess'
import AboutRestaurant from '../../components/layout/aboutRestaurant/AboutRestaurant'
import Testimonial from '../../components/layout/testimonial/Testimonial'
import Footer from '../../components/layout/footer/Footer'



const Home = () => {
  return (
    <>

      <Hero />
      <QuickAccess />
      <AboutRestaurant />
      <Testimonial />
      <Footer />

    </>
  )
}

export default Home