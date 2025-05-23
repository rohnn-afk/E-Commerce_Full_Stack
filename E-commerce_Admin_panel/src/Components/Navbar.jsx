import React from 'react'
import {assets} from '../../public/assets/assets.js'





const Navbar = ({setToken}) => {



  const handleLogout = () =>{

    setToken('')
    window.location.reload()
  }

  return (
    <div className=' flex item-center py-2 px-[4%] justify-between'>
      <img src={assets.logo} className='w-[max(10%),80px]'></img>
      <button onClick={handleLogout} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm self-center  hover:bg-gray-700 transition-colors border-none'>Logout</button>
    </div>
  )
}

export default Navbar
