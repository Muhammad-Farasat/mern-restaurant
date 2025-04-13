import React, { lazy, Suspense } from 'react'
import useRestaurantData from "../../hooks/restaurant/useRestaurantData";
import SplitText from '../../components/comman/SplitText/SplitText';
import { useInView } from 'react-intersection-observer'
import SkeletonCard from '../../components/comman/skeletonCard/SkeletonCard';
import Footer from '../../components/layout/footer/Footer'
import Logo from '../../components/comman/logo/Logo'
import { IoChevronForwardOutline } from "react-icons/io5";


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
        <Suspense fallback={
          <SkeletonCard />
        }>
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

    <>

      <div className='w-full'>
        <div className="container px-12 space-x-1.5 mx-auto py-4 text-lg font-semibold flex items-center ">

          <a href="/" className="hover:underline">
            HOME
          </a>
            <IoChevronForwardOutline />

          <a href="/all-restaurant" className="hover:underline ">
            RESTAURANTS
            {/* <IoChevronForwardOutline /> */}
          </a>

        </div>

      </div>


      <section className="w-full min-h-screen py-12 bg-[#F5F0E6]">

        <div className="container mx-auto px-12 max-sm:px-2 max-md:px-3 max-xl:px-0 ">

          <h1 className="text-4xl md:text-5xl font-black tracking-wider text-center text-[#2A3B4D] mb-12">

            {/* <SplitText
              text="DISCOVER RESTAURANT"
              delay={100}
              animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
              animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
              easing="easeOutCubic"
              threshold={0.2}
              rootMargin="-50px"
            /> */}
            DISCOVER RESTAURANT

          </h1>

          {!loading && (
            <div className="grid grid-cols-2 max-sm:grid-cols-1 max-md:grid-cols-1 max-lg:grid-cols-1 gap-8">
              {displayRestaurant.map((rest) => (
                <LazyRestaurantCard key={rest._id} rest={rest} />
              ))}
            </div>
          )}

        </div>

      </section>

      <Footer />

    </>
  );
};

export default DisplayRestaurant;