// import React from 'react'

const NewsLetter = () => {


    const handleSubmit = (e)=>{
        e.preventDefault();
    }

  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>
            Subscribe Now and Get 20% off
        </p>
        <p className="text-gray-400 my-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste voluptatum, officiis illum corrupti temporibus tempora, at id nihil.
        </p>
        <form className="w-full sm:w-1/2 flex items-center gap-3 mx-auto" onSubmit={handleSubmit}>
        <input className="w-full sm:flex-1 outline-none" type="email" required placeholder="Enter your email"></input>
        <button className="bg-black text-white text-xs px-10 py-4" type="submit">Subscribe</button>
        </form>
      
    </div>
  )
}

export default NewsLetter
