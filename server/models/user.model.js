import mongoose from "mongoose";

const userSchema =  new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        requuired:true
    },
    password:{
        type:String,
        required:string
    },
    role:{
        type:string,
        count:["instructer","student"],
        default:'student'
    },
    enrolledCourses:[

    {type:mongoose.Schema.Types.ObjectId,
ref:'course'}
],
photourl:{
    type:string,
    default:""
}
},{timestamps:true});

export const User = mongoose.model("User",userSchemma);