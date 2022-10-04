import React from "react";
import shoppingbag from "../../assets/icons/shopping-bag.png";

export const Cart = ({ height, width }) => {
  return (
    <img
      src={shoppingbag}
      style={{ height: height, width: width }}
      alt="cart logo"
    />
  );
};
