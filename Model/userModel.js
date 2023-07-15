const mongoose=require("mongoose")


const userSchema=new mongoose.Schema({
    regNo:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    profilePicture:{
        type:String,
        default:" "
    },
    grade:{
        type:String,
        default:" "
    },
})


const User=mongoose.model("User",userSchema);
module.exports=User;