import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteProductMutation, useGetOneProductQuery } from "../../redux/services/Product/ProductService";
import { useCreateOrderMutation } from "../../redux/services/Order/OrderService";
import { ColorRing } from "react-loader-spinner";
import "./ViewProduct.css"

const ViewProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  if(!productId) {navigate('/products'); return <></>}
  const {data} = useGetOneProductQuery({productId})
  const [createOrder] = useCreateOrderMutation()
  const [deleteProduct] = useDeleteProductMutation()
  const [isCreateOrderLoading, setIsCreateOrderLoading] = useState(false)
  const [isDeleteProductLoading, setIsDeleteProductLoading] = useState(false)

  const onPurchase = async () => {
    setIsCreateOrderLoading(true)
    try {
      if (data?.order_id !== null){
        alert("Product already purchased.")
        throw Error
      }
      await createOrder({productId}).unwrap()
      await new Promise((resolve) => setTimeout(resolve, 3000))
      navigate('/products');
    } catch (error) {
      console.log("error", error)
    }
    setIsCreateOrderLoading(false)
  }

  const onDelete = async () => {
    setIsDeleteProductLoading(true)
    try {
      await deleteProduct({productId}).unwrap()
      await new Promise((resolve) => setTimeout(resolve, 3000))
      navigate('/products');
    } catch (error) {
      console.log("error", error)
    }
    setIsDeleteProductLoading(false)
  }

  return (
    <div>
      <div>{data?.title}</div>
      <div>Category: {data?.category}</div>
      <div>Created Date: {data?.created_at}</div>
      <div>Price: {data?.price}</div>
      <div>Available? {data?.order_id !== null ? "false" : "true"}</div>
      <button onClick={onPurchase}>{isCreateOrderLoading ? <ColorRing
                  visible={true}
                  height="20"
                  width="20"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  colors={["yellow", "pink", "green", "blue", "purple"]}
                /> : "Purchase"}</button>
            <button className="delete-button" onClick={onDelete}>{isDeleteProductLoading ? <ColorRing
                  visible={true}
                  height="20"
                  width="20"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  colors={["yellow", "pink", "green", "blue", "purple"]}
                /> : "Delete"}</button>
    </div>
  );
};

export default ViewProduct;
