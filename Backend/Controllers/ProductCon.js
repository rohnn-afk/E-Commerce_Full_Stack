import upload from "../Middleware/Multer.js"
import {v2 as cloudinary}  from'cloudinary'
import ProductModel from "../Models/Productmodel.js"


const addProduct = async (req,res) =>{
    
    // console.log('request body:',req.body)
    try {   

    const {name,description,price,category,subcategory,size,bestseller} = req.body

    const sizeArray = size.split(',');
    // console.log(sizeArray)

    const image1 = req.files.image1 && req.files.image1[0]
    const image2 = req.files.image2 && req.files.image2[0]
    const image3 = req.files.image3 && req.files.image3[0]
    const image4 = req.files.image4 && req.files.image4[0]

    const image = [image1,image2,image3,image4].filter((item)=>item!==undefined)
   
    const image_url = await Promise.all(
        image.map(async (item) => {
            let result = await cloudinary.uploader.upload(item.path,{resourse_type:'image'})
            return result.secure_url
        })
    )

    // console.log(image_url)


    const productData = {
        name,
        description,
        price:Number(price),
        image:image_url,
        category,
        subcategory,
        size: sizeArray,
        bestseller: bestseller === "true" ? true : false
    }

    // console.log(productData)

    const product = new ProductModel(productData)
    await product.save()

    res.status(202).json({success:true,message:'product uploaded succesfully', product})

    

    } catch (error) {
        console.log('error message:',error)
        res.status(404).json({success:false,message:'couldnt upload product',error})
        
    }


}


const listProducts = async (req,res)=>{

    try {

    const products = await ProductModel.find({})

    res.status(202).json({success:true,products})
        
    } catch (error) {
        res.status(404).json({success:false,error})

    }

}


const removeProduct = async (req,res)=>{

    // const {id} = req.body
    // console.log(id)

    try {
        await ProductModel.findByIdAndDelete(req.body.id)
        res.status(202).json({success:true,message:`Product with id : ${req.body.id} has been deleted`})
        
    } catch (error) {
        res.status(404).json({success:false,error})

    }

}


const singleProduct = async (req,res)=>{

    try {
        let {productid} = req.body
        const product = await ProductModel.findById(productid)
        res.status(202).json({success:true,product})

    } catch (error) {
 
        res.status(404).json({success:false,error})
        
    }

}


export {addProduct,listProducts,removeProduct,singleProduct}