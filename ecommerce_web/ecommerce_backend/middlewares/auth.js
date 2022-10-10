import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const authenticateUser = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    res
      .status(401)
      .json({ success: false, err: "Token required for authentication" });
  } else {
    try {
      jwt.verify(token, process.env.JWT_SECRET_KEY);
      next();
    } catch (err) {
      res.status(401).json({ success: false, err: "Invalid Token" });
    }
  }
};
export default authenticateUser;
