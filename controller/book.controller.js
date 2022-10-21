const bookModel = require("../models/book.model")
const {resBuilder}= require("../helper/app.helper")

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
}
module.exports= Book