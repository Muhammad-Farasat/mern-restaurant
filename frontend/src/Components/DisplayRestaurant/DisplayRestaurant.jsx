import React from 'react'
import useDisplayRestaurant from '../../hooks/useDisplayRestaurant'
import RestaurantCard from '../RestaurantCard/RestaurantCard'

const DisplayRestaurant = () => {

  const { displayRestaurant, loading } = useDisplayRestaurant()

  return (
    <>
      <section className="w-full min-h-screen py-12 bg-[#F5F0E6]">
        <div className="container mx-auto px-4">
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-center text-[#2A3B4D] mb-12">
            Discover Restaurants
          </h1>

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-48 bg-[#E0E3E6] rounded-xl"></div>
                  <div className="mt-4 space-y-3">
                    <div className="h-6 bg-[#E0E3E6] rounded w-3/4"></div>
                    <div className="h-4 bg-[#E0E3E6] rounded w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Restaurant Grid */}
          {!loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayRestaurant.map((rest) => (
                <RestaurantCard
                  key={rest._id}
                  name={rest.name}
                  description={rest.description}
                  image={rest.image}
                  id={rest._id}
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && displayRestaurant.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-2xl text-[#4A4A4A]">No restaurants found</h3>
              <p className="text-[#A79B8D] mt-2">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default DisplayRestaurant