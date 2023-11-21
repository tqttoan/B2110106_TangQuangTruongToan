const { response } = require("express");
const { ObjectId } = require("mongodb");

class OrderService {
  constructor(client) {
    this.order = client.db().collection("orders");
    this.orderDetail = client.db().collection("orderDetails");
    this.product = client.db().collection("products");
  }

  // Dinh nghia cac phuong thuc truy xuat CSDL
  extractOrderData(payload) {
    const today = new Date();
    const order = {
      userId: ObjectId.isValid(payload.userId)
        ? new ObjectId(payload.userId)
        : null,
      employeeId: "",
      orderDate:
        today.getDate() +
        "-" +
        today.getMonth() +
        "-" +
        today.getFullYear() +
        " " +
        today.getHours() +
        ":" +
        today.getMinutes() +
        ":" +
        today.getSeconds(),
      shipDate: "",
      statusOrder: "Chờ Xác Nhận",
      prices: payload.orderPrices,
      shipInformation: payload.deliveryInfo,
    };
    return order;
  }

  async createOrder(data) {
    const order = this.extractOrderData(data);
    return await this.order.insertOne(order);
  }

  async createOrderDetails(orderId, data) {
    const newOrderDetails = data.map((product) => {
      return {
        orderId: ObjectId.isValid(orderId) ? new ObjectId(orderId) : null,
        productId: ObjectId.isValid(product.id)
          ? new ObjectId(product.id)
          : null,
        quantity: product.quantity,
        sumPrices: product.prices,
      };
    });
    return await this.orderDetail.insertMany(newOrderDetails);
  }

  async decreaseQuantity(productArray) {
    let result = productArray.map(async (product) => {
      return await this.product.findOneAndUpdate(
        {
          _id: ObjectId.isValid(product.id) ? new ObjectId(product.id) : null,
        },
        {
          $inc: { quantity: Number(-product.quantity) },
        },
        { returnDocument: "after" }
      );
    });
    return result[0].then((res) => res);
  }

  async getOrdersDetails() {
    const ordersDetails = await this.orderDetail
      .aggregate([
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            pipeline: [
              {
                $project: {
                  productName: "$name",
                  productPrices: "$price",
                },
              },
            ],
            as: "product",
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [{ $arrayElemAt: ["$product", 0] }, "$$ROOT"],
            },
          },
        },
        { $project: { product: 0, _id: 0 } },
      ])
      .toArray();
    let newOrdersDetails = ordersDetails.map((item) => {
      let newItem = { ...item };
      newItem.image = `/api/product/images/get/${item.productId}`;
      return newItem;
    });
    return newOrdersDetails;
  }

  async getOrdersListOfUser(userId) {
    const ordersDetails = await this.getOrdersDetails();
    const orders = await this.order
      .aggregate([
        {
          $match: {
            userId: ObjectId.isValid(userId) ? new ObjectId(userId) : null,
          },
        },
        {
          $lookup: {
            localField: "_id",
            foreignField: "orderId",
            as: "ordersDetails",
            pipeline: [
              {
                $documents: ordersDetails,
              },
            ],
          },
        },
      ])
      .toArray();
    return orders;
  }
}

module.exports = OrderService;
