const router = require("express").Router()
const book= require("../controller/book.controller")
const { auth,authAdmin, authUser } = require("../middleware/auth.middleware")
const upload = require('../middleware/uploadFileImg')

router.post("/addBook",auth,authAdmin,upload.single("bookImg"),book.addBook)
router.get("/singleBook/:id",book.singleBook)
router.get("/allBooks",book.showAllBooks)
router.delete("/delBook/:id",auth,authAdmin,book.deleteBook)




module.exports= router