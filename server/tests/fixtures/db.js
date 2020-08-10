const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')

const User=require('../../src/models/user.js')
const Wear=require('../../src/models/wear.js')
const Item=require('../../src/models/item.js')
require('dotenv').config({path:'./environment/test.env'})


const userId=new mongoose.Types.ObjectId()
const userOne={
    _id:userId,
    nickname:'David',
    email:"solo@gmail.com",
    password:"1234567",
    tokens:[{
        token:jwt.sign({_id:userId},process.env.JWT_API)
    }]
}

const userTwoId=new mongoose.Types.ObjectId()
const userTwo={
    _id:userTwoId,
    nickname:'Vinter',
    email:"Monk@gmail.com",
    password:"1234567",
    // tokens:[{
    //     token:jwt.sign({_id:userTwoId},process.env.JWT_API)
    // }]
}



const setUpDatabase=async()=>{
    await User.deleteMany()
    await Wear.deleteMany()
    await Item.deleteMany()
    await new User(userOne).save()
    // await new User(userTwo).save()
   
}

module.exports={
    userId,
    userOne,
    userTwoId,
    userTwo,
    setUpDatabase
}