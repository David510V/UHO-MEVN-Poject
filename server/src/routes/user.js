const express=require('express')
const router=new express.Router()
const User=require('../models/user.js')
const auth=require('../middleware/auth.js')


router.post('/user',async(req,res)=>{
    const user=new User(req.body)

    try{
        await user.save()
        const token=await user.connectToken()
        res.status(201).send(user)
    }
    catch(e){
        res.status(404).send(e)
    }
})

router.post('/user/login',async(req,res)=>{
    try{
        const user=await User.findUserLog(req.body.email,req.body.password)
        const token=await user.connectToken()
        res.status(200).send(user)
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.post('/user/logout',auth,async(req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        res.status(200).send()
    }
    catch(e){
        res.status(500).send('')
    }
})

module.exports = router