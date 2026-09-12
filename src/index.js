// require(`dotenv`).config();

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {db_name} from './constant.js';
import connectdb from './db.js';
dotenv.config({path: './.env'});
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
