import React from "react";

export const InputError = ({ error, margin }) => {
  return (
    <span
      style={{
        fontWeight: "bold",
        color: "#d71515",
        marginRight: margin,
      }}
    >
      {error}
    </span>
  );
};
