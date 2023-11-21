const express = require("express");
const product = require("../controllers/product.controller");
const multer = require("multer");

// Cấu hình Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Đường dẫn lưu trữ tệp
    cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    // Đặt tên tệp
    cb(null, file.originalname);
  },
});

// Tạo middleware Multer
const upload = multer({ storage: storage });

const router = express.Router();

router.post("/create", product.create);
router.post("/images/upload", upload.single("image"), product.uploadImage);
router.put("/images/update/:id", upload.single("image"), product.updateImage);

router.get("/find", product.findAll);
router.get("/find/:id", product.findOne);
router.get("/categories/get", product.getAllCategories);
router.get("/images/get/:id", product.getImage);

router.put("/update/:id", product.update);

router.delete("/delete", product.deleteAll);
router.delete("/delete/:id", product.deleteOne);

// router.get("/list", product.list);
// router.get("/find/:id", product.findOne);
// router.get("/search/:key", product.search);
// router.get("/images/get/:id", product.getImage);
// router.get("/categories/get", product.getCategories);

module.exports = router;
