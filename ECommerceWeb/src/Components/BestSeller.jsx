import  {useEffect, useContext, useState } from 'react'
import { shopContext } from '../Context/ShopContext'
import Titles from './Titles';
import ProductItem from './ProductItem';

const BestSeller = () => {

    const {products} = useContext(shopContext);
    
    const[bestSeller,setBestseller] = useState([])

    useEffect(() => {
      
    let bestproducts = products.filter((item)=> (item.bestseller))
    setBestseller(bestproducts.slice(0,5))
      
    }, [products])
    
  return (
    <div className='my-5'>
      <div className='text-center text-3xl py-8'>
        <Titles text1={'BEST'} text2={'SELLER'}/>
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus quos, ut cumque alias quam nisi maxime.</p>
        </div>      
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {
        // console.log(bestSeller)
         
          bestSeller.map((items,index)=>{
              return  <ProductItem key={index} id={items._id}  image={items.image} name={items.name} price={items.price}/>
          })
        }
        </div>
    </div>
  )
}

export default BestSeller
