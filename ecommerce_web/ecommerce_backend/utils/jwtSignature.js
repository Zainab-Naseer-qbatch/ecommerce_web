//----------------------------Generating JWT Token----------------------------
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
export const createSignature = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.fullname,
      email: user.email,
      password: user.password,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );
};
