const adminModel = require("../models/user.model")
const {resBuilder}= require("../helper/app.helper")
class Admin {

    static addAdmin = async (req,res)=>{
    try{
        const newAdmin= new adminModel({...req.body, userType:"admin"})
        await newAdmin.save()    
        resBuilder(res,true,newAdmin,"Admin is added")
    }
    catch(e){
        resBuilder(res,false,e,e.message) 
    }
     }
    static singleUser = async (req,res)=>{
        try{
            const userData= await adminModel.findById(req.params.id) 
            if(!userData) throw new Error("user is not found")
            resBuilder(res,true,userData,"user details")
        }
        catch(e){
            resBuilder(res,false,e,e.message) 
        }
       }
    static showAllUsers = async (req,res)=>{
        try{
            const userData= await adminModel.find({userType:"user"})
            if(!userData) throw new Error("no users")
            // const check = userData.userType.find(el=> el.userType!=req.user.userType("admin"))       
            resBuilder(res,true,userData,"All users")
        }
        catch(e){
            resBuilder(res,false,e,e.message) 
        }
       }
       static delete = async(req,res)=>{
        try{
            const delUser = adminModel.findById(req.params.id)
            const Data= await delUser.remove() 
            resBuilder(res,true,Data,"user is deleted")
        }
        catch(e){
            resBuilder(res,false,e,e.message) 
        }
       }
}
module.exports = Admin