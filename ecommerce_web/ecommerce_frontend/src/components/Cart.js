import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeProduct,
} from "../redux/cartSlice";

export const Cart = () => {
  const headingStyle = {
    color: "#0c7d7d",
  };
  const myCart = useSelector((state) => state.cart.cart);
  console.log("cart in cart component: ", myCart);
  const bill = useSelector((state) => state.cart.bill);
  console.log("bill: ", bill, typeof bill);
  const dispatch = useDispatch();

  return (
    <>
      {myCart?.length > 0 ? (
        <>
          <div
            className="mx-5 my-3 mb-5 text-center"
            style={{ fontSize: "22px", color: "#0c7d7d" }}
          >
            You've added these Products to your Cart
          </div>
          <div className="container text-center">
            <div
              className="card "
              style={{
                width: "60rem",
                marginLeft: "auto",
                marginRight: "auto",
                border: "2px solid #0c7d7d",
                boxShadow: "5px 10px 8px 10px #888888",
              }}
            >
              <div className="container">
                <h3 style={{ marginBottom: "50px" }}>Order Details</h3>
                <div className="row" style={{ marginBottom: "20px" }}>
                  <div className="col">
                    <h5 style={headingStyle}>
                      <b>Product</b>
                    </h5>
                  </div>

                  <div className="col">
                    <h5 style={headingStyle}>
                      <b>Name</b>
                    </h5>
                  </div>
                  <div className="col">
                    <h5 style={headingStyle}>
                      <b>Qty</b>
                    </h5>
                  </div>
                  <div className="col">
                    <h5 style={headingStyle}>
                      <b>Price</b>
                    </h5>
                  </div>
                  <div className="col">
                    <h5 style={headingStyle}>
                      <b>Remove</b>
                    </h5>
                  </div>
                </div>
                {myCart.map((item) => {
                  return (
                    <>
                      <div className="row">
                        <div className="col">
                          <img
                            src={item.image}
                            className="card-img-top"
                            alt="..."
                            style={{ height: "40px", width: "40px" }}
                          />
                        </div>

                        <div className="col">
                          <h5 className="card-title">{item.name}</h5>
                        </div>
                        <div className="col">
                          <div
                            className="row"
                            style={{ width: "150px", marginLeft: "15px" }}
                          >
                            <div className="col">
                              <button
                                className="inc-btn"
                                onClick={() => dispatch(increaseQuantity(item))}
                              >
                                +
                              </button>
                            </div>
                            <div className="col">
                              <p
                                className="card-text"
                                style={{ marginTop: "5px" }}
                              >
                                {item.quantity}
                              </p>
                            </div>
                            <div className="col">
                              <button
                                className="inc-btn"
                                onClick={() => dispatch(decreaseQuantity(item))}
                              >
                                -
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="col">
                          <p className="card-text">{item.totalPrice}</p>
                        </div>
                        <div className="col">
                          <button
                            className="inc-btn"
                            style={{ color: "red" }}
                            onClick={() => dispatch(removeProduct(item))}
                          >
                            x
                          </button>
                        </div>
                      </div>

                      <hr />
                    </>
                  );
                })}

                <div className="row">
                  <div className="col">
                    <h5>Total Bill</h5>
                  </div>
                  <div className="col">{""}</div>
                  <div className="col">
                    <h5>{bill}</h5>
                  </div>
                </div>

                <a
                  href="#"
                  className="mybtn btn btn-primary"
                  style={{ marginBottom: "30px" }}
                >
                  Checkout
                </a>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h3 className="text-center my-5 " style={{ color: "#000" }}>
          Your Cart is currently empty...{" "}
          <Link style={{ color: "#0c7d7d" }} to="/home/products">
            Shop Now
          </Link>
        </h3>
      )}
    </>
  );
};
