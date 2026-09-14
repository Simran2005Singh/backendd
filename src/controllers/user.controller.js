import {asynchandler} from "../utils/asyncHandler.js";

 const registeruser = asynchandler(async (req,res) =>{
   res.status(200).json({
    messsage:"register user"
   })
 })

export {registeruser}
