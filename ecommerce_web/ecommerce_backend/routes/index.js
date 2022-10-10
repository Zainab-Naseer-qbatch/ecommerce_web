import express from "express";
import cart from "./cart.js";
import product from "./product.js";
import user from "./user.js";

const router = express.Router();
router.use(cart);
router.use(product);
router.use(user);

export default router;
