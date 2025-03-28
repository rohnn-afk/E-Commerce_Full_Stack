import  { useContext, useEffect } from 'react'
import { shopContext } from '../Context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import axios from'axios'
import { toast } from 'react-toastify'

const Verify = () => {

    const {token , navigate , setCart} = useContext(shopContext)
    const [params] = useSearchParams()

    
    const URL_Backend = "https://e-commerce-full-stack-backend-f3dl.onrender.com" 

    const success = params.get('success')
    const orderId = params.get('orderId')

    const verifyPayment = async () =>{
        try {
            if(!token){
                return null
            }

                const response = await axios.post(URL_Backend + "/api/order/verifystripe",{success,orderId},{headers:{token}})
        
                // console.log(response)
                if(response.data.success){
                    // console.log(cart)
                    setCart({})
                    // console.log(cart)
                    navigate('/orders')
                }
            else{
                    navigate('/cart')
                }

        } catch (error) {
            // console.log(error)
            toast.error(error.message)
        }


    }

    useEffect(() => {
     verifyPayment()
    }, [token])
    
  return (
    <div>
      
    </div>
  )
}

export default Verify
