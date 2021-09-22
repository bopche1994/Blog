const express = require('express')
const User = require('../models/User')
const Post = require('../models/Post')
const router =  new express.Router()
const Test = require('../models/testmodel')



// CREATE POST
router.post('/', async(req,res) => {
    // const newPost = new Post(req.body)
    // console.log(req.body)

    try {
        const photot = await Test.findOne({})
        // console.log(photot)
        // console.log(!photot)
        if (!photot){
            const newPost = new Post({...req.body})   
            const savedPost = await newPost.save() 
            res.status(200).json(savedPost)
            // console.log('testing image not there')
        } else {
            const newPost = new Post({...req.body, phototest: photot.phototest})
            const savedPost = await newPost.save()
            res.status(200).json(savedPost)
            // console.log('testing image is there')
        }
        await Test.deleteMany()
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
})
// To update an post  
router.patch('/:id', async(req,res) => {
    try{
        const post = await Post.findById(req.params.id)
        if(post.username === req.body.username) {
            const updatedPost = await Post.findByIdAndUpdate(req.params.id,
                 { $set: req.body},
                 { new: true }
            )
                res.status(200).json(updatedPost)
        }else {
            res.status(404).json("You can update only your post")
        }
    }catch(err){
        res.status(500).json(err)
    }   
})

// To delete an post  
router.delete('/:id', async(req,res) => {
    try{
        const post = await Post.findById(req.params.id)
        if(!post) {
            return res.status(404).json('No post to delete')
        }
        if(post.username === req.body.username) {
            await post.delete()
            res.status(200).json("Post has been deleted")
        }else {
            res.status(404).json("You can delete only your post")
        }
    }catch(err){
        res.status(500).json(err)
    }   
})
// To get an post  
router.get('/:id', async(req,res) => {
    try{
        const post = await Post.findById(req.params.id)
        if(!post) {
            return res.status(404).json('No post to fetch')
        }
        res.status(200).json(post)
    }catch(err){
        res.status(500).json(err)
    }   
})

//To get all Posts
router.get('/', async(req,res) => {
    const username = req.query.user
    const catName = req.query.cat
    try{
        let posts
        if (username) {
            posts = await Post.find({username})
        } else if(catName){
            // posts = await Post.find({categories:{
            //     $in:[catName]
            // }})
            posts = await Post.find({category:catName})
        }else {
            posts = await Post.find({})
        }
        
        res.status(200).json(posts)
    }catch(err){
        res.status(500).json(err)
    }   
})

module.exports = router ; 