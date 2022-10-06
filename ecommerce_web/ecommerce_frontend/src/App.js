import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { AllProducts } from "./components/AllProducts.js";
import { Product } from "./components/Product.js";
import { Welcome } from "./components/Welcome";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Cart } from "./components/Cart";
import { useSelector } from "react-redux";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={
              useSelector((state) => state.user.loggedUser) != null ? (
                <Navigate to="/home/welcome" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />

          <Route exact path="/home" element={<Home />}>
            <Route exact path="welcome" element={<Welcome />} />
            <Route exact path="products" element={<AllProducts />}>
              <Route exact path=":id" element={<Product />} />
            </Route>
            <Route exact path="cart" element={<Cart />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
