import { useEffect, useState } from "react";
import axios from "axios";
import { currency, URL_Backend } from "../App.jsx";
import { toast } from "react-toastify";
import { assets } from "../../public/assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  // console.log(URL_Backend)

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        URL_Backend + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        console.log(response.data.response);
        setOrders(response.data.response.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.data.message);
    }
  };


  const statusHandler = async (event,orderId)=>{


    try {
      const response = await axios.post(URL_Backend + "/api/order/status",{status:event.target.value,orderId},{headers:{token}})
      
          if(response.data.success){
            await fetchAllOrders()
          }
          else{
            console.log(response.data.message)
            toast.error(response.data.message)
          }
  
        } catch (error) {

          console.log(error)
          toast.error(error.data.message)
        }


  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Order Page </h3>
      <div>
        {orders.map((order, index) => (
          <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700" key={index}>
            <img className="w-12" src={assets.parcel_icon} />
            <div>
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p className="py-0.5" key={index}>
                        {" "}
                        {item.name} x {item.quantity} <span>{item.size}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p className="py-0.5"  key={index}>
                        {" "}
                        {item.name} x {item.quantity} <span>{item.size},</span>
                      </p>
                    );
                  }
                })}
              </div>
              <p className="mt-3 mb-2 font-medium ">{order.address.firstname + " " + order.address.lastname}</p>
              <div>
                <p>{order.address.street + ", "}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">Items : {order.items.length}</p>
              <p className="mt-3">Method : {order.paymentMethord}</p>
              <p>Payment : {order.payment ? "Done" : "Pending"}</p>
              <p>Date : {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-sm sm:text-[15px]">{currency} {order.amount}</p>
            <select className="p-2 font-semibold" onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
