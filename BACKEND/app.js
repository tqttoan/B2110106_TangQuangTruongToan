const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");
const session = require("express-session");

const adminRouter = require("./app/routes/admin.route");
const userRouter = require("./app/routes/user.route");
const productRouter = require("./app/routes/product.route");
const cartRouter = require("./app/routes/cart.route");
const orderRouter = require("./app/routes/order.route");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to shopping application!" });
});

app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// handle 404 error
app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});

// handle error
app.use((err, req, res, next) => {
  return res
    .status(err.statusCode || 500)
    .json({ message: err.message || "Internal Server Error" });
});

module.exports = app;
