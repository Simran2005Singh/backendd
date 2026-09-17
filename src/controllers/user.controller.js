import {asynchandler} from "../utils/asyncHandler.js";
import apierror from "../utils/Apierror.js";
import {user} from "../models/user.model.js";
import {apiresponse} from "../utils/apiresponse.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
 const registeruser = asynchandler(async (req,res) =>{
   res.status(200).json({
    messsage:"register user"
   })
   const {username,email,password,fullname}=req.body
   console.log("email",email);
 
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
//this is localpath as the files are not uploaded in cloudinary 
const localpath =req.files?.avatar[0]?.path ;
const coverimagelocalpath =req.files?.coverImage[0]?.path;
if(!localpath){
  throw new apierror(400, "Avatar is required ")
}

const avatar= await uploadOnCloudinary(localpath)
const coverimage= await uploadOnCloudinary(coverimagelocalpath)
if(!avatar){
  throw new apierror(400,"Avatar is reqired")
}
const user =user.create({
  fullname,
  avatar : avatar.url,
  coverimage :coverimage?.url || "",
  email,
  password,
  username:username.toLowerCase()
})

 const usercreated = await user.findById(user._id).select(
  "-password -refreshtoken"
 )
 if(!usercreated){
  throw new apierror(500,"user not created")
 }

return res.status(201).json(
  new apiresponse(200,usercreated,"user is registered")
)
})

export {registeruser}
