import express from 'express'
import {loginUser,createUser , adminLogin} from '../Controllers/Signin.js'

const userRouter = express.Router()

userRouter.post('/login',loginUser)
userRouter.post('/createuser',createUser)
userRouter.post('/adminlogin',adminLogin)


export default userRouter