import { useContext, useState , useEffect } from "react"
import { shopContext } from "../Context/ShopContext"
import Titles from "./Titles"
import ProductItem from "./ProductItem"


const LatestCollection = () => {
  
  const {products} = useContext(shopContext)

  const [latestItem,setLatestItem] = useState([])

  useEffect(() => {    
    setLatestItem(products.slice(0,10));
  },[products])
  
  
    return (
    <div>
        <div className="my-10">
            <div className="text-center py-8 text-3xl">
                <Titles text1={'Latest'} text2={'Collections'}/>
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus quos, ut cumque alias quam nisi maxime, perferendis delectus exercitationem ipsam quis aliquid labore excepturi at consectetur quisquam ex ad vero.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">

              {
                
                latestItem.map((item,index)=>{
                 return  <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/> 
                })
              }
            </div>
        </div>
      
    </div>
  )
}

export default LatestCollection
