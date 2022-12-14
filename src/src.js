const express = require("express")
const path= require("path")
const userRoutes = require("../routes/user.routes")
const adminRoutes = require("../routes/admin.routes")
const bookRoutes = require("../routes/book.routes")
const cartRoutes = require("../routes/cart.routes")
const orderRoutes = require("../routes/order.routes")
const cors = require("cors")
const app = express()

require("dotenv").config()
require("../db/connect")

app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"../static")))
app.use(express.json())
app.use(cors())
app.use("/api/user",userRoutes)
app.use("/api/admin",adminRoutes)
app.use("/api/book",bookRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/order",orderRoutes)

module.exports=app