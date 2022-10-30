const {resBuilder}= require("../helper/app.helper")
const orderModel = require("../models/order.model")

class Order{

    static newOrder = async(req,res)=>{
        try{
            const orderData= new orderModel({userId:req.user._id,orderItems:req.user.cart,...req.body})
            // orderModel.orderItems.push(req.user.cart)
            // console.log(req.user.cart)
            await orderData.save()
            resBuilder(res,true,orderData,"new order is created")
        }
        catch(e){
            resBuilder(res,false,e,e.message)
        }
    }
    static delOrder= async(req,res)=>{
        try{
            const found = orderModel.findById(req.params.id)
            if(!found) throw new Error ("there is no order found by this id")
            const ord = await found.remove()
            resBuilder(res,true,ord,"order is removed")
        }
        catch(e){
            resBuilder(res,false,e,e.message)
        }
    }
}
module.exports= Order