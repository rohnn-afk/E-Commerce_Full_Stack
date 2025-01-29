import express from 'express'
import {placeOrder ,placeOrderStripe ,placeOrderRazorpay , allOrdersAdmin , userOrder , updateStatus, verifyStripe } from '../Controllers/OrderController.js'
import adminAuth from '../Middleware/adminAuth.js'
import userAuth from '../Middleware/userAuth.js'


const orderRouter = express.Router()

//for admin
orderRouter.post('/list',adminAuth,allOrdersAdmin)
orderRouter.post('/status',adminAuth,updateStatus)

//for payment
orderRouter.post('/place',userAuth,placeOrder)
orderRouter.post('/stripe',userAuth,placeOrderStripe)
orderRouter.post('/razorpay',userAuth,placeOrderRazorpay)

orderRouter.post("/verifystripe",userAuth,verifyStripe)

//for user
orderRouter.post('/userorder',userAuth,userOrder)

export default orderRouter