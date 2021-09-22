const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        default:"",
    },
    name:{
        type:String,
        default:"",
    },
    address:{
        type:String,
        default:"",
    },
    mobileno :{
        type:Number,
        default:0
    },
    phototest :{
        type:Buffer,
        required: false
    }
},{timestamps: true})

const User = mongoose.model('User', UserSchema)

module.exports = User