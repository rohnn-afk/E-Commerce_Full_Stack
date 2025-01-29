import { useContext, useState , useEffect} from "react"
import { shopContext } from "../Context/ShopContext"
import Titles from "../Components/Titles"
import axios from 'axios'

const Orders = () => {

  const {backendUrl,token,currency} = useContext(shopContext)

  const [orderData,setOrderData] = useState([])

  const loadOrders = async () =>{
    try {
      if(!token){
        return null
      }

      const response = await axios.post(backendUrl + '/api/order/userorder',{},{headers:{token}})

      // console.log(response.data)
      if(response.data.success){
        let allOrderItem = []
        response.data.orders.map(orders => 
          orders.items.map(item =>{
            item['status'] = orders.status
            item['payment'] = orders.payment
            item['paymentMethod'] = orders.paymentMethord
            item['date'] = new Date(orders.date).toLocaleString()
            allOrderItem.push(item)}
           )
        )

        // console.log(allOrderItem)
        setOrderData(allOrderItem.reverse())
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
  loadOrders()
  }, [token])
  



  return (
    <div className="border-t pt-16">
      <div className="text-2-xl">
        <Titles text1={'MY'} text2={'ORDERS'}/>

      </div>
      <div>
        {
          orderData.map((item,index)=>{
            return (
            <div key={index} className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gp-4">
              <div className="flex items-start gap-6 text-sm">
                <img src={item.image[0]} className="sm:w-20 w-16"/>
              <div> 
              <p className="sm:text-base font-medium">
                  {item.name}
                  </p>
                <div className="flex items-center gap-3 mt-1 text-base text-gray-700 ">
                <p>{currency}{item.price}</p>
                <p>Quantity:{item.quantity}</p>
                <p>size:{item.size}</p>
                </div>
                <p className="mt-1">Date: <span className="text-gray-400">{item.date}</span></p>
                <p className="mt-1">Payment: <span className="text-gray-400">{item.paymentMethod}</span></p>
              </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base">{item.status}</p>
              </div>
              <button onClick={loadOrders} className="border px-4 py-2 rounded text-sm font-medium  hover:bg-black hover:text-white  transition-colors rounded-sm">Track Order</button>
              </div>
              </div>)
          })
        }
      </div>
      
    </div>
  )
}

export default Orders
