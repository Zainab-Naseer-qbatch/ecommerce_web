import React from "react";
import { Outlet } from "react-router";
import { NavBar } from "../NavBar";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
export const Home = () => {
  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart.cart);

  console.log("user from redux store: ", user);
  console.log("cart from redux store: ", cart);

  return (
    <>
      {user ? (
        <>
          <NavBar user={user} />

          <Outlet />
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};
