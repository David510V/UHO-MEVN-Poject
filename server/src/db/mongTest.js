const mongoose=require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/uho-store-test',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false 
})
