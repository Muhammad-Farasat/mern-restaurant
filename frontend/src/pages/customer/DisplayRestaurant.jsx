import React, { lazy, Suspense } from 'react'
import useRestaurantData from "../../hooks/restaurant/useRestaurantData";
import SplitText from '../../components/comman/SplitText/SplitText';
import { useInView } from 'react-intersection-observer'

const RestaurantCard = lazy(() => import('../../components/cards/RestaurantCard'));

const LazyRestaurantCard = ({ rest }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '50px'
  });

  return (
    <div ref={ref}>
      {inView && (
        <Suspense fallback={<div className="h-48 w-52 bg-[#ddd] rounded-xl" />}>
          <RestaurantCard
            name={rest.name}
            description={rest.description}
            image={rest.image}
            id={rest._id}
            location={rest.location}
          />
        </Suspense>
      )}
    </div>
  );
};

const DisplayRestaurant = () => {
  const { displayRestaurant, loading } = useRestaurantData();

  return (
    <section className="w-full min-h-screen py-12 bg-[#F5F0E6]">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-[Nunito-ExtraBold] text-center text-[#2A3B4D] mb-12">
          <SplitText
            text="Discover Restaurant"
            delay={100}
            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
            easing="easeOutCubic"
            threshold={0.2}
            rootMargin="-50px"
          />
        </h1>

        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayRestaurant.map((rest) => (
              <LazyRestaurantCard key={rest._id} rest={rest} />
            ))}
          </div>
        )}

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
  );
};

export default DisplayRestaurant;