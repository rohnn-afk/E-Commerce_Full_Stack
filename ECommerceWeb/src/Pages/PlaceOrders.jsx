import { useContext, useState } from "react"
import { assets } from "../../public/frontend_assets/assets"
import CartTotal from "../Components/CartTotal"
import Titles from "../Components/Titles"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { shopContext } from "../Context/ShopContext"
import axios from "axios"

const PlaceOrders = () => {


  const [method,setMethod] = useState('')
  const navigate = useNavigate()
  const { totalCartPrice, backendUrl, cart , setCart,token, products,currency,deliveryfee } = useContext(shopContext)

  const [formData,setFormData] = useState({
    firstname:'',
    lastname:"",
    email:'',
    street:'',
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onChangeHandler = (e)=>{

    const name = e.target.name 
    const value = e.target.value

    setFormData(data=> ({...data,[name]:value}))

  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    const requiredFields = ["firstname", "email", "phone", "street", "city", "state", "zipcode", "country"];
    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`${field} is required`);
        return;
      }
    }
  

    if (Object.keys(cart).length === 0 || !Object.values(cart).some((sizes) => Object.values(sizes).some((quantity) => quantity > 0))) {
      toast.error("Cart is empty. Please add items to your cart before placing an order.");
      return; 
    }
    // console.log(cart,products)

    try {

      let orderitems = []

      for(const items in cart){
        for(const item in cart[items]){
          if(cart[items][item]>0){
            console.log(cart[items][item])
            const iteminfo = {...products.find(product=> product._id === items)}
            if(iteminfo){
              iteminfo.size = item
              iteminfo.quantity = cart[items][item]
              orderitems.push(iteminfo)
            }
          }
        }
      }

      // console.log(orderitems)

      const orderData = {
        address:{...formData},
        items:orderitems,
        amount: totalCartPrice() + deliveryfee
      }

      // console.log(orderData)

      switch(method){

        case 'COD' : {const response = await axios.post(backendUrl + '/api/order/place',orderData,{headers:{token}})
                     console.log(response)
                     
                     if(response.data.success){
                      toast.success(response.data.message)
                      setCart({})
                      navigate('/orders')

                     }
                     else{
                      toast.error(response.data.message)
                     }
        break;
      }

      case 'STRIPE' : {
        const response = await axios.post(backendUrl + '/api/order/stripe',orderData,{headers:{token}})
        // console.log(response)
      
          if(response.data.success){
          toast.success(response.data.message)
          const url = response.data.url

      //  console.log(url)
          window.location.replace(url)
      
      }
      else{
       toast.error(response.data.message)
      }

        break;
      }

      case 'RAZOR' : {

        break;
      }
      
        default:
          break;
      }

    } catch (error) {
      
      console.log(error)
      toast.error(error.message)
    }

  }



  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-3 pt-5 sm:pt-14 min-h-[80vh] border-t">
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Titles text1={'DELIVERY'} text2={'INFORMATION'}/>
         </div>
         <div className="flex gap-3">
          <input type="text" onChange={onChangeHandler} name='firstname' value={formData.firstname} placeholder="First Name" className="border border-gray-300 rounded py-1.5 px-3.5 w-full"/>
          <input type="text" onChange={onChangeHandler} name='lastname' value={formData.lastname}  placeholder="Last Name" className="border border-gray-300 rounded py-1.5 px-3.5 w-full"/>
         </div>
         <input type="email" onChange={onChangeHandler} name='email' value={formData.email}  placeholder="Enter your Email" className="border border-gray-300 rounded py-1.5 px-3.5 w-full"/>
         <input type="text" onChange={onChangeHandler} name='street' value={formData.street}  placeholder="Street" className="border border-gray-300 rounded py-1.5 px-3.5 w-full"/>
         <div className="flex gap-3">
         <input type="text" onChange={onChangeHandler} name='city' value={formData.city}  placeholder="City" className="border border-gray-300 rounded py-1.5 px-3.5 w-full"/>
         <input type="text" onChange={onChangeHandler} name='state' value={formData.state}  placeholder="State" className="border border-gray-300 rounded py-1.5 px-3.5 w-full"/>
         </div>
         <div className="flex gap-3">
         <input type="number" onChange={onChangeHandler} name='zipcode' value={formData.zipcode}  placeholder="Zipcode" className="border border-gray-300 rounded py-1.5 px-3.5 w-full"/>
         <input type="text" onChange={onChangeHandler} name='country' value={formData.country}  placeholder="Country" className="border border-gray-300 rounded py-1.5 px-3.5 w-full"/>
         </div>
         <input type="number" onChange={onChangeHandler} name='phone' value={formData.phone}  placeholder="Phone" className="border border-gray-300 rounded py-1.5 px-3.5 w-full"/>


      </div>


      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal/>
        </div>
        <div className="mt-12">
          <Titles text1={'PAYMENT'} text2={'METHOD'}/>
          <div className="flex gap-3 flex-col lg:flex-row">
            <div className="flex items-center  gap-3 border p-2 px-3 cursor-pointer"  onClick={()=> setMethod('STRIPE')}>
              <p className={`min-w-3.5 h-3.5 border rounded-full  ${method === 'STRIPE' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.stripe_logo} className="h-5 mx-4"/>
            </div>
            <div className="flex items-center  gap-3 border p-2 px-3 cursor-pointer" onClick={()=> setMethod('RAZOR')}>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'RAZOR' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.razorpay_logo} className="h-5 mx-4"/>
            </div>
            <div className="flex items-center  gap-3 border p-2 px-3 cursor-pointer" onClick={()=> setMethod('COD')}>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'COD' ? 'bg-green-400' : ''}`}></p>
              <p className="text-gray-500 text-sm font-medium mx-4">Cash on Delivery</p>
            </div>
          </div>


          <div className="w-full text-end mt-8">
            <button type="submit" className="bg-black text-white px-16 py-3 text-sm">PLACE ORDER</button>
          </div>
        </div>
      </div>
      
    </form>
  )
}

export default PlaceOrders
