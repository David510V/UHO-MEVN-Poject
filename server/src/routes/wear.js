const express=require('express')
const multer=require('multer')
const sharp=require('sharp')
const router=new express.Router()
const Wear=require('../models/wear.js')
const auth=require('../middleware/auth.js')


const upload=multer({
    limits:{
        fieldSize:800000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error("Please Upload An Image"))
        }
        cb(undefined,true)
    }
})


router.post('/wear',upload.single('img'),async(req,res)=>{
    const wear=new Wear(req.body)
    wear.img=await sharp(req.file.buffer).toBuffer()
    try{
        await wear.save()
        res.status(200).send(wear)
    }
    catch(e){
        res.status(404).send(e)
    }
})

router.get('/wear',async(req,res)=>{
    
    try{
        const wears=await Wear.find({})
        res.status(200).send(wears)
    }
    catch(e)
    {
        res.status(404).send(e)
    }
})


module.exports = router