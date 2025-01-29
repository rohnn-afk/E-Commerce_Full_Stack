import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    }, price:{
        type:Number,
        require:true
    }, image:{
        type:Array,
        require:true
    }, category:{
        type:String,
        require:true
    }, subcategory:{
        type:String,
        require:true
    }, size:{
        type:Array,
        require:true
    }, bestseller:{
        type:Boolean
    }, date:{
        type:Date,
        require:Date.now
    }

})

const ProductModel = new mongoose.model('Products',productSchema)

export default ProductModel