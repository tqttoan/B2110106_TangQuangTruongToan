const ProductServices = require("../services/product.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const fs = require("fs");

// create a new product and add some its images into images colollection
exports.create = async (req, res, next) => {
  const {
    name,
    category,
    author,
    publisher,
    publishingYear,
    discription,
    price,
    quantity,
  } = req.body;
  try {
    const ProductService = new ProductServices(MongoDB.client);

    const product = {
      name,
      category,
      author,
      publisher,
      publishingYear,
      discription,
      price,
      quantity,
    };
    // console.log(product);

    const categories = await ProductService.createCategory({
      name: category,
    });
    const productResult = await ProductService.create(product);

    return res.send({
      message: "Sản phẩm đã được thêm thành công.",
      product: productResult,
    });
    // } else return res.send({ message: "Product is already created" });
  } catch (err) {
    return new ApiError(500, "An error occurred while creating new product.");
  }
  // } else return res.send({ message: "Please enter information fully" });
};

// upload image
exports.uploadImage = async (req, res, next) => {
  let img = fs.readFileSync(req.file.path);
  let encode_image = img.toString("base64");
  // Define a JSONobject for the image attributes for saving to database

  let finalImg = {
    contentType: req.file.mimetype,
    image: Buffer.from(encode_image, "base64"),
    product: req.body.product,
  };
  try {
    const ProductService = new ProductServices(MongoDB.client);
    let result = await ProductService.saveImage(finalImg);
    return res.send(result);
  } catch (err) {
    console.log(err);
  }
};

// find an image of product
exports.getImage = async (req, res, next) => {
  try {
    const ProductService = new ProductServices(MongoDB.client);
    const result = await ProductService.findImage(req.params.id);
    if (result) {
      res.contentType("image/jpeg");
      res.send(result.image.buffer);
    } else return res.send("Không tìm thấy hình ảnh của sản phẩm.");
  } catch (err) {
    console.log(err);
  }
};

// update image
exports.updateImage = async (req, res, next) => {
  let img = fs.readFileSync(req.file.path);
  let encode_image = img.toString("base64");

  let finalImg = {
    contentType: req.file.mimetype,
    image: Buffer.from(encode_image, "base64"),
    product: req.body.product,
  };
  try {
    const ProductService = new ProductServices(MongoDB.client);

    let result = await ProductService.updateImage(req.params.id, finalImg);
    return res.send(result);
  } catch (err) {
    console.log(err);
  }
};

// find all categories
exports.getAllCategories = async (req, res, next) => {
  try {
    const ProductService = new ProductServices(MongoDB.client);
    const result = await ProductService.findAllCategories();
    return res.send(result);
  } catch (err) {
    return new ApiError(
      500,
      "An error occurred while finding types of products."
    );
  }
};

// find all products
exports.findAll = async (req, res, next) => {
  try {
    const ProductService = new ProductServices(MongoDB.client);
    const productArray = await ProductService.findAll();
    // const productArray = await ProductService.findImages();
    return res.send(productArray);
  } catch (err) {
    return new ApiError(500, "An error occurred while finding products.");
  }
};

// find a product by product ID
exports.findOne = async (req, res, next) => {
  try {
    const ProductService = new ProductServices(MongoDB.client);
    const resultProduct = await ProductService.findByID(req.params.id);

    if (!resultProduct) {
      return new ApiError(404, "Could not find product!");
    }
    return res.send(resultProduct);
  } catch (err) {
    return new ApiError(500, "An error occurred while finding product.");
  }
};

// update product
exports.update = async (req, res, next) => {
  let body = req.body;
  if (Object.keys(body).length === 0)
    return next(new ApiError(404, "Content to update can not be empty."));

  try {
    const ProductService = new ProductServices(MongoDB.client);
    const product = {
      name: body.name,
      category: body.category,
      author: body.author,
      publisher: body.publisher,
      publishingYear: body.publishingYear,
      discription: body.discription,
      price: body.price,
      quantity: body.quantity,
    };
    const productResult = await ProductService.updateProduct(
      req.params.id,
      product
    );
    if (!productResult) return next(new ApiError(404, "Product is not exist."));

    res.send({
      product: productResult,
      message: "Sản phẩm đã được cập nhật thành công.",
    });
  } catch (err) {
    new ApiError(500, "An error occurred while updating the product.");
  }
};

// delete all products
exports.deleteAll = async (req, res, next) => {
  try {
    const ProductService = new ProductServices(MongoDB.client);
    const deletedProductsCount = await ProductService.deleteAllProducts();
    const deletedImagesCount = await ProductService.deleteAllImages();
    return res.send({
      message: `${deletedProductsCount} và ${deletedImagesCount} đã được xóa thành công.`,
    });
  } catch (err) {
    return next(
      new ApiError(500, "An error occurred while deleting all products!")
    );
  }
};

// delete product with its id
exports.deleteOne = async (req, res, next) => {
  const idPro = req.params.id;

  try {
    const ProductService = new ProductServices(MongoDB.client);
    const productDocument = await ProductService.deleteProduct(idPro);
    if (!productDocument)
      return next(new ApiError(404, "Product is not exist!"));

    const imageDocument = await ProductService.deleteImage(idPro);
    if (!imageDocument) return next(new ApiError(404, "Product is not exist!"));
    return res.send({ message: "Sản phẩm đã được xóa thành công." });
  } catch (err) {
    return next(new ApiError(500, "An error occurred while deleting product!"));
  }
};
