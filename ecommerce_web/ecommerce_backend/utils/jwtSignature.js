import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
const createSignature = (user) => {
  const { _id, fullname, email, password } = user;
  return jwt.sign(
    {
      id: _id,
      name: fullname,
      email: email,
      password: password,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "2h" }
  );
};
export default createSignature;
