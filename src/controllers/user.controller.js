import {asynchandler} from "../utils/asyncHandler.js";
import apierror from "../utils/Apierror.js";
import {user} from "..models/user.model.js";


 const registeruser = asynchandler(async (req,res) =>{
   res.status(200).json({
    messsage:"register user"
   })
   const {username,email,password,fullname}=req.body
   console.log("email",email);
 })
 if(fullname ==""){
  throw new apierror(400,"fullname is required ")
 }
 //here i can use this condition on every field name by using an array and using some method 
if(
  [fullname,email,username,password].some((field)=> 
    field?.trim() === ""))
  {
      throw new apierror(400,"all the fields should not be empty ")
   }
const existed =user.findOne(
  {  
    $or: [{username},{email}]
  }
)
 if(existed){
  throw apierror(409, "User already exists ")
 }













 
export {registeruser}
