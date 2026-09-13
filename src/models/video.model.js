import mongoose from "mongoose";
import moongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoschemma= new mongoose.Schema({
    videofile:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    title:{
        type:String,
        required:true,
        // trim:true
    },
    description:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    views:{
        type:Number,
        default:0
    },
    ispublished:{
        type:Boolean,
        default:true
    }
},{timestamps:true})
videoschemma.plugin(moongooseAggregatePaginate)
export const video = mongoose.model("video",videoschemma)