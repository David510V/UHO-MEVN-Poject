const express=require('express');
const test=express();
const port=process.env.PORT || 3080
require('dotenv').config({path:'./environment/test.env'})
require('./db/mongTest.js')
app.use(express.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
  

const wearRouter=require('./routes/wear.js')
const userRouter=require('./routes/user.js')
const itemRouter=require('./routes/item.js')
const router=new express.Router()

app.use(wearRouter)
app.use(itemRouter)
// app.use(userRouter)


app.listen(port,()=>{
    console.log("Server is up on " +port)
})


module.exports=app