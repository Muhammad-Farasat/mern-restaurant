import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../redux/cartSlice";
import Cart from "../../components/Cart/Cart";
import useRestaurant from "../../hooks/restaurant/useRestaurant";
import useDisplayFood from "../../hooks/dish/useDisplayFood";
import FoodCard from "../../components/cards/FoodCard";
import Footer from "../../components/layout/footer/Footer"

const SpecificRestaurant = () => {


  const { id } = useParams();
  const dispatch = useDispatch();
  const { oneRestaurant } = useRestaurant(id);
  const { dishesDisplay, loading } = useSelector((state)=> state.food)
  useDisplayFood(id);


  useEffect(() => {
    dispatch(removeFromCart());
  }, [id, dispatch]);


  return (
    <>
      
      <div className="min-h-screen bg-[#F5F0E6]">

        {/* Banner Section */}
        <div className="relative h-96 w-full">
          <img
            src={oneRestaurant?.image}
            alt="Restaurant Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#2A3B4D]/70 flex items-center justify-center">
            <h1 className="text-3xl md:text-5xl font-[Nunito-ExtraBold] text-[#F5F0E6] text-center px-4">
              {oneRestaurant?.name}
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto px-4 py-10">
          {/* Dishes Section */}
          <div className="flex-1">
            <h2 className="text-3xl font-[Nunito-ExtraBold] text-[#2A3B4D] mb-8">Our Menu</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {dishesDisplay?.map((dish) => (
                <FoodCard
                  key={dish._id}
                  id={id}
                  foodId={dish._id}
                  name={dish.name}
                  description={dish.description}
                  image={dish.image}
                  price={dish.price}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
              ))}
            </div>
          </div>

          {/* Cart Section */}
          <div className="w-full lg:w-96">
            <div className="sticky top-4">
              <Cart />
            </div>
          </div>
        </div>
      </div>

      <Footer />

    </>
  );
};

export default SpecificRestaurant;
