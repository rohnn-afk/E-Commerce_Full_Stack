// import React from 'react'
import { assets } from '../../public/frontend_assets/assets'

const Footer = () => {
  return (
    <div>

    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm '>
        <div>
            <img src={assets.logo} className='w-32 mb-5'/>
            <p className='w-full md:w-2/3 text-gray-600'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi, fugit! Cumque provident sed tenetur odio porro accusantium quam reprehenderit commodi quo! Alias dolore eius optio beatae soluta, mollitia autem porro.
            </p>
        </div>

        <div>
        <p className='text-xl mb-5 font-medium'>COMPANY</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
        </ul>
        </div>
        <div>
            <p className='text-xl mb-5 font-medium'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+99,92_...</li>
            <li>contact@foreveryou.com</li>
            </ul>
        </div>
    </div>
       <div>
       <hr/>
       <p className='py-5 text-sm text-center'>Copyright 2024@ Reaper - All Rights Reserved </p>
   </div>
   
    </div>
  )
}

export default Footer
