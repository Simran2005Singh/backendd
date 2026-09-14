// require(`dotenv`).config();

import dotenv from "dotenv"
import connectdb from './db/index.js';
import {app} from './app.js'
dotenv.config({
    path: './.env'
})


connectdb()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`Server is running on port ${process.env.PORT||8000}`);
    })
})
.catch((error)=>{
    console.log("Error:",error);
    throw error;
}   )



// import express from "express";
// (async ()=>{
//     try {
//         await mongoose.connect(`${process.env.MONGO_URI}/${db_name}`)

//     }
//     catch(error){
//         console.log("Error:",error);
//         throw error;
//     }
// } 

// )
