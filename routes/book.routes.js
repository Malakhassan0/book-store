const router = require("express").Router()
const book= require("../controller/book.controller")
const { auth,authAdmin, authUser } = require("../middleware/auth.middleware")
const upload = require('../middleware/uploadFileImg')

router.post("/addBook",auth,authAdmin,upload.single("bookImg"),book.addBook)
router.get("/singleBook/:id",book.singleBook)
router.get("/allBooks",book.showAllBooks)
router.delete("/delBook/:id",auth,authAdmin,book.deleteBook)
//cart
router.post("/AddToCart/:id",auth,authUser,book.AddToCart)
router.delete("/removeAllCart",auth,authUser,book.removeAllCart)
router.delete("/removeFromCart/:id",auth,authUser,book.removeFromCart)
router.get("/cartItems",auth,authUser,book.allCartItems)
router.post("/orderData/:id",auth,authUser,book.newOrder)

module.exports= router