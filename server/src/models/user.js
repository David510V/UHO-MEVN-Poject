const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userSchema=new mongoose.Schema({
    nickname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
})


userSchema.methods.connectToken=async function(){
    const user=this
    const token=jwt.sign({_id:user._id.toString()},process.env.JWT_API,{expiresIn:'1h'})

    user.tokens=user.tokens.concat({token})

    await user.save()

    return token
}

userSchema.statics.findUserLog=async(email,password)=>{
    const user= await User.findOne({email})

    if(!user){
        throw new Error("No User Found")
    }

    const match= await bcrypt.compare(password,user.password)

    if(!match){
        throw new Error("Not matching Password")
    }
    return user
}

userSchema.pre('save',async function(next){
    const user=this

    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    }
    
    next()
})

const User=mongoose.model('User',userSchema)

module.exports=User