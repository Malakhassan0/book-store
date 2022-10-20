const userModel = require("../models/user.model")

class User{
   static register = async (req,res)=>{
    try{
        const userData=  new userModel(req.body)
        await userData.save()
        res.status(200).send({apiStatus:true, data:userData, message:"added successfully"})
    }
    catch(e){
        res.status(500).send({apiStatus:false, data:e, message:e.message})
    }
   }
   static singleUser = async (req,res)=>{
    try{
        const userData= await userModel.findById(req.params.id)  
        if(!userData) throw new Error("user not found")
        res.status(200).send({apiStatus:true, data:userData, message:"user details"})
    }
    catch(e){
        res.status(500).send({apiStatus:false, data:e, message:e.message})
    }
   }
   static showAllUsers = async (req,res)=>{
    try{
        const userData= await userModel.find()  
        if(!userData) throw new Error("user not found")
        res.status(200).send({apiStatus:true, data:userData, message:"all users"})
    }
    catch(e){
        res.status(500).send({apiStatus:false, data:e, message:e.message})
    }
   }
   static logout = async(req,res)=>{}
    static logoutall = async(req,res)=>{
        try{
            req.user.tokens= []
            await req.user.save()
            res.status(200).send({apiStatus:true, data:[], message:"no users"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e, message:e.message})
        }
    }
    static profile = async(req,res)=>{}
}

module.exports= User