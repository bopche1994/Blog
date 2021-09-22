const express = require('express')
const User = require('../models/User')
const router =  new express.Router()
const bcrypt = require('bcryptjs')
// //REGISTER
router.post('/register', async(req,res) => {
    try{
        const hashedpassword = await bcrypt.hash(req.body.password,8)
        const newUser = new User({
            username: req.body.username,
            email:req.body.email,
            password: hashedpassword
        })

        const user = await newUser.save()
        res.status(200).json(user)
    }catch (err) {
        res.status(500).json(err)
    }
})
// //LOGIN

router.post('/login', async(req, res) => {
    try {
        const user = await User.findOne({username: req.body.username})
        if(!user){
            return res.status(404).json("wrong credentials!")
        } 
        const validated = await bcrypt.compare(req.body.password , user.password)
        if(!validated){
            return res.status(404).json("wrong credentials!")
        }
        const {password, ...others} = user._doc;
        res.status(200).json(others)

    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router ; 