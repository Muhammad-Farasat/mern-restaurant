import React from "react";
import { useSelector } from "react-redux";
import useDisplayFood from "../../hooks/dish/useDisplayFood";
import Navbar from "../../components/layout/Navbar/Navbar";
import FoodCard from '../../components/cards/FoodCard'
import  useRestaurantByToken  from "../../hooks/restaurant/useRestaurantByToken";

const RestaurantHome = () => {

  const { restaurantDetails, loading } =  useRestaurantByToken ()

  const id = restaurantDetails?._id

  const { dishesDisplay, loading: loadingOfDish } = useSelector((state) => state.food);

  useDisplayFood(id)

  if (loading) {
    return <>
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
      </div>
    </>
  }


  return (
    <>
      <Navbar />

      <div className="min-h-screen px-6 py-8">

        {/* Food Items Grid */}

        {
          loadingOfDish ?

            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
            </div> :

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

              {dishesDisplay?.map((item) => (
                console.log(dishesDisplay),
                
                < FoodCard key={item._id} foodId={item._id} price={item.price} name={item.name} description={item.description} image={item.image} />
              ))}

            </div>
        }


      </div>
    </>
  );
};

export default RestaurantHome;
