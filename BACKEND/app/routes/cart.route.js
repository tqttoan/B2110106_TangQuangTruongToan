const express = require("express");
const cart = require("../controllers/cart.controller");

const router = express.Router();

router.post("/add", cart.add);

router.get("/list/:id", cart.list);
router.get("/images/get/:id", cart.getImage);

router.put("/update/:id", cart.updateQuantity);

router.post("/delete/many", cart.deleteManyCartItems);
router.delete("/delete/:id", cart.deleteCartItem);
router.delete("/delete/all/:id", cart.deleteAllCart);

module.exports = router;
