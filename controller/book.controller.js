// const bookModel = require("../models/book.model")
const {resBuilder}= require("../helper/app.helper")
const bookModel= require("../models/book.model")
const orderModel = require("../models/order.model")
// const userModel = require("../models/user.model")


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

   
      
}
module.exports= Book