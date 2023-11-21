import createApiClient from "./api.service";

class CartService {
  constructor(baseUrl = "/api/cart") {
    this.api = createApiClient(baseUrl);
  }

  async addToCart(data) {
    return (await this.api.post("/add", data)).data;
  }

  async listCart(userId) {
    return (await this.api.get(`/list/${userId}`)).data;
  }

  async getImage(id) {
    return (await this.api.get(`/images/get/:${id}`)).data;
  }

  async updateQuantity(idCart, data) {
    return (await this.api.put(`/update/${idCart}`, data)).data;
  }

  async deleteCartItem(cartId) {
    return (await this.api.delete(`/delete/${cartId}`)).data;
  }

  async deleteUserCart(userId) {
    return (await this.api.delete(`/delete/all/${userId}`)).data;
  }

  async deleteManyCartItem(carts) {
    return (await this.api.post("/delete/many", carts)).data;
  }
}

export default new CartService();
