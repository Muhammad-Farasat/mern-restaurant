import React, { useEffect } from "react";
import useDisplayDish from "../../Hooks/useDisplayRestaurant";
import Card from "../Card/Card";
import { useParams } from "react-router-dom";

const DisplayDish = () => {

  const restaurantId = useParams()

  const { dishesDisplay, loading } = useDisplayDish(restaurantId);
// console.log(dishesDisplay);
  return (
    <>
      <section className="w-full h-full flex justify-center  ">
        <div className="container">
        <h1 className="text-4xl text-center font-bold mt-8 mb-6 ">Food List</h1>
        {loading && <p>Loading...</p>}
        <div className="grid grid-cols-3">
        {dishesDisplay.map((dish) => (
          <div className="p-2">
            <Card
              key={dish._id}
              name={dish.name}
              image={dish.image}
              description={dish.description}
              price={dish.price}
              id={dish._id}
              restaurantId={dish.restaurantId}
            />
          </div>
        ))}
          
        </div>

        </div>
      </section>
    </>
  );
};

export default DisplayDish;
