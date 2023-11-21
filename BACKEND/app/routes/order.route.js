const express = require("express");
const order = require("../controllers/order.controller");

const router = express.Router();

router.post("/checkout", order.checkoutOrders);
router.get("/get/:id", order.getOrdersOfUser);

module.exports = router;
