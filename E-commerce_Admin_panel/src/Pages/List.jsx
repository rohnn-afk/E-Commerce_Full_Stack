import axios from 'axios'
import { useEffect, useState } from 'react'
import { currency, URL_Backend } from '../App'
import { toast } from 'react-toastify'

const List = ({token}) => {

  const [list,setList]= useState([])

  const fetchlist = async ()=>{

    try {
      const response = await axios.get(URL_Backend + '/api/product/list')
      // console.log(response)
      if(response.data.success){
        setList(response.data.products)
      
      }
      else{
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
   
  }

  const removeProduct = async (id) =>{

    console.log(id)

    try {
      
      const response = await axios.post(URL_Backend + '/api/product/remove',{id},{headers:{token}})

      if(response.data.success){
        toast.success(response.data.message)
        await fetchlist()
      }
      else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
   
    fetchlist()
    // console.log(list)
  }, [])
  


  return (
    <div>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>
        {/* {title table} */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm '>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>


        {/* {product list} */}

        {
          list.map((item,index)=>(
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border txt-sm ' key={index}>
              <img className='w-12' src={item.image[0]}/>
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p className='text-right md:text-center cursor-pointer text-lg' onClick={()=>removeProduct(item._id)}>X</p>

            </div>
          ))
        }

      </div>

    </div>
  )
}

export default List
