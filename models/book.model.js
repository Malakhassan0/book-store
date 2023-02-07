const mongoose= require("mongoose")

const bookSchema= mongoose.Schema({
    adminId:{ type:mongoose.Schema.Types.ObjectId,required:true},
    title:{
        type:String,
        trim:true,
        required:true
    },
    subtitle:{
        type:String,
        trim:true,
        // required:true
    },
    content:{
        type:String,
        trim:true,
        // required:true
    },
    author:{
        type:String,
        trim:true,
        required:true
    },
    category:{
         type:String,
         trim:true,
         required:true
    },
    price: {
        type: Number,
        required: true
    },
    bookImg:{
        type:String,
        trim:true,
        required:true
    },
    publisher:{
        type:String,
        trim:true,
    }
    // rates:[{
    //     rate:{
    //     type:String,
    //     trim:true,
    //     // required:true,
    //     userId:mongoose.Schema.Types.ObjectId
    // }}],
    
},{timestamps:true})

// bookSchema.virtual("cartItems", {
//     ref:"Order",
//     localField:"_id",
//     foreignField:"orderItems.bookId"
// })

const Book = mongoose.model("Books",bookSchema)
module.exports= Book