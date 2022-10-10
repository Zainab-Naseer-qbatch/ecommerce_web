import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../redux/cartSlice";
import { getSpecificProduct } from "../redux/productSlice";
import "../style/product.css";

export const Product = () => {
  const dispatch = useDispatch();

  const { product } = useSelector((state) => state.products);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getSpecificProduct(id));
  }, [id]);
  return (
    <>
      {product ? (
        <>
          <div
            id="slider"
            className="slide-in my-3"
            style={{
              borderLeft: "2px solid #0c7d7d",
              width: "600px",
            }}
          >
            <div className="container my-5 " id="slide">
              <div className=" text-center my-5">
                <h5>
                  <b>{product?.name}</b>
                </h5>
              </div>
              <img
                src={product?.image}
                alt="Product"
                style={{ height: "400px", width: "100%" }}
              />
              <br />
              <br />
              <h5>
                <b>Description:</b>
              </h5>

              <div className="mx-5">
                <p>{product.desc}</p>
              </div>

              <h5>
                <b>Price: </b>
                {product?.price}
              </h5>

              <h5>
                <b>Rating: </b>
                {product?.rating}
              </h5>
              <br />
              <Link
                to="#"
                className="mybtn btn btn-primary"
                style={{ width: "100%" }}
                onClick={() => dispatch(addProductToCart(product))}
              >
                Add to Cart
              </Link>
            </div>
          </div>
        </>
      ) : (
        "Loading"
      )}
    </>
  );
};
