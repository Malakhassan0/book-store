const book= require("../controller/book.controller")
const { auth,authAdmin } = require("../middleware/auth.middleware")
const router = require("express").Router()
const upload = require('../middleware/uploadFileImg')

router.post("/addBook",auth,authAdmin,upload.single("img"),book.addBook)

module.exports= router