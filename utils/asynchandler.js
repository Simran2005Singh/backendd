//this is promise method 

const asynchandler=(reqhandler)=>{
    return async(req,res,next)=>{
        promise.resolve(reqhandler(req,res,next)).
        catch((err)=>next(err))
    }
}

export {asynchandler}




//this is try catch method 
// const asynchandler=(fn)=>async(req,res,next)=>{
//     try{
    //await fn(req,res,next)
//     }
//     catch(error){
//         res.status(err.code|| 500).json({
//             success:false,
//             message:error.message || "Internal Server Error"
//         })
//     }
// }