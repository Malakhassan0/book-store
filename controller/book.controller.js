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
       static editBook = async(req,res)=>{
        try{
            const bookData= await bookModel.findById(req.params.id)
            if(!bookData) throw new Error("book not found")
            const allowedEdits = ["title","price","category","author"]
            const keys = Object.keys(req.body)
            const valid = keys.every(el=> allowedEdits.includes(el))
            if(!valid) throw new Error("invalid edit keys")
            keys.forEach(k=> bookData[k]= req.body[k])
            await bookData.save()
            resBuilder(res,true,bookData,"book is updated") 
        }
        catch(e){
            resBuilder(res,false,e,e.message)
        }
       }
       static showbyCategory = async(req,res)=>{
        try{
            // const cat = await  bookModel.find( req.book.category)
            const bookCat = await bookModel.find({category:req.params.category})
            // const bookCat = bookModel.find(req.params.category).populate("",bookModel)
            resBuilder(res,true,bookCat,"books with the same category")
        }
        catch(e){
            resBuilder(res,false,e,e.message)
        }
       }
       static showbytitle = async(req,res)=>{
        try{
            const book = await bookModel.find({title:req.params.name})
            resBuilder(res,true,book,"here's the book")
        }
        catch(e){
            resBuilder(res,false,e,e.message)
        }
       }

   
      
}
module.exports= Book