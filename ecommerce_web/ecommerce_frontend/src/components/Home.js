import React from "react";
import { Outlet } from "react-router";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavBar } from "../NavBar";
export const Home = () => {
  const user = useSelector((state) => state.user.user);

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
