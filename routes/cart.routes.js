const router = require("express").Router()
const cart= require("../controller/cart.controller")
const { auth,authAdmin, authUser } = require("../middleware/auth.middleware")
// const upload = require('../middleware/uploadFileImg')

router.post("/AddToCart/:id",auth,authUser,cart.AddToCart)
router.delete("/removeAllCart",auth,authUser,cart.removeAllCart)
router.delete("/removeFromCart/:id",auth,authUser,cart.removeFromCart)
router.get("/cartItems",auth,authUser,cart.allCartItems)

module.exports= router