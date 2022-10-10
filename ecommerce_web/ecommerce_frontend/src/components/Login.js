import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { validateEmail } from "../utils/validateEmail";
import { InputError } from "./InputError";
import { getCart } from "../redux/cartSlice";
import { login } from "../redux/userSlice";
import "../style/form.css";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { err, isloggedIn, loggedUser } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [error, setError] = useState(err);
  const handleEmail = (e) => {
    setEmail(e.target.value);
    const msg = validateEmail(e);
    setEmailError(msg);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailError === null) {
      dispatch(login({ email, password }));
    }
  };

  useEffect(() => {
    if (isloggedIn) {
      dispatch(getCart(loggedUser));
      navigate("/home/welcome");
    }
  }, [isloggedIn]);
  useEffect(() => {
    setError(err);
  }, []);

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
                    <InputError error={error} margin={"18rem"} />
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
