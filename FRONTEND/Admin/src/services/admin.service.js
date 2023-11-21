import createApiClient from "./api.service";

class AdminService {
  constructor(baseUrl = "/api/admin") {
    this.api = createApiClient(baseUrl);
  }

  async signUp(data) {
    return (await this.api.post("/signUp", data)).data;
  }

  async signIn(data) {
    return (await this.api.post("/signIn", data)).data;
  }

  async signOut() {
    return (await this.api.get("/signOut")).data;
  }

  async findAllEmployees() {
    return (await this.api.get("/employees/get")).data;
  }

  async deleteEmployee(id) {
    return (await this.api.delete(`/employees/delete/${id}`)).data;
  }

  async deleteAll() {
    return (await this.api.delete("/employees/delete/all")).data;
  }

  async findOne(id) {
    return (await this.api.get(`/employees/find/${id}`)).data;
  }

  async update(id, data) {
    return (await this.api.put(`/employees/update/${id}`, data)).data;
  }
}

export default new AdminService();
