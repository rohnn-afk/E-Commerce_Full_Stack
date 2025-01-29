import { useContext, useEffect } from "react"
import { shopContext } from "../Context/ShopContext"
import { assets } from "../../public/frontend_assets/assets"
import { useLocation } from "react-router-dom"

const SearchBar = () => {


    const{search,setSearch,showSearch,setShowSearch} = useContext(shopContext)
   
    const location = useLocation()
     
    useEffect(() => {
    if(location.pathname == '/collections'){
        setShowSearch(true)
    }
    else{
        setShowSearch(false)
    }
    }, [location])
    




  return showSearch ? (
    <div className='border-t border-b bg-gray-50 text-center'>
        <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full  w-3/4 sm:w-1/2">
        <input value={search} onChange={(e)=>setSearch(e.target.value)} className="flex-1 outline-none bg-inherit text-sm" type="text" placeholder="Search"/>
        <img src={assets.search_icon} className="w-4"/>
        </div>
        <img src={assets.cross_icon} onClick={()=>setShowSearch(false)} className="inline w-3 cursor-pointer"/>
      
    </div>
  ):null
}

export default SearchBar
