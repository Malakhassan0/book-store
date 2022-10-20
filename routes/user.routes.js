const user= require("../controller/user.controller")
const router = require("express").Router()

router.post("/register",user.register)
router.get("/single/:id",user.singleUser)
router.get("/",user.showAllUsers)

module.exports= router