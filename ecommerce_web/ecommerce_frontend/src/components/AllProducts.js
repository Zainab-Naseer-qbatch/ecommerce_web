import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "./Card";
import { getProducts } from "../redux/productSlice";

export const AllProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedUser } = useSelector((state) => state.user);
  const { products, loading, err } = useSelector((state) => state.products);

  const [classname, setClassName] = useState("");
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setClassName("col");
    } else {
      setClassName("");
    }
  }, [id]);

  useEffect(() => {
    if (loggedUser) {
      dispatch(getProducts());
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      {loading ? (
        "Loading..."
      ) : err ? (
        alert(err)
      ) : (
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
      )}
    </>
  );
};
