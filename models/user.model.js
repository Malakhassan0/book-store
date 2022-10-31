const mongoose= require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const validator = require("validator")

const userSchema= mongoose.Schema({
    userName:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        minLength:3,
        maxLength:10
    },
    password:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        validate: function(value){if(!validator.isEmail(value)) throw new Error("invalid email")}
    },
    imgProfile:{
        type:String,
        trim:true,
        // default:"avtar.jpg"
    },
    userType:{
        type:String,
        trim:true,
        required:true, 
        enum:["admin","user"]
    },
    tokens:[{
        token:{
            type:String,
             required:true
        }}],
         cart:[
                {
                    bookId: {
                        type: mongoose.Schema.Types.ObjectId,
                             required: true,
                             ref: 'Book'
                         },
                        //  bookBody:{
                        //      type: mongoose.Schema.Types.Array,
                        //      required: true,
                        //      ref: 'Book'
                        //  },
                         quantity: {
                             type: Number,
                             required: true
                         },
                        
                }           
            ]
},{timestamps:true})

// userSchema.virtual("admin", {
//     ref:"Book",
//     localField:"_id",
//     foreignField:"adminId"
// })
/////////////////////////////////////////////////////////
// userSchema.methods.addToCart = function(book) {
//     const cartBookIndex = this.cart.items.findIndex(item => {
//       return item.productId.toString() == book._id.toString();
//     });
//     let newQuantity = 1;
//     let updatedCartItems = this.cart ? [...this.cart.items] : [];
  
//     if (cartBookIndex >= 0) {
//       newQuantity = updatedCartItems[cartBookIndex].quantity + 1;
//       updatedCartItems[cartBookIndex].quantity = newQuantity;
//     } else {
//       updatedCartItems.push({
//         bookId: book._id,
//         quantity: newQuantity
//       });
//     }
//     const updatedCart = { items: updatedCartItems };
//     this.cart = updatedCart;
  
//     return this.save();
//   };
  
//   userSchema.methods.removeFromCart = function(bookId) {
//     const updatedCartItems = this.cart.items.filter(
//       item => item.bookId.toString() != bookId.toString()
//     );
//     this.cart.items = updatedCartItems;
//     return this.save();
//   };
//   userSchema.methods.clearCart = function() {
//     this.cart = { items: [] };
//     return this.save()}
 /////////////////////////////////////////
//  userSchema.virtual("userOrder", {
//     ref:"Order",
//     localField:"_id",
//     foreignField:"userId"
// })

//  userSchema.virtual("cartItems", {
//     ref:"Book",
//     localField:"_id",
//     foreignField:"books.userId"
// })

userSchema.methods.toJSON = function(){
    const userData = this.toObject()
    delete userData.__v
    delete userData.password
    // if(userType=="admin") delete userData.cart
    return userData
}
userSchema.pre("save", async function(){
    if(this.isModified("password")) this.password= await bcrypt.hash(this.password, 12)
})

userSchema.statics.login = async(userName, password)=>{
    const userData = await User.findOne({userName})
    if(!userData) throw new Error("invalid username")
    const isvalid = await bcrypt.compare(password, userData.password)
    if(!isvalid) throw new Error("invalid password")
    return userData
}

userSchema.methods.generateToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id}, process.env.JWTKEY)
    user.tokens.push({token})
    await user.save()
    return token
}
const bookModel = require("./book.model")
userSchema.pre("remove", async function(){
    await bookModel.deleteMany({ adminId: this._id } )
})
// userSchema.pre("remove", async function(){
//     await bookModel.deleteOne({ userId: this._id } )
// })

// const orderModel = require("./order.model")
// userSchema.pre("remove", async function(){
//     await orderModel.deleteMany({ UserId: this._id } )
// })


const User = mongoose.model("Users",userSchema)
module.exports= User