import React from "react";
import { ProductImage } from "./ProductImage";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../redux/cartSlice";
export const Card = ({ product }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const getDetails = () => {
    console.log("product: ", product);
    window.scrollTo(0, 0);
    navigate(`${product._id}`);
  };

  const addToCart = () => {
    dispatch(addProductToCart(product));

    // axios
    //   .put(`addToCart/${user?._id}/${product?._id}`)
    //   .then((response) => {
    //     console.log("response: ", response);
    //   })
    //   .catch((err) => {
    //     console.log("error: ", err);
    //   });
  };
  return (
    <div
      onClick={getDetails}
      className="card text-center mx-5"
      style={{
        width: "18rem",
        cursor: "pointer",
        marginBottom: "30px",
        border: "2px solid #0c7d7d",
      }}
    >
      <ProductImage src={product.image} alt="product image" />
      <div className="card-body text-center">
        <h5 className="card-title" style={{ marginBottom: "0.5rem" }}>
          {product.name}
        </h5>
        <p className="card-text" style={{ marginBottom: "0.5rem" }}>
          Rating: <b>{product.rating}</b>
        </p>
        <p className="card-text">
          <b>${product.price}</b>
        </p>
        <Link to="#" className="mybtn btn btn-primary" onClick={addToCart}>
          Add to Cart
        </Link>
      </div>
    </div>
  );
};
