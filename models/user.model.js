const mongoose= require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const validator = require("validator")

const UserSchema= mongoose.Schema({
    userName:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        minLength:3,
        maxLength:10
    },
    password:{
        type:String,
        trim:true,
        minLength:4,
        maxLength:15,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        validate: function(value){if(!validator.isEmail(value)) throw new Error("invalid email")}
    },
    imgProfile:{
        type:String,
        trim:true,
    },
    userType:{
        type:String,
        trim:true,
        enum:["admin","user"]
    },
    // tokens:[{
    //     token:{
    //         type:String,
    //          required:true
    //     }}]
},{timestamps:true})

const User = mongoose.model("Users",UserSchema)
module.exports= User