import React, { useState } from 'react'
import axios from 'axios'
import { URL_Backend } from '../App.jsx'
import { toast } from 'react-toastify'

const Login = ({setToken}) => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const onsubmitHndler = async (e)=>{

        try {

                 e.preventDefault()
                 const response = await axios.post(URL_Backend + '/api/user/adminlogin',{email,password}) 
                //  console.log(response)
                 if(response.data.success){

                  setToken(response.data.token)
                 }else{
                  toast.error(response.data.message)
                 }
        
            
        } catch (error) {
            
          console.log(error)
          toast.error(error.response.data.message)
        }
    }


  return (
    <div className='min-h-screen flex items-center justify-center w-full bg-gray-100'>
      <div className='bg-white hover:bg-red-200 transition-colors shadow-md rounded-lg px-8 py-6 max-w-md'>
        <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
        <form onSubmit={onsubmitHndler} >
            <div className='mb-3 min-w-72'>
                <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                <input onChange={(e)=> setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type='email' placeholder='your@email.com' required/>
            </div>
            <div className='mb-3 min-w-72'>
                <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                <input onChange={(e)=> setPassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type='password' placeholder='Enter your Password' required/>
            </div>
            <button type='submit' className='mt-2 w-full hover:bg-black hover:text-white px-4 py-2 rounded transition-colors' >Login</button>

        </form>
      </div>
    </div>
  )
}

export default Login
