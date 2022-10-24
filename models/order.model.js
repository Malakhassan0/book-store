const mongoose = require('mongoose')
// const moment = require('moment')
const orderSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,   
        require:true  
    },
    createdAt:{
        type: String,
        default: Date.now()
    },
        books: [
            {
              book: {
                type: Object,
                required: true,
                // bookId:mongoose.Schema.Types.ObjectId
                // ref:"Book"
              },
              quantity: {  type: Number,required: true }
            }],
    // amount:{type: Number, required: true}
})
const Order = mongoose.model("Order", orderSchema)

module.exports = Order