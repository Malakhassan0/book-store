const user= require("../controller/user.controller")
const { auth, authUser } = require("../middleware/auth.middleware")
const router = require("express").Router()

router.post("/register",user.register)
router.post("/login", user.login)
router.get("/me", auth,authUser,user.me)
router.post("/logout",auth,user.logout)
router.post("/logoutAll",auth,user.logoutall)
router.patch("/edituser",user.editPro)

module.exports= router