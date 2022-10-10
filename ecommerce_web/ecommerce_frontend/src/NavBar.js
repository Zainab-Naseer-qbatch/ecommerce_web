import React from "react";
import { Cart } from "./components/icons/Cart";
import Badge from "@material-ui/core/Badge";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./style/navbar.css";
import { setLoggedUser, setIsLoggedIn } from "./redux/userSlice";
import { addToCart } from "./redux/cartSlice";

export const NavBar = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { totalQuantity, cart, bill } = useSelector((state) => state.cart);
  const logout = async () => {
    dispatch(addToCart({ user, cart, bill, totalQuantity }));

    dispatch(setLoggedUser(null));
    dispatch(setIsLoggedIn(null));
    navigate("/login");
  };
  return (
    <nav
      className="navbar navbar-expand-lg "
      style={{ backgroundColor: "#0c7d7d" }}
    >
      <div className="container-fluid">
        <Link to="products" className="home-nav navbar-brand">
          Go Shopping
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="home-nav nav-link active"
                aria-current="page"
                to="products"
              >
                Home
              </Link>
            </li>
          </ul>

          <p
            style={{ color: "#fff", fontSize: "16px", marginTop: "15px" }}
            className="home-nav navbar-brand"
          >
            {user.email}
          </p>
          <div
            className="cart"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("cart")}
          >
            <Badge color="secondary" badgeContent={totalQuantity}>
              <Cart height={"30px"} width={"30px"} />
            </Badge>
          </div>
          <button
            className="nav-btn btn btn-outline-success"
            type="submit"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};
