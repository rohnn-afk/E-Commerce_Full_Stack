import UserModel from "../Models/UserModel.js"



const addCart = async (req,res) =>{

    try {
        const {itemID , userID , size} = req.body
        const userdata = await UserModel.findById(userID)
        const cartdata = await userdata.cartdata

            if(cartdata[itemID]){

                if(cartdata[itemID][size]){

                    cartdata[itemID][size] +=1
                }
                else{

                    cartdata[itemID][size] = 1
                }

                
            }else{
                
                cartdata[itemID] = {}
                cartdata[itemID][size] = 1
                
            }
            
            
            const updatedCart = await UserModel.findByIdAndUpdate(userID,{cartdata})

            return res.status(202).json({success:true,message:'Item added to your cart',updatedCart})
            
            
            
        } catch (error) {
            
            return res.status(400).json({success:false,message:'item couldnot be added to your cart',error:error.message})
            
    }

}

const updateCart = async (req,res) =>{

    const {userID , itemID , size ,quantity} = req.body

    try {

    const userdata = await UserModel.findById(userID)
    const cartdata = await userdata.cartdata

    cartdata[itemID][size] = quantity

        
    const updatedCart = await UserModel.findByIdAndUpdate(userID,{cartdata})

    return res.status(202).json({success:true,message:'Item updated in your cart',updatedCart})

           
} catch (error) {
            
    return res.status(400).json({success:false,message:'item couldnot be updated to your cart',error:error.message})
    
}


    
}

const getuserCart = async (req,res) =>{

    const {userID} = req.body

    try{

    const userdata = await UserModel.findById(userID)
    const cartdata = await userdata.cartdata

    return res.status(202).json({success:true,message:'cart data available',cartdata})

             
    } catch (error) {
            
      return res.status(400).json({success:false,message:'unable to access cart data',error:error.message})
    
    }


    
}


export  {addCart , updateCart ,getuserCart}