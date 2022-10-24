const admin = require("../controller/admin.controller")
const { auth,authAdmin } = require("../middleware/auth.middleware")
const router = require("express").Router()

router.post("/addAdmin",auth,authAdmin,admin.addAdmin)
router.get("/singleUser/:id",auth,authAdmin,admin.singleUser)
router.get("/allUsers",admin.showAllUsers)
router.delete("/delUser/:id",auth,authAdmin,admin.delete)


module.exports= router