// const bookModel = require("../models/book.model")
const {resBuilder}= require("../helper/app.helper")
const { findByIdAndRemove, findOneAndRemove } = require("../models/book.model")
const bookModel= require("../models/book.model")
const orderModel = require("../models/book.model")
const userModel = require("../models/user.model")

class Book{
    static addBook= async(req,res)=>{
        try{
            const book = new bookModel(req.body)
            book.bookImg = req.file.path.replace("static\\", "")
            book.adminId= req.user._id
            await book.save()
            resBuilder(res,true,book,"book is added")
        }
        catch(e){
            resBuilder(res,false,e,e.message)
        }
    }
    static singleBook = async (req,res)=>{
        try{
            const bookData= await bookModel.findById(req.params.id)
            if(!bookData) throw new Error("book not found")
            resBuilder(res,true,bookData,"book details")
        }
        catch(e){
            resBuilder(res,false,e,e.message) 
        }
       }
    static showAllBooks = async (req,res)=>{
        try{
            const bookData= await bookModel.find()  
            if(!bookData) throw new Error("book not found")
            resBuilder(res,true,bookData,"All Books")
        }
        catch(e){
            resBuilder(res,false,e,e.message) 
        }
       }
    static deleteBook = async(req,res)=>{
        try{
            const delBook = bookModel.findById(req.params.id)
            const Data= await delBook.remove() 
            resBuilder(res,true,Data,"Book is deleted")
        }
        catch(e){
            resBuilder(res,false,e,e.message) 
        }
       }
       //////////////////////////////////////////////
    static AddToCart = async (req,res)=>{
        try{
            const bookData= await bookModel.findById(req.params.id)
             if(!bookData) throw new Error("book is not found")
             const bookCart = req.user.cart.find(el=> el.bookId==req.params.id)
             if(bookCart) throw new Error("you have added book already")
             req.user.cart.push({bookId:req.params.id,quantity:req.body.quantity})
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
    ///////////////////////////////////////////////////
    static newOrder = async(req,res)=>{
        try{
            const data =req.user.cart
            const orderData= new orderModel({userId:req.params.id,orderItems:data,...req.body})
        //    orderModel.orderItems.push(data)
            // console.log(orderData)
            await orderData.save()
            resBuilder(res,true,orderData,"order is added")
        }
        catch(e){
            resBuilder(res,false,e,e.message)
        }
    }
}
module.exports= Book