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
        // required:true
    }
})

const Wear=mongoose.model('Wear',wearSchema)

module.exports=Wear