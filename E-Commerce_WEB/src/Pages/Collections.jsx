import { useContext, useState , useEffect} from "react"
import { assets } from "../../public/frontend_assets/assets"
import Titles from "../Components/Titles"
import { shopContext } from "../Context/ShopContext"
import ProductItem from "../Components/ProductItem"

const Collections = () => {


  const [Showfilter,setShowFilter] = useState(false)
  const {products} = useContext(shopContext)
  const [filterProducts,setFilterProducts] = useState([])

  const[category,setCategory] = useState([])
  const[subcategory,setSubcategory] =  useState([])

  const[sort,setSort] = useState('relavant')

  const{search,setSearch,showSearch,setShowSearch} = useContext(shopContext)

  

  const toggleCategory = (e)=>{
    
    if(category.includes(e.target.value)){
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else{
      setCategory(prev=>[...prev,e.target.value])
    }
  }

  const toggleSubCategory = (e)=>{
    
    if(subcategory.includes(e.target.value)){
      setSubcategory(prev => prev.filter(item => item !== e.target.value))
    }
    else{
      setSubcategory(prev=>[...prev,e.target.value])
    }
  }


 const applyFilter = () =>{

  let productsCopy = products.slice()

  if(search && showSearch){

    productsCopy = productsCopy.filter(item=> item.name.toLowerCase().includes(search.toLowerCase()))
  }
  if(category.length > 0){

    productsCopy = productsCopy.filter(item => category.includes(item.category))
  }
  
  if(subcategory.length > 0){
    productsCopy = productsCopy.filter(item => subcategory.includes(item.subCategory))
  }

  setFilterProducts(productsCopy)
  // console.log(productsCopy);
  
 }

 useEffect(() => {

 applyFilter();

 }, [category,subcategory,search,showSearch,products])
 

 const sortProduct = (sort)=>{

  let fpcopy = filterProducts.slice()

  switch(sort){
    case 'low-high':
      setFilterProducts(fpcopy.sort((a,b)=> a.price - b.price))
      break;
    case 'high-low':
      setFilterProducts(fpcopy.sort((a,b)=> b.price - a.price))
      break;
    default:
      applyFilter()
      break;
  }
  
 }

 useEffect(() => {
  
 sortProduct(sort)
 }, [sort])
 


  

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      <div className="min-w-60">
        <p className="my-2 text-xl flex items-center cursor-pointer gap-2" onClick={()=>{setShowFilter(!Showfilter)}}> FILTERS
          <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${Showfilter ? 'rotate-90' : ''} `}/>
        </p>
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${Showfilter ? '' : 'hidden'} sm:block `}>
           <p className="mb-3 text-sm font-medium">CATEGORIES</p>
           <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={'Men'} onChange={toggleCategory}></input>
              Men
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={'Women'} onChange={toggleCategory}></input>
              Women
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={'Kids'} onChange={toggleCategory}></input>
              Kids
            </p>
           </div>
        </div>
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${Showfilter ? '' : 'hidden'} sm:block `}>
           <p className="mb-3 text-sm font-medium">TYPE</p>
           <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={'Topwear'}  onChange={toggleSubCategory}></input>
              Topwear
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={'Bottomwear'}  onChange={toggleSubCategory}></input>
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={'Winterwear'}  onChange={toggleSubCategory}></input>
              Winterwear
            </p>
           </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Titles text1={'All'} text2={'Collections'}/>
          <select className="border-2 border-gray-300 text-sm px-2" onChange={(e)=>setSort(e.target.value)}>
            <option value={'relavent'}>Sort by : Relavent</option>
            <option value={'low-high'}>Sort by : Low to High</option>
            <option value={'high-low'}>Sort by : High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {
            filterProducts.map((item,index)=>{
              return <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/> 
            })
          }

        </div>
      </div>
      
    </div>
  )
}

export default Collections
