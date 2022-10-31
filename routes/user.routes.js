const user= require("../controller/user.controller")
const { auth, authUser } = require("../middleware/auth.middleware")
const router = require("express").Router()
const upload = require('../middleware/uploadFileImg')

router.post("/register",user.register)
router.post("/login", user.login)
router.get("/me", auth,authUser,user.me)
router.post("/logout",auth,user.logout)
router.post("/logoutAll",auth,user.logoutall)
router.patch("/edituser",auth,user.editPro)
router.post("/uploadImage", auth, upload.single("image"), user.addImgProfile); // add profile image

module.exports= router