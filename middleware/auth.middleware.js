const jwt = require("jsonwebtoken")
const userModel= require("../models/user.model")
const {resBuilder}= require("../helper/app.helper")

class Authorization{

    static auth= async(req,res,next)=>{
    try{
        const token = req.header("Authorization").replace("bearer ","")
        const decoded= jwt.verify(token,process.env.JWTKEY)
        const userData= await userModel.findOne({
            _id:decoded._id,
            "tokens.token":token
        })
        if(!userData) throw new Error("unauthorized")
        res.user= userData
        res.token=token
        next()
       }
        catch(e){
            resBuilder(res,false,e,e.message)
        }
    }

    static authUser= async(req,res,next)=>{
        try{
            if(req.user.userType!="admin") throw new Error("Not an admin")
            next()
        }
        catch(e){
            resBuilder(res,false,e,e.message)
        }
    }
    static authAdmin= async(req,res,next)=>{
        try{
            if(req.user.userType!="user") throw new Error("Not a user")
            next()
        }
        catch(e){
            resBuilder(res,false,e,e.message)
        }
    }
}

module.exports= Authorization