import React from 'react'
import ScrollVelocity from '../../comman/scrollVelocity/ScrollVelocity'
import pizza from '../../../../public/Images/pizza.png'



function Footer() {
  return (
    <>
      <footer className=' w-full h-96 bg-[#004632] text-[#BDD0A0] max-sm:h-56  '>

        <div className='flex justify-around py-12 text-2xl max-sm:text-sm max-sm:py-6 '>
          <p>Contact</p>
          <p>Loyalty</p>
          <p>Term & Conditions</p>
        </div>


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

      </footer>
    </>
  )
}

export default Footer