import jwt from "jsonwebtoken";
import UserModel from "../Models/UserModel.js";
import validator from 'validator'
import dotenv from'dotenv'
import bcrypt from "bcryptjs";

dotenv.config()

const createtoken =  (id) =>{
return jwt.sign({id},process.env.JWT_SECRETKEY)

}



const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body

        if(!email||!password){
           return res.status(404).json({success:false,message:"please enter all the details"})
        }

        const olduser = await UserModel.findOne({email})
        if(!olduser){
            return res.status(404).json({success:false,message:"please enter a registered email"})
        }

        const comparepassword = await bcrypt.compare(password , olduser.password)
        if(!comparepassword){
            return res.status(404).json({success:false,message:"please enter correct password"})
        }

        const token = createtoken(olduser._id)

        return res.status(202).json({success:true,message:"User logged in",token})


        
    } catch (error) {
        return  res.status(404).json({success:false,message:"cannot log in right at the moment",error})

    }
 
}

const createUser = async (req,res) => {
    try {
        const {name , email , password } = req.body;
        
        //if email exists
        const exists = await UserModel.findOne({email})
        if(exists){
            return res.status(404).json({success:false,message:'email already exists'})
        }
        // email validation or password is weak
        if(!validator.isEmail(email)){
            return res.status(404).json({success:false,message:'email not valid'})
        }
        if(password.length < 8){
            return res.status(404).json({success:false,message:'weak password'})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedpass = await bcrypt.hash(password,salt)

        const newuser =  new UserModel({
            name,
            email,
            password:hashedpass
        })

        const user = await newuser.save()

        const token = createtoken(user._id)

        res.json({success:true,message:'user successfully created',token})


    } catch (error) {
        res.status(404).json({success:false,message:'cant create user',error})
        
    }
}

const adminLogin = async (req,res) => {

    try {
        const {email,password} = req.body

        if(email == process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){

            const token = jwt.sign(email + password , process.env.JWT_SECRETKEY)

           return res.status(202).json({success:true,message:'admin in logged in',token})
        }
        else{
            return res.status(404).json({success:false,message:'invalid credentials'})

        }
    } catch (error) {
       return  res.status(404).json({success:false,message:'Admin couldnt logged in',error})

    }
}


export  {loginUser , createUser, adminLogin} 