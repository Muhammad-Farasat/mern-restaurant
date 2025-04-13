import React from 'react'
import img from '../../../../public/Images/Animate-green.svg'
import ScrollVelocity from '../../comman/scrollVelocity/ScrollVelocity';
import pizza from '../../../../public/Images/pizza.png'
import Logo from '../../comman/logo/Logo';


function AboutRestaurant() {


    return (
        <>
            <section className='relative  w-full h-[100vh] bg-[#004632] text-[#BDD0A0]  '>

                <ScrollVelocity
                    texts={[
                        <>
                            SAVOR THE FLAVOR
                            <img
                                src={pizza}
                                alt="bite"
                                className="inline-block mx-4 w-28 h-28 max-sm:w-10 max-sm:h-10 "
                            />
                            EMBRACE THE BITES
                            <img
                                src={pizza}
                                alt="bite"
                                className="inline-block mx-4 w-28 h-28 max-sm:w-10 max-sm:h-10 "
                            />
                        </>
                    ]}
                    // velocity={velocity}
                    className="custom-scroll-text mt-12 text-[8vw] max-sm:text-[14vw] "
                />

                <div className=' py-16 px-6 md:px-20 max-sm:py-12 ' >
  
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
               
                        {/* Text Section */}
               
                        <div className="flex-1">
                            <p className="text-3xl max-sm:text-sm max-lg:text-lg font-medium leading-relaxed text-justify ">
                            ZenBites is your ultimate companion for uncovering the best restaurants around you. Whether you're in the mood for a cozy café to chill with friends, a fine dining experience for a special night out, or just a quick bite on the go, we've got you covered. Our platform connects you to top-rated eateries based on your location, preferences, and real-time reviews. With a clean, intuitive interface and seamless navigation, discovering your next favorite spot has never been easier. ZenBites is more than just a food finder — it's your go-to guide for satisfying every craving with ease and style.
                            </p>
                        </div>

                        {/* Image Section */}

                        <Logo img={img} width={'w-[27vw]'} />

                    </div>

                </div>




            </section>
        </>

    )
}

export default AboutRestaurant