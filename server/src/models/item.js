const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const wearSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    img:{
        type:Buffer,
    },
    price:{
        type:Number,
        required:true
    },
    category_id:{
        type:String,
        required:true
    }
})

const Item=mongoose.model('Item',wearSchema)

module.exports=Item