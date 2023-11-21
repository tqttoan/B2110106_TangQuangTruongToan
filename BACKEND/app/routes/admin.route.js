const express = require("express");
const admin = require("../controllers/admin.controller");

const router = express.Router();

router.post("/signUp", admin.signUp);

router.post("/signIn", admin.signIn);

router.get("/employees/get", admin.getEmployeesList);

router.get("/employees/find/:id", admin.getEmployee);

router.delete("/employees/delete/all", admin.deleteAllEmployees);

router.delete("/employees/delete/:id", admin.deleteEmployee);

router.put("/employees/update/:id", admin.updateEmployee);

module.exports = router;
