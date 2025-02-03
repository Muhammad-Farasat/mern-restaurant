import React, { useEffect } from "react";
import useDisplayDish from "../../Hooks/useDisplayRestaurant";
import Card from "../Card/Card";

const DisplayDish = () => {
  const { dishesDisplay, loading } = useDisplayDish();

  return (
    <>
      <section className="w-full h-full flex justify-center  ">
        <div className="container">
        <h1 className="text-4xl text-center font-bold mt-8 mb-6 ">Food List</h1>
        {loading && <p>Loading...</p>}
        <div className="grid grid-cols-3">
        {dishesDisplay.map((dish, index) => (
          <div className="p-2">
            <Card
              key={index}
              name={dish.name}
              image={dish.image}
              description={dish.description}
              price={dish.price}
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
