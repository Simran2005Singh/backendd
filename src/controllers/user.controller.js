import {shashwat} from "../utils/asyncHandler.js";

 const registeruser = shashwat(async (req,res) =>{
   res.status(200).json({
    messsage:"register user"
   })
 })

export {registeruser}
