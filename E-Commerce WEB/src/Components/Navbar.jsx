import { NavLink , Link} from "react-router-dom"
import { assets } from "../../public/frontend_assets/assets"
import { useContext, useState } from "react"
import { shopContext } from "../Context/ShopContext"



const Navbar = () => {

  const{setShowSearch , cartCount , token ,setToken , setCart , navigate} = useContext(shopContext)


  const [show,setShow] = useState(false)

  const logout = ()=>{

    setToken('')
    localStorage.removeItem('token')
    setCart({})
    navigate('/login')
      }



  return (
    <div className="flex item-center justify-between py-5 font-medium">
      
      <Link to='/'>
       <img src={assets.logo} className="w-36"/>
      </Link>

       <ul className=" hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to='/' className='flex flex-col items-center gap-1'>
        <p>Home</p>
        <hr className="w-2/4 border-none h-[1.5px] bg-gray-700"/>
        </NavLink>
        <NavLink to='/collections' className='flex flex-col items-center gap-1'>
        <p>Collections</p>
        <hr className="w-2/4 border-none h-[1.5px] bg-gray-700"/>
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
        <p>About</p>
        <hr className="w-2/4 border-none h-[1.5px] bg-gray-700"/>
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
        <p>Contact</p>
        <hr className="w-2/4 border-none h-[1.5px] bg-gray-700"/>
        </NavLink>
        
       </ul>

       <div className="flex items-center gap-6">
        <NavLink to='/collections'>
        <img src={assets.search_icon} className="w-5 cursor-pointer" onClick={()=>setShowSearch(true)}/>
        </NavLink>
        <div className="group relative">
         <img onClick={token ? null : navigate('/login')} src={assets.profile_icon} className="w-5 cursor-pointer"/>
         
      {    

      token &&

        <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col w-36 gap-2 py-3 px-5 bg-slate-100 text-gray-700 rounded">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black" onClick={()=>navigate('/orders')} >Orders</p>
              <p className="cursor-pointer hover:text-black" onClick={logout}>Logout</p>
            </div>
          </div>
          }
        </div>
        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className="w-5 cursor-pointer"/>
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {cartCount()}
          </p>
        </Link>
        <img src={assets.menu_icon} onClick={()=>setShow(true)}   className="w-5 sm:hidden cursor-pointer"/>
        <div className={`absolute top-0 bottom-0 right-0 overflow-hidden bg-white transition-all ${show ? 'w-full' : 'w-0'}`}>
          <div className="flex flex-col text-gray-600">
            <div className="flex items-center gap-4 p-3" onClick={()=>setShow(false)}>
              <img src={assets.dropdown_icon} className="h-4 rotate-180"/>
              <p>Back</p>
            </div>
            <NavLink className='pl-6 py-2 border'  onClick={()=>setShow(false) } to='/'>Home</NavLink>
            <NavLink className='pl-6 py-2 border'  onClick={()=>setShow(false) }to='/collctions'>Collections</NavLink>
            <NavLink className='pl-6 py-2 border'  onClick={()=>setShow(false) }to='/about'>About</NavLink>
            <NavLink className='pl-6 py-2 border' onClick={()=>setShow(false) } to='/contact'>Contact</NavLink>
          </div>
        </div>
       </div>
    </div>
  )
}

export default Navbar
