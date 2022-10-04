import { user } from "../models/users.js";
// import {db} from "../dbConnection.js"

export const checkEmail = (req, res, next) => {
  user
    .find({ email: req.body.email })
    .count()
    .then((user) => {
      if (user === 1) {
        res.status(409).send("User already Exists");
      } else {
        next();
      }
    });
};
