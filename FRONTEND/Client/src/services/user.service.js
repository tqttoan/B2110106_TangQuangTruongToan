import createApiClient from "./api.service";

class UserService {
  constructor(baseUrl = "/api/user") {
    this.api = createApiClient(baseUrl);
  }

  async signUp(data) {
    return (await this.api.post("/register", data)).data;
  }

  async signIn(data) {
    return (await this.api.post("/logIn", data)).data;
  }

  async signOut() {
    return (await this.api.get("/logOut")).data;
  }

  async edit(id, data) {
    return (await this.api.put(`/edit/${id}`, data)).data;
  }
}

export default new UserService();
