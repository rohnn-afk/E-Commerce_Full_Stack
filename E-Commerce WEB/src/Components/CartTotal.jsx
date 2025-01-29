import { useContext } from "react"
import { shopContext } from "../Context/ShopContext"
import Titles from "./Titles"


const CartTotal = () => {


    const { currency,deliveryfee,totalCartPrice } = useContext(shopContext)

    return (
    <div className="w-full">
        <div className="text-2xl">
            <Titles text1={'CART'} text2={'TOTAL'}/>
        </div>

        <div className="flex flex-col gap-2 mt-2 text-sm">
            <div className="flex justify-between">
                <p>Subtotal</p>
                <p>{currency}{totalCartPrice()}.00</p>
            </div>
            <hr/>
            <div className="flex justify-between">
                <p>Shipping Fee</p>
                <p>{currency} {deliveryfee}</p>
            </div>
            <hr/>
            <div className="flex justify-between">
                <p>Total</p>
                <p>{currency} {totalCartPrice() === 0 ? 0 : totalCartPrice() + deliveryfee}</p>
            </div>
        </div>
      
    </div>
  )
}

export default CartTotal
