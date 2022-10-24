const user= require("../controller/user.controller")
const { auth, authUser } = require("../middleware/auth.middleware")
const router = require("express").Router()

router.post("/register",user.register)
router.post("/login", user.login)

module.exports= router