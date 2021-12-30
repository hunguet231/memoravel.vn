import React from "react";
import ProductDetails from "./ProductDetails";
import ProductRating from "./ProductRating";
import ProductStory from "./ProductStory";

export default function Products() {
  return (
    <div className="wrapper">
      {/* <div style={{ height: "50vh", backgroundColor: "#F6F4ED", zIndex: "12" }} /> */}
      <div className="container">
        <div style={{ margin: "180px 0" }}>
          <ProductDetails />
          <div style={{ height: "100px" }} />
          <ProductStory />
          <div style={{ height: "100px" }} />
          <ProductRating />
        </div>
      </div>
    </div>
  );
}
