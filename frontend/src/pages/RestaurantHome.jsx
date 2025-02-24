import React, { useState } from "react";
import useDisplayDish from "../hooks/useDisplayDish";
import Navbar from "../Components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import Card from '../Components/Card/Card'
import useSpecificRestaurantToken from "../hooks/useSpecificRestaurantToken";

const RestaurantHome = () => {

  const { restaurantDetails, loading } = useSpecificRestaurantToken()

  const id = restaurantDetails?._id
  console.log(id);

  const { dishesDisplay, loading: loadingOfDish } = useDisplayDish(id);

  if (loading) {
    return <>
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
      </div>
    </>
  }


  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 px-6 py-8">

        {/* Food Items Grid */}

        {
          loadingOfDish ?
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            </div> :
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

              {dishesDisplay?.map((item) => (
                <Card key={item._id} foodId={item._id} price={item.price} name={item.name} description={item.description} image={item.image} />
              ))}

            </div>
        }


      </div>
    </>
  );
};

export default RestaurantHome;
