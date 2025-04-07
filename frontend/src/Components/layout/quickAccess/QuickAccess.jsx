import React from 'react'
import QuickAccessItem from './QuickAccessItem'
import access_1 from '../../../../public/Images/access_1.jpg'
import access_2 from '../../../../public/Images/access_2.jpg'
import access_3 from '../../../../public/Images/access_3.jpg'


function QuickAccess() {
  return (
    <>

      <section className='w-full h-[100vh] flex max-sm:flex-col max-sm:h-max max-md:flex-col max-md:h-max  max-lg:flex-col max-lg:h-max '>

      <QuickAccessItem heading={'CHECK RESTAURANTS'} image={access_1} />
      <QuickAccessItem heading={'EDIT PROFILE'} image={access_2} />
      <QuickAccessItem heading={'ORDER TRACKING'} image={access_3} />



      </section>

    </>
  )
}

export default QuickAccess