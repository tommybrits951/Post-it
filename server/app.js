require("dotenv").config()
const express = require("express")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const cookieParser = require("cookie-parser")

const app = express()
const PORT = process.env.PORT

app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload())
app.use("/user", require("./routes/userRoutes"))
app.use("/auth", require("./routes/authRoutes"))
app.use("/board", require("./routes/boardRoutes"))
app.use("/post", require("./routes/postRoutes"))
app.use("/fav",  require("./routes/favRoutes"))
app.use("/images", express.static("images"))

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})