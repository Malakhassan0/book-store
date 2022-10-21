const userModel = require("../models/user.model")
const {resBuilder}= require("../helper/app.helper")

class User{
   static register = async (req,res)=>{
    try{
        const userData=  new userModel(req.body)
        await userData.save()
        resBuilder(res,true,userData,"added successfully") 
    }
    catch(e){
        resBuilder(res,false,e,e.message) 
    }
   }
   static singleUser = async (req,res)=>{
    try{
        const userData= await userModel.findById(req.params.id)  
        if(!userData) throw new Error("user not found")
        resBuilder(res,true,userData,"user details")
    }
    catch(e){
        resBuilder(res,false,e,e.message) 
    }
   }
   static showAllUsers = async (req,res)=>{
    try{
        const userData= await userModel.find()  
        if(!userData) throw new Error("user not found")
        resBuilder(res,true,userData,"All users")
    }
    catch(e){
        resBuilder(res,false,e,e.message) 
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
    static profile = async(req,res)=>{
        resBuilder(res,true,req.user,"all users") 
    }
}


module.exports= User