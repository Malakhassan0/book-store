const mongoose= require("mongoose")

const bookSchema= mongoose.Schema({
    adminId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
        
    },title:{
        type:String,
        trim:true,
        required:true
    },
    content:{
        type:String,
        trim:true,
        required:true
    },
    author:{
        type:String,
        trim:true,
        required:true
    },
    bookImg:{
        type:String,
        trim:true,
        required:true
    },
    rates:[{
        rate:{
        type:String,
        trim:true,
        required:true,
        userId:mongoose.Schema.Types.ObjectId
    }}],
    // cart:[{
    //     userId:mongoose.Schema.Types.ObjectId
    // }]
},{timestamps:true})

const Book = mongoose.model("Books",UserSchema)
module.exports= Book