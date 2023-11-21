import createApiClient from "./api.service";

class OrderService {
  constructor(baseUrl = "/api/order") {
    this.api = createApiClient(baseUrl);
  }

  async saveOrder(data) {
    return (await this.api.post("/checkout", data)).data;
  }

  async getOrdersOfUser(userId) {
    return (await this.api.get(`/get/${userId}`)).data;
  }
}

export default new OrderService();
