import { useContext, useState, useEffect } from "react"
import { shopContext } from "../Context/ShopContext"
import Titles from "../Components/Titles"
import { assets } from "../../public/frontend_assets/assets"
import CartTotal from "../Components/CartTotal"
import { useNavigate } from "react-router-dom"

const Cart = () => {

  const { products, cart, currency ,updateQuantity } = useContext(shopContext)
  const [cartData, setCartData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {

    if(products.length > 0){

      let tempData = [];
      for (const items in cart) {
        for (const item in cart[items]) {
          if (cart[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cart[items][item]
            })
          }
        }
      }
      
      setCartData(tempData);
    }

  }, [cart,products])

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Titles text1={'YOUR'} text2={'CART'}/>

      </div>
      <div>
        {
          cartData.map((item,index)=>{
            const productData = products.find((product)=>product._id===item._id)

            return (
              <div className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4" key={index}>
              <div className="flex items-start gap-6">
                <img src={productData.image[0]} className="w-16 sm:w-20"/>
                <div>
                  <p className="text-sx sm:text-lg font-medium">{productData.name}</p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>{currency}{productData.price}</p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>
                  </div>
                </div>
              </div>
              <input type="number" min={1} defaultValue={item.quantity} onChange={(e)=> e.target.value === '' || e.target.value ==='0' ? null : updateQuantity(item._id,item.size,Number(e.target.value))} className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"/>
              <img onClick={()=>updateQuantity(item._id,item.size,0)} src={assets.bin_icon} className="w-4"/>
              </div>
            )
          })
        }
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal/>
          <div className="w-full text-end">
            <button className="bg-black text-white text-sm my-8 px-8 py-3" onClick={()=>navigate('/place-order')}>Proceed to Checkout</button>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Cart
