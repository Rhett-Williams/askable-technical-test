import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetOneProductQuery } from "../../redux/services/Product/ProductService";
import { useCreateOrderMutation } from "../../redux/services/Order/OrderService";
import { ColorRing } from "react-loader-spinner";

const ViewProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  if(!productId) {navigate('/products'); return <></>}
  const {data} = useGetOneProductQuery({productId})
  const [createOrder] = useCreateOrderMutation()
  const [isCreateOrderLoading, setIsCreateOrderLoading] = useState(false)

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
    </div>
  );
};

export default ViewProduct;
