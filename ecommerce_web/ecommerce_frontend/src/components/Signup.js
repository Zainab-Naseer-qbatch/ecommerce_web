import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Popup } from "./Popup";
import { InputError } from "./InputError";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import "../style/form.css";
import { validateEmail } from "../utils/validateEmail";

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setphone] = useState();
  const [popup, setPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const navigate = useNavigate();

  const updatePopup = (value) => {
    setPopup(value);
  };
  // console.log("popup: ", popup);
  const createUser = async () => {
    return axios
      .post("/signup", {
        fullname: name,
        email: email,
        password: password,
        phone: phone,
      })
      .then((response) => {
        console.log("response: ", response);
        if (response.status === 201) {
          alert("User created successfully!");

          return response.data;
        }
      })
      .catch((err) => {
        console.log("err: ", err);
        setMessage(err.response.data);
        updatePopup(true);
      });
  };
  const createCart = (user) => {
    console.log("id: ", user._id);
    axios
      .post("/createCart", {
        user: user._id,
      })
      .then((response) => {
        console.log("response: ", response);
        navigate("/login");
      })
      .catch((err) => {
        console.log("error: ", err);
      });
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailError === null && phoneError === null) {
      console.log("passsed", emailError, phoneError);

      const user = await createUser();
      if (user) {
        createCart(user);
      }
      console.log("data of axios: ", user);
    } else {
      console.log("input validation failed", emailError, phoneError);
    }
  };

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
