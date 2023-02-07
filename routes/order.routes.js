const router = require("express").Router()
const order= require("../controller//order.controller")
const { auth,authAdmin, authUser } = require("../middleware/auth.middleware")

router.post("/orderData",auth,authUser,order.newOrder)
router.delete("/delOrder/:id",auth,authUser,order.delOrder)

module.exports= router
