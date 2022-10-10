import User from "../models/users.js";

const checkEmail = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.find({ email: email }).count();
  if (user === 1) {
    res.status(409).json({
      success: false,
      message: "User already Exists",
    });
  } else {
    next();
  }
};
export default checkEmail;
