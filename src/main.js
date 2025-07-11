const helmet = require("helmet")
const cookieParser = require("cookie-parser")
const morgan = require("morgan")
const cors = require("cors")
const express = require("express")
const path = require("path")
const fs = require("fs")
const { NotFoundError } = require("./utils/customError")
const cacheControl = require("./utils/cacheControl")
const checkRequestLatency = require("./middlewares/checkRequestLatency")

const authRoutes = require("./routes/authRoutes")
const productRoutes = require("./routes/productRoutes")
const cartRoutes = require("./routes/cartRoutes")
const orderRoutes = require("./routes/orderRoutes")
const paymentRoutes = require("./routes/paymentRoutes")
const userRoutes = require("./routes/userRoutes")
const adminRoutes = require("./routes/adminRoutes.js")

const app = express()

app.use(helmet())
app.use(helmet.hsts({
  maxAge: 2147483647,
  includeSubDomains: true,
  preload: true
}));

app.use(cors({origin: "*"}))
app.use(morgan('combined', { stream: fs.createWriteStream(path.join(__dirname, '../logs/access.log'),{ flags: 'a' }) }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.json())
app.use(cacheControl(3600))

app.get("/",(req,res) => res.send(req.url))
app.use("/api/v1/auth", checkRequestLatency, authRoutes)
app.use("/api/v1/product", checkRequestLatency, productRoutes)
app.use("/api/v1/cart", checkRequestLatency, cartRoutes)
app.use("/api/v1/order", checkRequestLatency, orderRoutes)
app.use("/api/v1/payment", checkRequestLatency, paymentRoutes)
app.use("/api/v1/admin", checkRequestLatency, adminRoutes)
app.use("/api/v1/user", checkRequestLatency, userRoutes)

app.use("*",(req,res,next) => next(new NotFoundError("Halaman tidak ditemukan!")))

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.stack || 'Terjadi kesalahan pada server';

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
  });
});

module.exports = app

