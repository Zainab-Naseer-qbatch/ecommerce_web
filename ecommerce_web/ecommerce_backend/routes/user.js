import express from "express";
import validator from "email-validator";
import User from "../models/users.js";
import createSignature from "../utils/jwtSignature.js";
import { encryptPassword, decryptPassword } from "../utils/password-hashing.js";
import validatePhone from "../utils/phoneValidation.js";
import checkEmail from "../middlewares/checkEmail.js";

const router = express.Router();
router.post("/signup", checkEmail, async (req, res) => {
  const { fullname, email, phone, password } = req.body;
  const isValid = validator.validate(email);
  const isPhoneValid = validatePhone(phone);
  if (isValid) {
    if (isPhoneValid) {
      const pwd = await encryptPassword(password);
      try {
        const newUser = await User.create({
          fullname,
          email,
          password: pwd,
          phone,
        });
        res.status(201).json({ success: true, user: newUser });
      } catch (err) {
        res.json({ success: false, err: err?.message });
      }
    } else {
      res
        .status(422)
        .json({ success: false, err: "Please Enter a Valid Phone Number" });
    }
  } else {
    res.status(422).json({ success: false, err: "Please Enter a valid Email" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (user) {
      const isPasswordValid = await decryptPassword(password, user.password);

      if (isPasswordValid) {
        const token = createSignature(user);
        res.cookie("token", token, { httpOnly: true });
        res.status(200).json({ success: true, user: user });
      } else {
        res.status(403).json({ success: false, err: "Invalid Password!" });
      }
    } else {
      res.status(404).json({ success: false, err: "This User doesn't exists" });
    }
  } catch (err) {
    res.json({ success: false, err: err?.message });
  }
});

export default router;
