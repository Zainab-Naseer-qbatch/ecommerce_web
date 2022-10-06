import { user } from "../models/users.js";

export const checkEmail = async (req, res, next) => {
  const user_ = await user.find({ email: req.body.email }).count();
  if (user_ === 1) {
    res.status(409).send("User already Exists");
  } else {
    next();
  }
};
