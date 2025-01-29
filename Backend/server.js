import dotenv from 'dotenv'
import express from 'express'
import dbConnect from './config/mongodb.js'
import cors from 'cors'
import userRouter from './Routes/UserRouter.js';
import productRouter from './Routes/ProductRouter.js';
import connectCloudinary from './config/cloudinary.js';
import cartRouter from './Routes/CartRouter.js';
import orderRouter from './Routes/OrdersRoute.js';


//env//////////////////////////////////////////////////////////////////////////
dotenv.config();
const port = process.env.PORT || 5000

//express//////////////////////////////////////////////////////////////////////
const app = express()
app.use(express.json())
app.use(cors())


//router///////////////////////////////////////////////////////////////////////
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)


//connection///////////////////////////////////////////////////////////////////
app.listen(port,()=>{
    console.log(`server is working at port ${port}`)
    dbConnect();
    connectCloudinary();
})