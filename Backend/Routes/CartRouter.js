import express from 'express'
import {addCart, updateCart , getuserCart } from '../Controllers/CartController.js'
import userAuth from '../Middleware/userAuth.js'


const cartRouter = express.Router()

cartRouter.post('/addcart',userAuth,addCart)
cartRouter.post('/updatecart',userAuth,updateCart)
cartRouter.post('/getcart',userAuth,getuserCart)

export default cartRouter