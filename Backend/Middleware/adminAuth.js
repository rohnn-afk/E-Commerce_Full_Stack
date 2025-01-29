import jwt from'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const adminAuth = async (req,res,next) => {
    
    try {

    const {token} = req.headers

    // console.log(token)
    if(!token){
       return  res.status(404).json({success:false,message:'not authorized, login again'})
    }

    const token_decode = jwt.verify(token,process.env.JWT_SECRETKEY)
    
    // console.log(token_decode)
    
    if(token_decode !==  process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
        return res.status(404).json({success:false,message:'not authorized, invalid admin details'})

    }
  

    next();
    
        
    } catch (error) {
        // console.log(error)
               return res.status(404).json({success:false,message:'couldnt login as admin',error})

    }

}

export default adminAuth