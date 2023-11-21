const OrderServices = require("../services/order.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const CartServices = require("../services/cart.service");

exports.checkoutOrders = async (req, res, next) => {
  const { deliveryInfo, orderPrices, products, userId, cartIdList } = req.body;
  try {
    const OrderService = new OrderServices(MongoDB.client);
    const result = await OrderService.createOrder({
      deliveryInfo,
      orderPrices,
      userId,
    });
    if (result) {
      const resultDetails = await OrderService.createOrderDetails(
        result.insertedId,
        products
      );
      if (resultDetails) {
        const CartService = new CartServices(MongoDB.client);
        const resultDel = await CartService.deleteManyCartItemsOfUser(
          cartIdList
        );
        if (resultDel) {
          const resultDelPro = await OrderService.decreaseQuantity(products);
          if (resultDelPro)
            return res.send({
              message:
                "Đặt hàng thành công. Đơn hàng của bạn đang chờ xác nhận từ cửa hàng.",
            });
        }
      }
    }
  } catch (error) {
    return new ApiError(500, "An error occurred while creating order");
  }
};

exports.getOrdersOfUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const OrderService = new OrderServices(MongoDB.client);
    const orders = await OrderService.getOrdersListOfUser(userId);
    return res.send(orders);
  } catch (err) {
    new ApiError(500, "An error occurred while  getting orders");
  }
};
