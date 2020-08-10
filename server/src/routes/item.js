const express=require('express')
const router=new express.Router()
const multer=require('multer')
const sharp=require('sharp')
const Item=require('../models/item.js')
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

router.post('/item',upload.single('img'),async(req,res)=>{
    const item=new Item(req.body)
    item.img=await sharp(req.file.buffer).toBuffer()
    try{
        await item.save()
        res.status(200).send(item)
    }
    catch(e){
        res.status(500).send(e)
    }
})


router.get('/item',async(req,res)=>{
    
    try{
        const items=await Item.find({})
        
        res.status(200).send(items)
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.get('/category/:id',async(req,res)=>{
    
    try{
        const items=await Item.find({category_id:req.params.id})
        
        res.status(200).send(items)
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.get('/item/:id',async(req,res)=>{
    
    try{
        const item=await Item.findById(req.params.id)
        
        res.status(200).send(item)
    }
    catch(e){
        res.status(500).send(e)
    }
})


module.exports = router