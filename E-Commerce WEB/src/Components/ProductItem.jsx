import  { useContext } from 'react'
import { shopContext } from '../Context/ShopContext'
import { Link } from 'react-router-dom';

function ProductItem({id,image,name,price}) {
  
  const {currency} = useContext(shopContext);

    return (

    <Link to={`/product/${id}`} className='text-gray-700 cursor-pointer'>
      <div className='overflow-hidden'>
        <img src={image[0]} className='hover:scale-110 transition ease-in-out'/>
      </div>
      <p className='pt-3 pb-1 text-sm'>{name}</p>
      <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem
