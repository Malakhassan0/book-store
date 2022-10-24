const userModel = require("../models/user.model")
const bookModel = require("../models/book.model")
const {resBuilder}= require("../helper/app.helper")

class User{
   static register = async (req,res)=>{
    try{
        const userData=  new userModel(req.body)
        userData.userType="user"
        await userData.save()
        resBuilder(res,true,userData,"added successfully") 
    }
    catch(e){
        resBuilder(res,false,e,e.message) 
    }
   }
   static login = async(req,res)=>{
       try{
           const userData = await userModel.login(req.body.userName, req.body.password)
           const token = await userData.generateToken()
           resBuilder(res,true, {userData, token}, "logged in")
       }
       catch(e){
           resBuilder(res,false, e, e.message)
       }
}
   static logout = async(req,res)=>{
    try{
        req.user.tokens= req.user.tokens.filter(el=> el.token !=req.token)
        await req.user.save()
        resBuilder(res,true,[],"user logged out") 
    }
    catch(e){
        resBuilder(res,false,e,e.message) 
    }
   }
    static logoutall = async(req,res)=>{
        try{
            req.user.tokens= []
            await req.user.save()
            resBuilder(res,true,[],"All users logged out")
        }
        catch(e){
            resBuilder(res,false,e,e.message) 
        }
    }
    static me = async(req,res)=>{
        resBuilder(res,true,req.user,"all users") 
    }
    static editPro = async(req,res)=>{
        try{
            const allowedEdits = ["userName","email"]
            const keys = Object.keys(req.body)
            const valid = keys.every(el=> allowedEdits.includes(el))
            if(!valid) throw new Error("invalid edit keys")
            keys.forEach(k=> req.user[k]= req.body[k])
            await req.user.save()
            resBuilder(res,true,req.user,"done") 
        }
        catch(e){
            resBuilder(res,false,e,e.message) 
        }
    }
    
}


module.exports=User