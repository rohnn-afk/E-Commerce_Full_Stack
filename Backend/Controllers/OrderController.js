import orderModel from "../Models/OrderModel.js"
import UserModel from "../Models/UserModel.js"
import axios from 'axios'
import  { Stripe } from "stripe"


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


export const placeOrder = async (req,res) =>{

    const {userID ,items ,amount,address} = req.body

    try {     
        const orderData = {
            userID,
            items,
            amount,
            address,
            paymentMethord:'COD',
            payment:false,
            date:Date.now()
        }
        
        const newOrder =  new orderModel(orderData)
        await newOrder.save()

        await UserModel.findByIdAndUpdate(userID,{cartdata:{}})

        res.status(202).json({success:true,message:'Order Placed'})
        
    } catch (error) {

        res.status(404).json({success:false,message:'Order cannot be Placed at the moment',error:error.message})

    }

}

export const placeOrderStripe = async (req,res) =>{

    try {
        const { userID, items, amount, address } = req.body
        const {origin} = req.headers

        const orderData = {
            userID,
            items,
            amount,
            address,
            paymentMethord: 'Stripe',
            payment: false, 
            date: Date.now(),
        };

        const newOrder = new orderModel(orderData)
        await newOrder.save()


        const lineItems = items.map((item) => ({
            price_data: {
                currency: 'inr', 
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100, 
            },
            quantity: item.quantity,
        }));
        
        lineItems.push({
            price_data: {
            currency: 'inr', 
            product_data: {
                name: 'Delivery charges'
            },
            unit_amount: 200 * 100, 
        },
        quantity: 1
    })


        
        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: 'payment',
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`, 
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
        });

      
        res.status(200).json({
            success: true,
            message: 'Checkout session created successfully.',
            url: session.url,
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error placing order with Stripe',
            error: error.message,
        })
    }


}

export const verifyStripe = async (req,res)=>{

    const {orderId , success , userID} = req.body
     try {
        if(success == true){
            // await UserModel.findByIdAndUpdate(userID,{cartdata:{}})
            await orderModel.findByIdAndUpdate(orderId,{payment:true})

            await UserModel.findByIdAndUpdate(userID,{cartdata:{}})

            res.json({success:true})

        }else{

            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false,message:'you can try making payment again'})

        }
     } catch (error) {
        console.log(error)
        res.json({success:false,error:error.message})
        
     }


}



export const placeOrderRazorpay = async (req,res) =>{


}

export const allOrdersAdmin = async (req,res) =>{

    try {
        const response = await orderModel.find({})
        if(response){
            console.log(response)
           return res.status(202).json({success:true,message:'order data',response})
        }else{
            return res.status(404).json({success:false,message:'couldnt fetch orders'})
        }
    } catch (error) {
       return res.status(404).json({success:false,error:error.message})
        
    }

}

export const userOrder = async (req,res) =>{

    try {
        const {userID} = req.body
        // console.log(userID)
        const orders = await orderModel.find({userID})

        res.status(202).json({success:true,message:"orders",orders})

    } catch (error) {
        res.status(404).json({success:false,message:"orders couldnt be fetch",message:error.message})
    }

}

export const updateStatus = async (req,res) =>{
    try {
        const  {orderId , status} = req.body

        await orderModel.findByIdAndUpdate(orderId,{status})
        res.status(202).json({success:true,message:'status been updated'})
    } catch (error) {
        res.status(404).json({success:false,message:'status couldnt be updated updated',error})
    }


}



