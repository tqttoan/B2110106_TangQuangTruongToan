import createApiClient from "./api.service";

class ProductService {
  constructor(baseUrl = "/api/product") {
    this.api = createApiClient(baseUrl);
  }

  async create(data) {
    return (await this.api.post("/create", data)).data;
  }

  async findAll() {
    return (await this.api.get("/find")).data;
  }
  async getCategories() {
    return (await this.api.get("/categories/get")).data;
  }
  async getImage(id) {
    return (await this.api.get(`/images/get/:${id}`)).data;
  }

  async findOne(id) {
    return (await this.api.get(`/find/${id}`)).data;
  }

  async update(id, data) {
    return (await this.api.put(`/update/${id}`, data)).data;
  }

  async delete(id) {
    return (await this.api.delete(`/delete/${id}`)).data;
  }
  async deleteAll() {
    return (await this.api.delete("/delete")).data;
  }
}

export default new ProductService();
