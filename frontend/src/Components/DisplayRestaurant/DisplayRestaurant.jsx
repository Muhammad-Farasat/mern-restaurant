import React from 'react'
import useDisplayRestaurant from '../../Hooks/useDisplayRestaurant'
import Card from '../Card/Card'

const DisplayRestaurant = () => {

    const {displayRestaurant, loading} = useDisplayRestaurant()

    console.log(displayRestaurant);

  return (
    <>
     <section className="w-full h-full flex justify-center  ">
        <div className="container">
        <h1 className="text-4xl text-center font-bold mt-8 mb-6 ">Restaurant List</h1>
        {loading && <p>Loading...</p>}
        <div className="grid grid-cols-3">
            {displayRestaurant.map((rest)=>(
              <Card key={rest._id} name={rest.name} description={rest.description} 
              image={rest.image} id={rest._id} />
                
            ))}
        </div>

        </div>
      </section>
    </>
  )
}

export default DisplayRestaurant