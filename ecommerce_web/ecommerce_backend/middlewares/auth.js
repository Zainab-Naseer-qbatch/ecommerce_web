import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export const authenticateUser = (req, res, next) => {
  // const token = req.headers["x-access-token"] || req.headers.authorization;
  const token = req.cookies.token;
  if (!token) {
    res.status(400).send("Token required for authentication");
  } else {
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      next();
    } catch (err) {
      res.status(498).send("Invalid Token");
    }
  }
};
