import express from "express";
import { db } from "./dbConnection.js";
import * as dotenv from "dotenv";
import { userRouter } from "./routes/userRouter.js";
import { productRouter } from "./routes/productRouter.js";
import { cartRouter } from "./routes/cartRouter.js";
dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.use(userRouter);
app.use(productRouter);
app.use(cartRouter);

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.listen(PORT, () => {
  console.log("app started!");
});
// async function method() {
//   const mycart = await cart.find({ user: "63297acedc9dbef5a46ca374" });

//   const mycart2 = await cart.findOneAndUpdate(
//     { _id: mycart[0]._id },
//     {
//       $push: {
//         products: "6329ac287480114a7553058e",
//       },
//     }
//   );
//   console.log("my updated cart", mycart2);

// const userCart = await cart
//   .find({ user: "63297acedc9dbef5a46ca374" })
//   .then((data) => {
//     console.log("data: ", data);
//     cart.update({
//       _id:
//     })
//   });
// }
// method();
// const newUser=new user({fullname:"Zainab Naseer",email:"zainab@gmail.com",password:"za03334868151?",phone:923334868151})
// newUser.save((err,data)=>{
//     if(err){
//         console.log("error",err)
//     }
//     else{
//         console.log("data",data)
//     }
// });
