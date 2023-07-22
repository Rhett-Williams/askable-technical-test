import React from "react";
import { useParams } from "react-router-dom";

const ViewProduct = () => {
  const { productId } = useParams();

  return <h2>View Product ID: {productId}</h2>;
};

export default ViewProduct;
