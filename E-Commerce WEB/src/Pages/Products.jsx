import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { shopContext } from "../Context/ShopContext";
import { assets } from "../../public/frontend_assets/assets";
import RelatedProducts from "../Components/RelatedProducts";

const Products = () => {

  const productid = useParams()
  const {products , currency , addtoCart} = useContext(shopContext)
  const [productData,setProductData] = useState(false)
  const [image,setImage] = useState('')
  const[size,setSize] = useState('')

  // console.log(productid);
  const fetchProductData = async ()=>{

    products.map((item)=>{

      // console.log(item);
      // console.log(item._id);
      // console.log(productid.productID);
      
      
      if(item._id === productid.productID){

        setProductData(item)
        setImage(item.image[0])
        return null
        
      }
    })
  }
  
  useEffect(() => {
    fetchProductData();        
    
  }, [productid,products])
  
  
  return (
    productData ?
    <div className="border-t-2 transition-opacity ease-in duration-500 opacity-100 pt-10">

      <div className="flex gap-12 sm:gap-12  flex-col sm:flex-row ">
        
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll  justify-between sm:justify-normal sm:w-[18.7%] w-full">
          

              {
               productData.image.map((item,index)=>{
                // console.log(item);
                
                 return  <img  onClick={()=>setImage(item)} src={item} key={index} className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"/> 
             
              })
            }
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} className="w-full h-auto"/>
          </div>
        </div>
        
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} className="w-3 5" alt="" />
            <img src={assets.star_icon} className="w-3 5" alt="" />
            <img src={assets.star_icon} className="w-3 5" alt="" />
            <img src={assets.star_icon} className="w-3 5" alt="" />
            <img src={assets.star_dull_icon} className="w-3 5" alt="" />
          <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>select size</p>
            <div className="flex gap-2">
              {/* {
                console.log(productData)} */}
                {
                productData.size.map((item,index)=>{
                  // console.log(item,index);
                  
                  return <button className={`border py-2 px-4 bg-gray-100 ${item === size ? `border-orange-500`: ' '}`} onClick={()=>setSize(item)}  key={index}>{item}</button>
                })
              }
            </div>
          </div>
          <button onClick={()=>addtoCart(productData._id,size)} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">Add to Cart</button>
          <hr className="mt-8 sm:w-4/5"/>
          <div className=" text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Orignal products.</p>
            <p>Cash on delivery available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <div className="flex ">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (69)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
        <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience.</p>
          <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
        </div>
      </div>
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div> 
    : <div className="opacity-0"></div>
  )
}

export default Products
