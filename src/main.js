const helmet = require("helmet")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const express = require("express")
const path = require("path")
const fs = require("fs")

const authRoutes = require("./routes/authRoutes.js")
const productRoutes = require("./routes/productRoutes.js")
const cartRoutes = require("./routes/cartRoutes.js")
const orderRoutes = require("./routes/orderRoutes.js")
const paymentRoutes = require("./routes/paymentRoutes.js")
const userRoutes = require("./routes/userRoutes.js")
const adminRoutes = require("./routes/adminRoutes.js")

const app = express()

app.use(helmet())
app.use(cors({origin: "*"}))
app.use(morgan('combined', { stream: fs.createWriteStream(path.join(__dirname, '../logs/access.log'),{ flags: 'a' }); }));
app.use(cookieParser())
app.use(express.json())

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/product", productRoutes)
app.use("/api/v1/cart", cartRoutes)
app.use("/api/v1/order", orderRoutes)
app.use("/api/v1/payment", paymentRoutes)
app.use("/api/v1/admin", adminRoutes)
app.use("/api/v1/user", userRoutes)

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Terjadi kesalahan pada server';

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
  });
});

module.exports = app

