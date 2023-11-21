const { ObjectId } = require("mongodb");

class CartService {
  constructor(client) {
    this.cart = client.db().collection("carts");
  }

  // Dinh nghia cac phuong thuc truy xuat CSDL

  // create a new cart item
  async addCartItem(cartItem) {
    const newCartItem = {
      userId: ObjectId.isValid(cartItem.userId)
        ? new ObjectId(cartItem.userId)
        : null,
      productId: ObjectId.isValid(cartItem.productId)
        ? new ObjectId(cartItem.productId)
        : null,
      quantity: cartItem.quantity,
    };
    const result = await this.cart.findOneAndUpdate(
      newCartItem,
      { $set: newCartItem },
      {
        returnDocument: "after",
        upsert: true,
      }
    );
    return result;
  }

  async getCartOfUser(userId) {
    const result = await this.cart
      .aggregate([
        {
          $match: {
            userId: ObjectId.isValid(userId) ? new ObjectId(userId) : null,
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
      ])
      .toArray();
    return result;
  }

  // find a cart item by userId and productId
  async getCartByUserIdAndProductId(userId, productId) {
    const filter = {
      userId: ObjectId.isValid(userId) ? new ObjectId(userId) : null,
      productId: ObjectId.isValid(productId) ? new ObjectId(productId) : null,
    };
    return await this.cart.findOne(filter);
  }

  // update quantity of cart items
  async updateCartItem(id, cartItem) {
    const newCartItem = {
      userId: ObjectId.isValid(cartItem.userId)
        ? new ObjectId(cartItem.userId)
        : null,
      productId: ObjectId.isValid(cartItem.productId)
        ? new ObjectId(cartItem.productId)
        : null,
      quantity: cartItem.quantity,
    };
    const result = await this.cart.findOneAndUpdate(
      {
        _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
      },
      { $set: newCartItem },
      { returnDocument: "after" }
    );
    return result;
  }

  // get image
  async findImage(product) {
    return await this.image.findOne({ product: product });
  }

  // delete cart item
  async deleteCartItem(cartId) {
    const result = await this.cart.findOneAndDelete({
      _id: ObjectId.isValid(cartId) ? new ObjectId(cartId) : null,
    });
    return result;
  }

  // delete all cart items of user account
  async deleteAllCartOfUser(userId) {
    return await this.cart.deleteMany({
      userId: ObjectId.isValid(userId) ? new ObjectId(userId) : null,
    });
  }

  // delete many cart items of user account
  async deleteManyCartItemsOfUser(carts) {
    const newCarts = carts.map((cartItem) => {
      return ObjectId.isValid(cartItem) ? new ObjectId(cartItem) : null;
    });
    return await this.cart.deleteMany({
      _id: { $in: newCarts },
    });
  }
}

module.exports = CartService;
