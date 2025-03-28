import  { useState } from 'react'
import { assets } from '../../public/assets/assets.js'
import axios from 'axios'
import { URL_Backend } from '../App.jsx'
import { toast } from 'react-toastify'

const Add = ({token}) => {

  const [image1,setImage1] = useState(false)
  const [image2,setImage2] = useState(false)
  const [image3,setImage3] = useState(false)
  const [image4,setImage4] = useState(false)

  const [name,setName] = useState('')
  const [description,setDescription] = useState('')
  const [price,setPrice] = useState('')
  const [category,setCategory] = useState('Men')
  const [subcategory,setSubCategory] = useState('Topwear')
  const [bestseller,setBestseller] = useState(false)
  const [size,setSizes] = useState([])


  const onSubmitHandler = async (e) =>{
    e.preventDefault()

    try {
       const formdata = new FormData()

       formdata.append('name',name)
       formdata.append('description',description)
       formdata.append('price',price)
       formdata.append('category',category)
       formdata.append('subCategory',subcategory)
       formdata.append('bestseller',bestseller)
       formdata.append('size',size)

       image1 && formdata.append('image1',image1)
       image2 && formdata.append('image2',image2)
       image3 && formdata.append('image3',image3)
       image4 && formdata.append('image4',image4)

      //  formdata.forEach((value, key) => {
      //   console.log(`${key}: ${value}`);
      // });

      const response = await axios.post(URL_Backend + '/api/product/add',formdata,{headers:{token}})

      if(response.data.success){

        toast.success(response.data.message)
        
        setDescription('')
        setName('')
        setPrice('')
        setBestseller(false)
        setSizes([])
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)

      }
      else{
        toast.error(response.data.message)
      }

    } catch (error) {

      toast.error(error.message)
      console.log(error)
    }

  }


  return (
   <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
    <div>
      <p className='mb-2'>Upload Image</p>

      <div className='flex gap-2'>
        <label  className='w-20 cursor-pointer' htmlFor='image1'>
          <img  className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}/>
          <input type='file' id='image1' onChange={(e)=>setImage1(e.target.files[0])} hidden/>
        </label>
        <label className='w-20 cursor-pointer' htmlFor='image2'>
          <img className='w-20'  src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}/>
          <input type='file' id='image2' onChange={(e)=>setImage2(e.target.files[0])} hidden/>
        </label>
        <label  className='w-20 cursor-pointer'htmlFor='image3'>
          <img className='w-20'  src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}/>
          <input type='file' id='image3' onChange={(e)=>setImage3(e.target.files[0])} hidden/>
        </label>
        <label className='w-20 cursor-pointer' htmlFor='image4'>
          <img className='w-20'  src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}/>
          <input type='file' id='image4' onChange={(e)=>setImage4(e.target.files[0])} hidden/>
        </label>
      </div>
    </div>

    <hr/>

    <div className='w-full'>
      <p className='mt-2 mb-2'>Product Name</p>
      <input className='w-full max-w-[500px] mt-1 px-3 py-1' type='text' placeholder='type name here' onChange={(e)=>setName(e.target.value)} value={name} required/>
    </div>

    <div className='w-full'>
      <p className='mt-2 mb-2'>Product Description</p>
      <textarea className='w-full max-w-[500px] mt-1 px-3 py-1' type='text' placeholder='write product description'  onChange={(e)=>setDescription(e.target.value)} value={description} required/>
    </div>

    <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8 w-[60%]'>



    <div className='w-full'>
      <p className='mt-2 mb-2 '>Product Category</p>
      <select onChange={(e)=>setCategory(e.target.value)} className='w-full max-w-[200px] px-2 py-1 mt-1'>
        <option value='Men'>Men</option>
        <option value='Women'>Women</option>
        <option value='Kids'>Kids</option>
      </select>
    </div>

    <div className='w-full'>
      <p className='mt-2 mb-2'>Sub-Category</p>
      <select onChange={(e)=>setSubCategory(e.target.value)} className='w-full max-w-[200px] px-2 py-1 mt-1'>
        <option value='Topwear'>Topwear</option>
        <option value='Bottomwear'>Bottomwear</option>
        <option value='Winterwear'>Winterwear</option>
      </select>
    </div>

    <div className='w-full'>
      <p className='mt-2 mb-2'>Product Price</p>
      <input onChange={(e)=>setPrice(e.target.value)} value={price} className='w-full px-2 py-1 sm:w-[180px] mt-1' type='Number' placeholder='25'/>
    </div>

    
    </div>

    <div>
      <p className='mb-2 mt-2'>Product Sizes</p>
      <div className='flex gap-3 mt-1'>
        <div onClick={()=>setSizes(prev=> prev.includes('S') ? prev.filter((item)=> item !== 'S') : [...prev,'S'] )}>
          <p className={`${size.includes('S') ? 'bg-pink-200' : 'bg-slate-200' } px-3 py-1 cursor-pointer`}>S</p>
        </div>
        <div  onClick={()=>setSizes(prev=> prev.includes('M') ? prev.filter((item)=> item !== 'M') : [...prev,'M'] )}>
          <p className={`${size.includes('M') ? 'bg-pink-200' : 'bg-slate-200' } px-3 py-1 cursor-pointer`}>M</p>
        </div>
        <div  onClick={()=>setSizes(prev=> prev.includes('L') ? prev.filter((item)=> item !== 'L') : [...prev,'L'] )}>
          <p className={` ${size.includes('L') ? 'bg-pink-200' : 'bg-slate-200' } px-3 py-1 cursor-pointer`}>L</p>
        </div>
        <div  onClick={()=>setSizes(prev=> prev.includes('XL') ? prev.filter((item)=> item !== 'XL') : [...prev,'XL'] )}>
          <p className={`${size.includes('XL') ? 'bg-pink-200' : 'bg-slate-200' } px-3 py-1 cursor-pointer`}>XL</p>
        </div>
        <div  onClick={()=>setSizes(prev=> prev.includes('XXL') ? prev.filter((item)=> item !== 'XXL') : [...prev,'XXL'] )}>
          <p className={`${size.includes('XXL') ? 'bg-pink-200' : 'bg-slate-200' } px-3 py-1 cursor-pointer`}>XXL</p>
        </div>
      </div>
    </div>
         

    <div className='flex gap-2 mt-4'>
      <input type='checkbox' onChange={()=>setBestseller(prev => !prev)} checked={bestseller} id='bestseller'/>
      <label className='cursor-pointer ' htmlFor='bestseller'>Add to bestseller</label>
    </div>
   
   <button type='submit' className='w-28 py-3 mt-6 bg-black hover:bg-red-200 transition-colors text-white'>ADD</button>
   </form>

  )
}

export default Add
