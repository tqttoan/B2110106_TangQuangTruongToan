const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

class AdminService {
  constructor(client) {
    this.employee = client.db().collection("employees");
  }

  // Dinh nghia cac phuong thuc truy xuat CSDL

  // Find admin by phone number
  async findAdminByPhone(SDT) {
    return await this.employee.findOne({ phone: SDT });
  }

  // Create password automatically
  generatePassword() {
    const characters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*_-+=";
    let password = "";
    for (let i = 0; i < 8; i++) {
      password += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return password;
  }

  // Create a new admin / Register admin account
  async signUp(data) {
    const password = this.generatePassword();
    const hashPassword = bcrypt.hashSync(password, 10);
    const admin = {
      name: data.name,
      address: data.address,
      phone: data.phone,
      position: data.position,
      password: hashPassword,
    };

    const result = await this.employee.insertOne(admin);
    result.password = password;
    return result;
  }

  // get employees list
  async getEmployees() {
    return await this.employee.find({}).toArray();
  }

  // delete an employee
  async deleteOneEmployee(id) {
    return await this.employee.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  // delete all employees
  async deleteEmployees() {
    return await this.employee.deleteMany({});
  }

  // get an employee by id
  async findEmployeeById(id) {
    return await this.employee.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  // update an employee
  async updateEmployee(id, data) {
    const { name, phone, address, position } = data;
    return await this.employee.findOneAndUpdate(
      {
        _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
      },
      {
        $set: {
          name: name,
          phone: phone,
          address: address,
          position: position,
        },
      },
      {
        returnDocument: "after",
      }
    );
  }
}

module.exports = AdminService;
