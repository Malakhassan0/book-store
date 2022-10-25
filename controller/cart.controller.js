const {resBuilder}= require("../helper/app.helper")
const bookModel= require("../models/book.model")
// const orderModel = require("../models/order.model")

class Cart{
    static AddToCart = async (req,res)=>{
        try{
            const bookData= await bookModel.findById(req.params.id)
            // console.log(bookData)
             if(!bookData) throw new Error("book is not found")
             const bookCart = req.user.cart.find(el=> el.bookId==req.params.id)
             if(bookCart) throw new Error("you have added book already")
             req.user.cart.push({bookId:bookData,bookBody:bookData,quantity:req.body.quantity})
             await req.user.save()
             resBuilder(res,true,req.user,"new book is added")
        }
        catch(e){
            resBuilder(res,false,e,e.message)
        }
    }
    static removeAllCart = async(req,res)=>{
        try{
             req.user.cart=[]
             await req.user.save()
             resBuilder(res,true,req.user,"all books are removed")
        }
        catch(e){
            resBuilder(res,false,e,e.message)
        }
    }
    static removeFromCart = async(req,res)=>{
        try{
            const bookCart = req.user.cart.find(el=> el.bookId==req.params.id)
            if(!bookCart) throw new Error("book is not the cart")
              req.user.cart.remove({bookId:req.params.id})
            //   find(el=> el.bookId!=req.params.id).pull({bookId:req.params.id})
            //   findOneAndDelete({bookId:req.params.id}) 
             await req.user.save()
             resBuilder(res,true,req.user,"book is removed")
        }
        catch(e){
            resBuilder(res,false,e,e.message)
        }
    }
    static allCartItems = async(req,res)=>{
        try{
            const data = await req.user.cart
            console.log(data)
            resBuilder(res,true,data,"All Cart Items")
        }
        catch(e){
            resBuilder(res,false,e,e.message)
        }
    }
}
module.exports= Cart