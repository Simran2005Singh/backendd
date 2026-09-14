import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {registeruser} from './controllers/user.controller.js';
const app=express();
app.use(cors({
    origin:process.env.app_URL,
    credentials:true
}));
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true}))
app.use(express.static('public')  )
app.use(cookieParser());

//here the control is shifted to the user routes file where we have defined the route for register user
//also the url will be like https://localhost:3000/users/registers

import userroutes from './routes/user.routes.js';
app.use("api/v1/users",userroutes)




export {app};
 




