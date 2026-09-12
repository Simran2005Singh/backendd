import mongoose from 'mongoose';
import { db_name } from './constant.js';
import connectdb from './db';

dotenv.config({path: './.env'});

const connectdb =async()=>{
    try{
     const connectioninstance= await mongoose.connect(`${process.env.MONGO_URI}/${db_name}`);
        console.log(`MongoDB connected: ${connectioninstance.connection.host}`);

    }
    catch(error){
        console.log("Error:",error);
        process.exit(1);
    }
}
export default connectdb;
