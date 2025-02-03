import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import DisplayRestaurant from '../Components/DisplayRestaurant/DisplayRestaurant'
import DisplayDish from '../Components/DisplayDish/DisplayDish'

const Home = () => {
  return (
    <>
      <Navbar />
      <DisplayRestaurant />
      {/* <DisplayDish /> */}
    </>
  )
}

export default Home