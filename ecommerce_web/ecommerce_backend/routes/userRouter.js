import express from "express";
import bodyParser from "body-parser";
import { user } from "../models/users.js";
import validator from "email-validator";
import { validatePhone } from "../utils/phoneValidation.js";
import { checkEmail } from "../middlewares/checkEmail.js";
import { encryptPassword, decryptPassword } from "../utils/password_hashing.js";
import { createSignature } from "../utils/jwtSignature.js";
import cookieParser from "cookie-parser";
export const userRouter = express.Router();
userRouter.use(express.json());
userRouter.use(bodyParser.urlencoded({ extended: false }));
userRouter.use(cookieParser());
//---------------------------------------SignUp---------------------------------------
userRouter.post("/signup", checkEmail, async (req, res) => {
  const isValid = validator.validate(req.body.email);
  const isPhoneValid = validatePhone(req.body.phone);
  if (isValid) {
    if (isPhoneValid) {
      const password = await encryptPassword(req.body.password);
      const newUser = new user({
        fullname: req.body.fullname,
        email: req.body.email,
        password: password,
        phone: req.body.phone,
      });
      try {
        await newUser.save();
        console.log("user added successfully!");
        res.status(201).send(newUser);
      } catch (err) {
        console.log("Error: ", err);
      }
    } else {
      res.status(400).send("Please Enter a Valid Phone Number");
    }
  } else {
    res.status(400).send("Please Enter a valid Email");
  }
});

//---------------------------------------Login---------------------------------------
userRouter.post("/login", async (req, res) => {
  user
    .find({ email: req.body.email })
    .select({ __v: 0 })
    .then(async (user) => {
      if (user[0]) {
        const isPasswordValid = await decryptPassword(
          req.body.password,
          user[0].password
        );
        // console.log(isPasswordValid);

        if (isPasswordValid) {
          console.log("User authenticated");
          const _user = user[0];
          const token = createSignature(user[0]);
          // console.log("sign: ",token);
          res.cookie("token", token, { httpOnly: true });
          console.log("user", _user);
          res.status(200).send(_user);
        } else {
          console.log("Password is invalid!");
          res.status(403).send("Invalid Password!");
        }
      } else {
        res.status(404).send("This User doesn't exists");
      }
    })
    .catch((err) => {
      console.log("error: ", err);
      res.send(err);
    });
});
