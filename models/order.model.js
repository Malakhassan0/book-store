const mongoose = require('mongoose')
const validator = require("validator")


const orderSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,   
        require:true  
    },
    createdAt:{
        type: String,
        default: Date.now()
    },
    status: {
      type: String,
      default: "Processing",
      enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Recieved"]
    },
    phoneNumber:{
           type:String,
           required:true,
           validate: (value) => {
            if (!validator.isMobilePhone(value, "ar-EG"))throw new Error("invalid phone Number");
          },
    },
     orderItems:[ { 
             bookId: {
                   type: mongoose.Schema.Types.ObjectId,
                        required: true,
                        ref: 'Book'
                    },
                    // bookBody:{
                    //     type: mongoose.Schema.Types.Array,
                    //     required: true,
                    //     ref: 'Book'
                    // },
                    quantity: {
                        type: Number,
                        required: true
                    }
                }],
                address: {type:String,required:true,trim:true}
})
// const ORDER_STATUS = {
//   PROCESSED: [0, 'PROCESSED'],
//   DELIVERED: [1, 'DELIVERED'],
//   SHIPPED: [2, 'SHIPPED'],
// };
// OrderSchema.virtual('total').get(function () {
//   let total = 0;
//   for (let i = 0; i < this.orderItems.length; i++)
//       total += this.orderItems[i].price;
//   return total;
// });
// OrderSchema.methods.getOrderStatusString = function () {
//   return ORDER_STATUS[Object.keys(ORDER_STATUS)[this.orderStatus]][1];
// };
   // books: [
    //   {
    //     book: { type: Schema.Types.ObjectId, ref: "Book" },
    //     count: { type: Number, required: true },
    //   }],
    // orderStatus: {type: Number, default: ORDER_STATUS.PROCESSED[0]},
const Order = mongoose.model("Order", orderSchema)

module.exports = Order