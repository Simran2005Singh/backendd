import {asynchandler} from "../utils/asyncHandler.js";
import apierror from "../utils/Apierror.js";
import {user} from "../models/user.model.js";
import {apiresponse} from "../utils/apiresponse.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";

 const registeruser = asynchandler(async(req,res) =>{
  console.log("BODY", req.body);
  console.log("FILES", req.files);
  //  return res.status(200).json({
  //   messsage:"register user"
  //  })
   const {username,email,password,fullname}=req.body;
   console.log("email",email);
 
//  if(fullname==""){
  // throw new apierror(400,"fullname is required ")
//  }
 //here i can use this condition on every field name by using an array and using some method 
if(
  [fullname,email,username,password].some((field)=> 
    field?.trim() === ""))
   {
      throw new apierror(400,"all the fields should not be empty")
   }
const existed = await user.findOne(
  {  
    $or: [{username},{email}]
  }
)
 if(existed){
  throw new apierror(409, "User already exists")
 }
//this is localpath as the files are not uploaded in cloudinary 
const localpath = req.files?.avatar?.[0]?.path;
const coverimagelocalpath =req.files?.coverimage?.[0]?.path;
console.log("AVATAR PATH:", localpath);
if(!localpath){
  throw new apierror(400, "Avatar is required")
}


const avatar = await uploadOnCloudinary(localpath)

console.log("CLOUDINARY RESPONSE:", avatar);
const coverimage = coverimagelocalpath
? await uploadOnCloudinary(coverimagelocalpath)
: null;
if(!avatar){
  throw new apierror(400,"Avatar is required")
}
const createuser =await user.create({
  fullname,
  avatar : avatar.url,
  coverimage :coverimage?.url || "",
  email,
  password,
  username:username
})

 const usercreated = await user.findById(createuser._id).select(
  "-password -refreshtoken"
 )
 if(!usercreated){
  throw new apierror(500,"user not created")
 }

return res.status(201).json(
  new apiresponse(200,"user is registered",usercreated)
)
})

export {registeruser}
