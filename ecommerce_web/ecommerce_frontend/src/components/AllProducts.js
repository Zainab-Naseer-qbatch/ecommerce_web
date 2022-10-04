import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card } from "./Card";
import { saveCart } from "../utils/saveCart";
import { loggedUser } from "../redux/userSlice";

export const AllProducts = () => {
  const [classname, setClassName] = useState("");
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setClassName("col");
    } else {
      setClassName("");
    }
  }, [id]);
  console.log("params: ", id);

  const user = useSelector((state) => state.user.user);

  const cart = useSelector((state) => state.cart);
  const bill = useSelector((state) => state.bill);
  const totalQuantity = useSelector((state) => state.totalQuantity);
  const [products, setProducts] = useState(null);

  console.log("user in home :", user);
  const navigate = useNavigate();

  const getProducts = () => {
    axios
      .get("/products")
      .then((data) => {
        console.log("data: ", data.data);
        setProducts(data.data);
      })
      .catch((err) => {
        console.log("error:", err);
        if (err.response.status === 498) {
          saveCart(user, cart, bill, totalQuantity);
          alert("Your Session has been expired");
          loggedUser(null);
          navigate("/login");
        } else if (err.response.status === 400) {
          alert("You can't access this site");
          loggedUser(null);
          navigate("/login");
        }
      });
  };

  //get all products when component renders for the first time(Mounting phase)
  useEffect(() => {
    if (user) {
      getProducts();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div className="row">
        <div className={classname}>
          <div
            className="mx-5 my-3 mb-5 text-center"
            style={{ fontSize: "22px", color: "#0c7d7d" }}
          >
            Welcome! Shop what you want
          </div>
          <div className="container" style={{ marginLeft: "55px" }}>
            <div className="row" style={{ marginLeft: "75px" }}>
              {products?.map((product) => {
                return <Card product={product} />;
              })}
            </div>
          </div>
        </div>
        <div className={classname}>
          <Outlet />
        </div>
      </div>
    </>
  );
};
