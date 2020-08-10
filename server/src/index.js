const express=require('express');
const app=express();
const cors=require('cors')
require('dotenv').config({path:'./environment/dev.env'})
const port=process.env.PORT 
require('./db/mongoose.js')
app.use(express.json())
app.use(cors())

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', '*')
//   res.header('Access-Control-Request-Method', '*');
//   next();
// });

const wearRouter=require('./routes/wear.js')
const itemRouter=require('./routes/item.js')
const userRouter=require('./routes/user.js')
const router=new express.Router()

app.use(wearRouter)
app.use(itemRouter)
app.use(userRouter)


app.listen(port,()=>{
    console.log("Server is up on " +port)
})