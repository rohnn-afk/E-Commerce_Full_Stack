import express from 'express'
import { addProduct,listProducts,removeProduct,singleProduct } from '../Controllers/ProductCon.js'
import upload from '../Middleware/Multer.js'
import adminAuth from '../Middleware/adminAuth.js'

const productRouter = express.Router()

productRouter.post('/add',adminAuth,upload.fields([{name:'image1',maxcount:1},{name:'image2',maxcount:1},{name:'image3',maxcount:1},{name:'image4',maxcount:1}]),addProduct)

productRouter.get('/list',listProducts)

productRouter.post('/remove',adminAuth,removeProduct)

productRouter.post('/single',singleProduct)

export  default productRouter
