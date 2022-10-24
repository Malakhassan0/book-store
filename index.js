const app= require("./src/src.js")
const PORT = process.env.PORT

app.listen(PORT, ()=>console.log(`http://localhost:${PORT}`))
