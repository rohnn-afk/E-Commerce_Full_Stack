import  { useContext, useEffect } from 'react'
import { shopContext } from '../Context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import axios from'axios'
import { URL_Backend } from '../../../Admin_panel/E-commerce_Admin_panel/src/App'
import { toast } from 'react-toastify'

const Verify = () => {

    const {token , navigate ,cart, setCart} = useContext(shopContext)
    const [params,setParams] = useSearchParams()

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
