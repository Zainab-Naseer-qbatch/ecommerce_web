import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { InputError } from "./InputError";
import { validateEmail } from "../utils/validateEmail";
import { useDispatch } from "react-redux";
import { setCart } from "../redux/cartSlice";
import { loggedUser } from "../redux/userSlice";
import "../style/form.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [pwdError, setPwdError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getCart = async (user) => {
    console.log("user before getting cart", user._id);
    await axios
      .get(`/myCart/${user._id}`)
      .then((data) => {
        console.log("getting cart from db: ", data.data);
        console.log("data: ", data);
        console.log("before setting cart: quantity: ", data.data[2]);
        dispatch(
          setCart({
            products: data.data[0],
            bill: data.data[1],
            totalQuantity: data.data[2],
          })
        );
      })
      .catch((err) => {
        console.log("error in getting cart: ", err);
      });

    // return "hello";
  };

  console.log("login comp");

  const login = () => {
    console.log("inside login");
    axios
      .post("/login", {
        email: email,
        password: password,
      })
      .then(async (data) => {
        console.log("inside axios ");
        console.log("data: ", data);
        dispatch(loggedUser(data.data));
        // localStorage.setItem("user", JSON.stringify(data.data));

        setPwdError(null);
        const mydata = await getCart(data.data);
        console.log("data from get cart: ", mydata);
        navigate("/home/welcome");
      })
      .catch((err) => {
        console.log("in catch block", err);
        if (err?.response?.status === 403) {
          setPwdError(err?.response?.data);
          console.log(err);
        } else if (err?.response?.status === 404) {
          setEmailError(err?.response?.data);
        }
      });
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    const msg = validateEmail(e);
    setEmailError(msg);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailError === null) {
      console.log("passsed", emailError);
      login();
      // console.log("after login", user);
    } else {
      console.log("input validation failed", emailError);
    }
  };
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card">
              <h2 className="form-heading card-title text-center">Login</h2>
              <div className="card-body py-md-4">
                <form _lpchecked="1" onSubmit={handleSubmit}>
                  <div
                    className="form-group"
                    style={{ marginBottom: "1.3rem" }}
                  >
                    <input
                      style={{ marginBottom: 0 }}
                      type="email"
                      className="userform form-control"
                      id="email"
                      placeholder="Email"
                      value={email}
                      onChange={handleEmail}
                      required={true}
                    />
                    <InputError error={emailError} margin={"18rem"} />
                  </div>

                  <div
                    className="form-group"
                    style={{ marginBottom: "1.3rem" }}
                  >
                    <input
                      style={{ marginBottom: 0 }}
                      type="password"
                      className="userform form-control"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      required={true}
                    />
                    <InputError error={pwdError} margin={"22rem"} />
                  </div>

                  <div className="d-flex flex-row align-items-center justify-content-between">
                    <Link to="/signup">Sign Up</Link>
                    <button className="mybtn btn btn-primary">Login</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
