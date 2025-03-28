import {  createContext,  useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';


export const shopContext = createContext();

const ShopContextProvider = (props)=>{

    const navigate = useNavigate()

    const currency = '₹';

    const deliveryfee = 100;


    const backendUrl = "https://e-commerce-full-stack-backend-f3dl.onrender.com" 

    const [search,setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(true)
    const [cart,setCart] =  useState({})
    const [token,setToken] = useState('')



    const[products, setProducts] = useState([])

    const getProductData = async () =>{

        try {

            const response = await axios.get(backendUrl + '/api/product/list')
            if(response.data.success){
                
                setProducts(response.data.products)
                // console.log(response.data.products)
            }else{
                toast.error(response.data.message)
            }
            
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    const getUserCart = async (token)=>{

        try {
            const response = await axios.post(backendUrl + '/api/cart/getcart',{},{headers:{token}})
            // console.log(response)
            if(response.data.success){
                setCart(response.data.cartdata)
            }
            
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    useEffect(() => {
     
        getProductData()

    }, [])

    useEffect(() => {
     
        if(!token && localStorage.getItem('token')){

            setToken( localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        } 
    }, [])
    
    

    const addtoCart = async (itemID,size)=>{



        if(!size){
            toast.error('Please select Size')
            return
        }

        let cartCopy = structuredClone(cart)
        
        if(cartCopy[itemID]){
            if(cartCopy[itemID][size]){
                cartCopy[itemID][size] +=1;
            }
            else{
                cartCopy[itemID][size] = 1
            console.log(cartCopy)
            }
        }
        else{
            cartCopy[itemID] = {}
            cartCopy[itemID][size] = 1;
            console.log(cartCopy);
        }
        
        setCart(cartCopy)

        if(token){
            
            try {
                
                 await axios.post(backendUrl + '/api/cart/addcart',{itemID , size} , {headers:{token}})
                 toast.success('Item added successfully')
                 // console.log(itemAdded)

            } catch (error) {
                
                console.log(error)
                toast.error(error.message)
            }
        }

    }


    // useEffect(() => {
      
    //     console.log(cart);
        
    // }, [cart])
    
    const cartCount = () =>{
        let totalCount = 0;
        for(const items in cart){
            for(const item in cart[items]){
              try {
                
                  if(cart[items][item] > 0){
                      totalCount += cart[items][item];
                  }
              } catch {
                
                totalCount = 0;
              }
                
            }
        }
        return totalCount;
    }


    const updateQuantity = async (itemID,size,quanity) =>{

        let demoCart = structuredClone(cart)

        demoCart[itemID][size] = quanity;
        setCart(demoCart);

        if(token){

            try {
                await axios.post(backendUrl + '/api/cart/updatecart' ,{itemID,size,quanity},{headers:{token}})
                toast.success('Item quantity updated')

            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }


    }

    const totalCartPrice = () =>{

        let totalPrice = 0;
        for(const items in cart){
            let demoDATA = products.find((product)=> product._id === items)
            for(const item in cart[items]){
                try {
                    if(cart[items][item]>0){
                        totalPrice += demoDATA.price * cart[items][item];
                    }
                } catch {
                   null 
                }
            }
        }
        return totalPrice;

    }

    const value = {
        products,currency,deliveryfee,search,setSearch,showSearch,setShowSearch,cart,addtoCart,cartCount, updateQuantity , totalCartPrice, backendUrl, getProductData
        ,token,setToken , setCart , navigate
    }

    return(
        <shopContext.Provider value={value}>
            {props.children}
        </shopContext.Provider>
    )
}

export default ShopContextProvider;
