import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userschemma=new mongoose.Schema({
   
    username:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true
    },
    fullname:{
        type:String,
        require:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String,//cloudinary
        required:true
    },
    coverimage:{
        type:String
    },
    watchhistory:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"video"
    }
    ],
    password:{
        type:String,
        required:true,
    },
    refreshtoken:{
        type:String
    }
},{timestamps:true})
//pre is a hook and save is an event and we cannot write callback as ()=> beacuse this vall back does not have context known so 
//and in this we need context so we will write async function and next is due to middleware 
//round is 10 here 
userschemma.pre("save", async function(){
    if(!this.isModified("password")){
        return;
    }
    this.password = await bcrypt.hash(this.password,10);

});
userschemma.methods.ispasswordcorrect =async function(password){
    return await bcrypt.compare(password,this.password)
}
userschemma.methods.getaccesstoken = function(){
    return jwt.sign({
        _id:this.id,
        email:this.email,
        username:this.username,
        fullname:this.fullname,

    }
,
 process.env.ACCESS_TOKEN_SECRET,{
    expiresIn:process.env.ACCESS_TOKEN_EXPIRE
}
)
}
userschemma.methods.getrefreshtoken = function(){
     return jwt.sign({
        _id:this.id,
        email:this.email,
        username:this.username,
        fullname:this.fullname,
 
    }
,
 process.env.ACCESS_TOKEN_SECRET,{
    expiresIn:process.env.refreshtoken_expires
}
)

}

//jwt is a bearer token 
export const user =mongoose.model("user",userschemma)