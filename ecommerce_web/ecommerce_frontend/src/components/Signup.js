import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PhoneInput from "react-phone-number-input";
import { validateEmail } from "../utils/validateEmail";
import { Popup } from "./Popup";
import { InputError } from "./InputError";
import { setUser, SignUp } from "../redux/userSlice";
import { createCart, setCartCreated } from "../redux/cartSlice";
import "react-phone-number-input/style.css";
import "../style/form.css";

export const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isCartCreated = useSelector((state) => state.cart.cartCreated);
  const user = useSelector((state) => state.user.user);
  const message = useSelector((state) => state.user.err);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setphone] = useState();
  const [popup, setPopup] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);

  const updatePopup = (value) => {
    setPopup(value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    const msg = validateEmail(e);
    setEmailError(msg);
  };
  const validatePhone = (e) => {
    setphone(e);

    const pattern = /^[+][0-9]{12,13}$/;
    if (pattern.test(e)) {
      setPhoneError(null);
    } else {
      setPhoneError("Enter a valid phone number");
    }
  };

  //handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailError === null && phoneError === null) {
      console.log("passsed", emailError, phoneError);
      dispatch(setCartCreated(false));
      dispatch(setUser(false));
      dispatch(
        SignUp({
          fullname: name,
          email: email,
          password: password,
          phone: phone,
        })
      );
      if (message) {
        updatePopup(true);
      }
    } else {
      console.log("input validation failed", emailError, phoneError);
    }
  };
  useEffect(() => {
    if (user && !isCartCreated) {
      dispatch(createCart(user));
      navigate("/login");
    }
  }, [user]);

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card">
              <h2 className=" form-heading  card-title text-center">Sign Up</h2>
              <div className="card-body py-md-4">
                <form _lpchecked="1" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="userform form-control"
                      required={true}
                      id="name"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                  <div
                    className="form-group"
                    style={{ marginBottom: "1.3rem" }}
                  >
                    <input
                      type="email"
                      className=" userform form-control"
                      required={true}
                      id="email"
                      placeholder="Email"
                      value={email}
                      onChange={handleEmail}
                      style={{ marginBottom: 0 }}
                    />
                    <InputError error={emailError} margin={"17.5rem"} />
                  </div>

                  <div className="form-group">
                    <input
                      type="password"
                      className=" userform form-control"
                      required={true}
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>

                  <div
                    className="form-group"
                    style={{ marginBottom: "1.3rem" }}
                  >
                    <PhoneInput
                      style={{ border: "transparent", marginBottom: 0 }}
                      placeholder="Contact"
                      value={phone}
                      onChange={validatePhone}
                      required={true}
                    />
                    <InputError error={phoneError} margin={"17.5rem"} />
                  </div>
                  <div className="d-flex flex-row align-items-center justify-content-between">
                    <Link to="/login">Login</Link>
                    <button className="mybtn btn btn-primary">
                      Create Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {popup ? <Popup message={message} updatePopup={updatePopup} /> : null}
      </div>
    </>
  );
};
