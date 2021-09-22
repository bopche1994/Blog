const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true,
        unique:true
    },
    desc : {
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:false
    },
    username:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:false
    },
    phototest :{
        type:Buffer,
        required: false
    }
},{timestamps: true})

const Post = mongoose.model('Post', postSchema)

module.exports = Post