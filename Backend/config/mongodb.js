import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const dbConnect = async () =>{


    await mongoose.connect(process.env.MONGODB_URL)
    .then( async ()=>{
        console.log('Database is connected')
    })
    .catch((err)=>{
        console.log('Database not connected',err)
    })
}

export default dbConnect