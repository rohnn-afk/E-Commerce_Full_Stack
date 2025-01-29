import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()


const userAuth = async (req,res,next)=> {

    const {token} = req.headers

    if(!token){
        res.status(404).json({success:false,message:'invalid user request, please login first'})
    }

    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRETKEY)

        // console.log(token_decode)
        req.body.userID = token_decode.id
        next()


    } catch (error) {
        console.log(error)
         res.status(404).json({success:false,message : error.message})
    }
}


export default userAuth