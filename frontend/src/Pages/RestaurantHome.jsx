import React from "react";
import useDisplayDish from "../hooks/useDisplayDish";
import Navbar from "../Components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import Card from '../Components/Card/Card'

const RestaurantHome = () => {
  
  const {id} = useParams()

  const { dishesDisplay } = useDisplayDish(id);


  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 px-6 py-8">
        {/* Food Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {dishesDisplay?.map((item) => (
            <Card key={item._id} foodId={item._id} price={item.price} name={item.name} description={item.description} image={item.image} />
          ))}
        </div>
      </div>
    </>
  );
};

export default RestaurantHome;
