const express = require("express");
const user = require("../controllers/user.controller");

const router = express.Router();

router.post("/register", user.register);

router.post("/logIn", user.logIn);

module.exports = router;
