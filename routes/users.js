const express = require('express')
const User = require('../models/User')
const Post = require('../models/Post')
const Test = require('../models/testmodel.js')
const router =  new express.Router()
const bcrypt = require('bcryptjs')


// TO UPDATE THE USER 
router.put('/:id', async(req,res) => {
    if(req.body.userId === req.params.id) {
        if(req.body.password){
            req.body.password = await bcrypt.hash(req.body.password,8)
       }
        try{
            const photot = await Test.findOne({})
            if (!photot){
                const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set: req.body
                },{new: true})
                res.status(200).json(updatedUser)
            } else {
                const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set: {...req.body,
                phototest: photot.phototest}
                },{new: true})
                res.status(200).json(updatedUser)
            }
        }catch (err) {
            console.log(err)
            res.status(500).json(err)    
        }
        await Test.deleteMany()
    } else {
        res.status(401).json("you can update your account only")
    }

})
// To DELETE AN USER  

router.delete('/:id', async(req, res) => {
        if(req.body.userId === req.params.id) {
            const user = await User.findById(req.params.id)
            if (!user){
                return res.status(404).json("USer not found!")
            }
            try{
                await Post.deleteMany(({ username:user.username }))
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json('User has been deleted...')
                }
            catch (err) {
                    res.status(500).json(err)
                }
        } else {
            res.status(401).json("you can delete your account only")
        }
    
})


// GET USER 

router.get("/:id", async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user){
            return res.status(404).json("Not Found")
        }
        const {password, ...others} = user._doc
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(err)
    }
})

module.exports = router ; 