// import { useState } from 'react'

import "./App.css";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./Pages/Add.jsx";
import Orders from "./Pages/Orders.jsx";
import List from "./Pages/List.jsx";
import { useEffect, useState } from "react";
import Login from "./Components/Login.jsx";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export const URL_Backend = "https://e-commerce-full-stack-backend-f3dl.onrender.com"
export const currency = '₹'

function App() {


  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : "");


  useEffect(() => {
  
    localStorage.setItem('token',token)

  }, [token])
  

  

  return (
    <div className="bg-grey-50 min-h-screen">



      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />

          <hr />

          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
      <ToastContainer/>
    </div>
  );
}

export default App;
