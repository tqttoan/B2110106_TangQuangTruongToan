const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

class UserService {
  constructor(client) {
    this.user = client.db().collection("users");
  }

  // Dinh nghia cac phuong thuc truy xuat CSDL

  // Find user by phone number
  async findUserByEmail(email) {
    return await this.user.findOne({ email: email });
  }

  // Create a new user / register a new account
  async signUp(data) {
    const hashPassword = bcrypt.hashSync(data.password, 10);
    const user = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      address: data.address,
      password: hashPassword,
    };

    const result = await this.user.insertOne(user);
    return result;
  }
}

module.exports = UserService;
