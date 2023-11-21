const CartServices = require("../services/cart.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

// Add product to cart
exports.add = async (req, res, next) => {
  const { productId, quantity, userId } = req.body;
  if (!productId || !quantity || !userId) {
    return res.send({
      message:
        "Không thể thêm sản phẩm vào giỏ hàng bởi vì thông tin chưa đầy đủ.",
    });
  }

  try {
    let result = {};
    const CartService = new CartServices(MongoDB.client);
    const cartItem = await CartService.getCartByUserIdAndProductId(
      userId,
      productId
    );
    if (cartItem) {
      result = await CartService.updateCartItem(cartItem._id, {
        userId: userId,
        productId: productId,
        quantity: cartItem.quantity + quantity,
      });
    } else {
      result = await CartService.addCartItem({
        productId,
        quantity,
        userId,
      });
    }
    if (result)
      res.send({
        message: "Sản phẩm đã được thêm vào giỏ hàng thành công.",
        cartItem: result,
      });
  } catch (err) {
    new ApiError(500, "An error occurred while adding product to cart");
  }
};

// List all products in cart
exports.list = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const CartService = new CartServices(MongoDB.client);
    const carts = await CartService.getCartOfUser(userId);
    const newCarts = carts.map((item) => {
      let { product: oldProduct, quantity, ...newItem } = item;
      let { _id, ...newProduct } = oldProduct[0];
      return {
        ...newItem,
        ...newProduct,
        ...{ cartQuantity: quantity },
        ...{ oldQuantity: quantity },
        ...{ image: `/api/product/images/get/${_id}` },
      };
    });
    return res.send(newCarts);
  } catch (err) {
    new ApiError(500, "An error occurred while listing products");
  }
};

// update quantity of product in cart
exports.updateQuantity = async (req, res, next) => {
  const { productId, quantity, userId } = req.body;
  const cartId = req.params.id;
  console.log(productId, quantity, userId, cartId);
  if (!productId || !quantity || !userId || !cartId) {
    return res.send({
      message: "Không thể cập nhật bởi vì thông tin chưa đầy đủ.",
    });
  }

  try {
    const CartService = new CartServices(MongoDB.client);
    const cartItem = {
      userId,
      productId,
      quantity,
    };
    const result = await CartService.updateCartItem(cartId, cartItem);
    if (result)
      res.send({
        message: "Cập nhật sản phẩm thành công.",
        cartItem: result,
      });
  } catch (err) {
    new ApiError(
      500,
      "An error occurred while updating quantity of product to cart"
    );
  }
};

// delete cart item of user
exports.deleteCartItem = async (req, res, next) => {
  const cartId = req.params.id;
  try {
    const CartService = new CartServices(MongoDB.client);
    const result = await CartService.deleteCartItem(cartId);
    if (!result) res.send({ message: "Sản phẩm không tồn tại." });

    res.send({ message: "Sản phẩm đã được xóa thành công." });
  } catch (err) {
    new ApiError(500, "An error occurred while deleting product of user");
  }
};

// delete all cart of user
exports.deleteAllCart = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const CartService = new CartServices(MongoDB.client);
    const result = await CartService.deleteAllCartOfUser(userId);
    if (!result)
      res.send({ message: "Người dùng vẫn chưa có sản phẩm trong giỏ hàng." });

    res.send({
      message: `${result.deletedCount} sản phẩm đã được xóa thành công.`,
    });
  } catch (err) {
    new ApiError(500, "An error occurred while deleting all cart of user");
  }
};

// delete many cart items
exports.deleteManyCartItems = async (req, res, next) => {
  const carts = req.body;
  try {
    const CartService = new CartServices(MongoDB.client);
    const result = await CartService.deleteManyCartItemsOfUser(carts);
    return res.send({
      message: `${result.deletedCount} đã được xóa thành công.`,
    });
  } catch (err) {
    new ApiError(500, "An error occurred while deleting many cart of user");
  }
};

// find a product
exports.findOne = async (req, res, next) => {
  try {
    const CartService = new CartServices(MongoDB.client);
    const product = await CartService.findOne(req.params.id);
    return res.send(product);
  } catch (err) {
    new ApiError(500, "An error occurred while finding product");
  }
};

// Search for products with any keywords relate to name and description of products
exports.search = async (req, res, next) => {
  try {
    const key = req.params.key;
    const CartService = new CartServices(MongoDB.client);
    const products = await CartService.search(key);
    if (products.length === 0)
      return next(new ApiError(404, "No products found"));

    return res.send(products);
  } catch (err) {
    new ApiError(500, "An error occurred while searching for products");
  }
};

// find an image of product
exports.getImage = async (req, res, next) => {
  try {
    const CartService = new CartServices(MongoDB.client);
    const result = await CartService.findImage(req.params.id);
    if (result) {
      res.contentType("image/jpeg");
      res.send(result.image.buffer);
    } else return res.send("Không tìm thấy hình ảnh của sản phẩm.");
  } catch (err) {
    console.log(err);
  }
};
