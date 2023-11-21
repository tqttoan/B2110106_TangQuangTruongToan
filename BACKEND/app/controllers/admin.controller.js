const AdminServices = require("../services/admin.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const bcrypt = require("bcrypt");
const session = require("express-session");

// Register admin account
exports.signUp = async (req, res, next) => {
  let admin = req.body;
  if (admin.name && admin.address && admin.phone && admin.position) {
    try {
      const AdminService = new AdminServices(MongoDB.client);

      // Find admin by phone number and check admin have been created
      const isExisted = await AdminService.findAdminByPhone(admin.phone);
      if (isExisted)
        return res.send({ message: "Số điện thoại này đã được đăng ký." });

      // Create admin
      const result = await AdminService.signUp(admin);
      console.log(result);
      return res.send({
        message: "Tài khoản nhân viên đã được đăng ký thành công.",
        success: true,
      });
    } catch (err) {
      return next(
        new ApiError(
          500,
          "Có lỗi xảy ra khi thực hiện đăng ký tài khoản quản trị. Vui lòng thử lại."
        )
      );
    }
  } else return next(new ApiError(400, "Thông tin tài khoản không đầy đủ."));
};

exports.signIn = async (req, res, next) => {
  const { phone, password } = req.body;

  if (phone && password) {
    try {
      const AdminService = new AdminServices(MongoDB.client);
      const result = await AdminService.findAdminByPhone(phone);

      if (result) {
        if (bcrypt.compareSync(password, result.password)) {
          return res.send({
            message: "Bạn đã đăng nhập thành công.",
            admin: {
              name: result.name,
              phone: result.phone,
            },
          });
        } else
          return res.send({
            message: "Mật khẩu không chính xác. Vui lòng nhập lại mật khẩu.",
          });
      } else return res.send({ message: "Tài khoản không tồn tại." });
    } catch (error) {
      return next(
        new ApiError(500, "An error occurred while signing in the user.")
      );
    }
  } else return next(new ApiError(400, "Vui lòng nhập đầy đủ thông tin."));
};

exports.getEmployeesList = async (req, res, next) => {
  try {
    const AdminService = new AdminServices(MongoDB.client);
    const result = await AdminService.getEmployees();
    if (result) return res.send(result);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while getting employees.")
    );
  }
};

exports.deleteEmployee = async (req, res, next) => {
  const id = req.params.id;
  try {
    const AdminService = new AdminServices(MongoDB.client);
    const result = await AdminService.deleteOneEmployee(id);
    if (result)
      return res.send({ message: "Nhân viên đã được xóa thành công." });
    else return res.send({ message: "Nhân viên không tồn tại." });
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while deleting employee.")
    );
  }
};

exports.deleteAllEmployees = async (req, res, next) => {
  try {
    const AdminService = new AdminServices(MongoDB.client);
    const result = await AdminService.deleteEmployees();
    if (result)
      return res.send({
        message: `${result.deletedCount} nhân viên đã được xóa thành công.`,
      });
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while deleting all employee.")
    );
  }
};

exports.getEmployee = async (req, res, next) => {
  const id = req.params.id;
  try {
    const AdminService = new AdminServices(MongoDB.client);
    const result = await AdminService.findEmployeeById(id);
    if (result) return res.send(result);
  } catch (error) {
    return next(new ApiError(500, "An error occurred while getting employee."));
  }
};

exports.updateEmployee = async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const AdminService = new AdminServices(MongoDB.client);
    const result = await AdminService.updateEmployee(id, data);
    if (result)
      return res.send({
        message: "Thông tin nhân viên đã được cập nhật thành công.",
      });
  } catch (error) {
    return next(new ApiError(500, "An error occurred while getting employee."));
  }
};
