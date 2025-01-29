import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type :String,
        require: true
    },
    email : {
        type :String,
        require: true,
        unique:true
    },
    password : {
        type :String,
        require: true
    },
    cartdata : {
        type :Object,
        default:{}
    }

},{minimise:false})

const UserModel = new mongoose.model('User',userSchema)

export default UserModel