const router = require("express").Router()
const book= require("../controller/book.controller")
const { auth,authAdmin, authUser } = require("../middleware/auth.middleware")
const upload = require('../middleware/uploadFileImg')

router.post("/addBook",auth,authAdmin,upload.single("bookImg"),book.addBook)
router.get("/singleBook/:id",book.singleBook)
router.get("/allBooks",book.showAllBooks)
router.delete("/delBook/:id",auth,authAdmin,book.deleteBook)
router.get("/category/:category",book.showbyCategory)
router.get("/title/:name",book.showbytitle)
router.patch("/editbook/:id",auth,authAdmin,book.editBook)



module.exports= router