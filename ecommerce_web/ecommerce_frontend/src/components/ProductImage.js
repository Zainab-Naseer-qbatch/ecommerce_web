import React from "react";

export const ProductImage = ({ src, alt }) => {
  return (
    <img
      style={{ height: "240px", width: "100%", marginTop: "5px" }}
      src={src}
      alt={alt}
    />
  );
};
