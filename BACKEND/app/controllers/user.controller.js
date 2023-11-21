const UserServices = require("../services/user.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const bcrypt = require("bcrypt");

exports.register = async (req, res, next) => {
  const { name, phone, email, address, password } = req.body;
  if (name && phone && email && address && password) {
    if (req.session.isSignedIn) {
      return res.send({
        message: "Bạn đang trong phiên đăng nhập. Vui lòng đăng xuất trước.",
      });
    } else {
      try {
        const UserService = new UserServices(MongoDB.client);
        const isExisted = await UserService.findUserByEmail(email);

        if (isExisted)
          return res.send({
            message:
              "Email này đã được đăng ký. Vui lòng thử lại với một tài khoản email khác.",
          });

        // Create a new user
        const result = await UserService.signUp(req.body);
        return res.send({
          message: "Tài khoản người dùng đã được đăng ký thành công.",
          success: result,
        });
      } catch (err) {
        return next(
          new ApiError(500, "An error occurred while registering the user.")
        );
      }
    }
  } else return next(new ApiError(400, "Vui lòng nhập đầy đủ thông tin."));
};

// user sign in with email and password
exports.logIn = async (req, res, next) => {
  const { email, password } = req.body;

  if (email && password) {
    try {
      const UserService = new UserServices(MongoDB.client);
      const result = await UserService.findUserByEmail(email);

      if (result) {
        if (bcrypt.compareSync(password, result.password)) {
          return res.send({
            message: "Bạn đã đăng nhập thành công.",
            user: {
              userId: result._id,
              name: result.name,
            },
          });
        } else
          return res.send({
            message: "Mật khẩu không chính xác. Vui lòng nhập lại mật khẩu.",
          });
      } else
        return res.send({ message: "Tài khoản người dùng không tồn tại." });
    } catch (error) {
      return next(
        new ApiError(500, "An error occurred while signing in the user.")
      );
    }
  } else return next(new ApiError(400, "Vui lòng nhập đầy đủ thông tin."));
};
