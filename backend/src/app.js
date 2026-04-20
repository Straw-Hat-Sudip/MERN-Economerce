const express = require ("express")
const authRoutes = require("./routes/authRoutes")
const productsRoutes = require("./routes/productsRoutes")
const cartRoutes = require("./routes/cartRoutes")
const addressRoutes = require('./routes/addressRouth')
const orderRoutes = require("./routes/orderRoutes")
const cors = require("cors")

const app = express();

app.use(cors())
app.use(express.json())



app.use("/api/auth", authRoutes)

app.use("/api/products", productsRoutes)

app.use("/api/cart", cartRoutes)

app.use("/api/address", addressRoutes)

app.use("/api/orders", orderRoutes)


module.exports = app;