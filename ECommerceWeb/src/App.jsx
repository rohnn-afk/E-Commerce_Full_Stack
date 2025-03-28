import {Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Collections from './Pages/Collections'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Products from './Pages/Products'
import Login from './Pages/Login'
import Cart from './Pages/Cart'
import PlaceOrders from './Pages/PlaceOrders'
import Orders from './Pages/Orders'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import SearchBar from './Components/SearchBar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './Pages/Verify'

// import { useState, useEffect, memo } from "react"

function App() {


  return (
  

 

  <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer/>
<Navbar/>
<SearchBar/>

    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/collections' element={<Collections/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/product/:productID' element={<Products/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/place-order' element={<PlaceOrders/>}/>
      <Route path='/orders' element={<Orders/>}/>
      <Route path='/verify' element={<Verify/>}/>
    </Routes>

    <Footer/>
    
    </div>

  )
}

export default App

//  let newvar = "1"

// console.log("hello")



// export default function App(){ //render
  
//   const [newvar,setNewvar] = useState("1")
 
//   useEffect(() => {
//    console.log("useeffect-1")
//     // setNewvar("5")
//     return () =>{console.log("nigga")}
//   }, [newvar])
  
  
  
  
//   // setNewvar("2")
  
//   return <><h1>hello world{newvar}</h1>
//    <input value={newvar} onChange={e=>setNewvar(e.target.value)}/>
//    <Newmemo newvar={newvar}/>
//    </>




// }

// let Newmemo = memo(
// function Newfunction({newvar}){

//   console.log("1")
//   return <h1>hello</h1>

// })