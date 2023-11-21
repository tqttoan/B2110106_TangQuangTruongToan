import createApiClient from "./api.service";

class ProductService {
  constructor(baseUrl = "/api/product") {
    this.api = createApiClient(baseUrl);
  }

  async find() {
    return (await this.api.get("/find")).data;
  }

  async findOne(id) {
    return (await this.api.get(`/find/${id}`)).data;
  }

  async getImage(id) {
    return (await this.api.get(`/images/get/:${id}`)).data;
  }

  async search(key) {
    return (await this.api.get(`/search/${key}`)).data;
  }

  async getAllCategories() {
    return (await this.api.get("/categories/get")).data;
  }
}

export default new ProductService();
