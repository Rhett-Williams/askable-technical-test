import React, { useState } from "react";
import { Field, ErrorMessage, useFormik, Formik, Form } from "formik";
import * as Yup from "yup";
import { useCreateProductMutation } from "../../redux/services/Product/ProductService";
import { Types } from "../../types/Types";
import "./Create.css";
import { useNavigate } from "react-router";
import { ColorRing } from "react-loader-spinner";

const Create = () => {
  const navigate = useNavigate();
  const [createProduct] = useCreateProductMutation();
  const [isCreateLoading, setIsCreateLoading] = useState(false);

  const initialValues: Types.CreateProduct = {
    title: "",
    category: "Clothing",
    price: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    category: Yup.string()
      .required("Category is required")
      .oneOf(["Sneakers", "Clothing", "Watches", "Hats"], "Invalid category"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be positive"),
  });

  const FormComponent = () => {
    const handleSubmit = async (values: Types.CreateProduct) => {
      setIsCreateLoading(true);
      try {
        console.log("values", values);
        await createProduct(values).unwrap();
        await new Promise((resolve) => setTimeout(resolve, 3000));
        navigate("/products");
      } catch (error) {
        console.log("error", error);
      }
      setIsCreateLoading(false);
    };

    const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit: handleSubmit,
    });

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-item">
            <label htmlFor="title">Title:</label>
            <Field type="text" id="title" name="title" />
            <ErrorMessage className="error-text" name="title" component="div" />
          </div>

          <div className="form-item">
            <label htmlFor="category">Category:</label>
            <Field as="select" id="category" name="category">
              <option value="" hidden disabled>
                Categories
              </option>
              <option value="Sneakers">Sneakers</option>
              <option value="Clothing">Clothing</option>
              <option value="Watches">Watches</option>
              <option value="Hats">Hats</option>
            </Field>
            <ErrorMessage
              className="error-text"
              name="category"
              component="div"
            />
          </div>

          <div className="form-item">
            <label htmlFor="price">Price:</label>
            <Field type="number" id="price" name="price" />
            <ErrorMessage className="error-text" name="price" component="div" />
          </div>

          <button className="form-item" type="submit">
            {isCreateLoading ? (
              <ColorRing
                visible={true}
                height="20"
                width="20"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["yellow", "pink", "green", "blue", "purple"]}
              />
            ) : (
              "Submit"
            )}
          </button>
        </Form>
      </Formik>
    );
  };
  return <div>{FormComponent()}</div>;
};

export default Create;
