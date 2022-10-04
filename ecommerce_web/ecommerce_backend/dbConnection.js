import mongoose from "mongoose";

//connect to mongo DB
mongoose.connect("mongodb://127.0.0.1:27017/ecommerce_db",{
    useNewUrlParser: true
});

//check if db is connected or not
export const db=mongoose.connection;