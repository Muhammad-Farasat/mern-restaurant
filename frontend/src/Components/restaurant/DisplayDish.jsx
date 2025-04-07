import React from "react";
import useDisplayFood from "../../hooks/useRestaurantData";
import FoodCard from "../cards/FoodCard";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const DisplayDish = () => {

  const restaurantId = useParams()

  // const { dishesDisplay, loading } = useDisplayFood(restaurantId);

  const { dishesDisplay, loading } = useSelector((state) => state.food)

  return (
    <>
      <section className="w-full h-full flex justify-center  ">
        <div className="container">
          <h1 className="text-4xl text-center font-[Nunito-ExtraBold] mt-8 mb-6 ">Food List</h1>

          {loading && <p>Loading...</p>}

          <div className="grid grid-cols-3">

            {dishesDisplay.map((dish) => (

              <div className="p-2">

                <FoodCard
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
