import { Database } from "./data/Database";

import express from "express";
const router = express.Router();
import { celebrate, Joi, Segments } from "celebrate";

const handleErrors = (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  let statusCode = 500;
  if (err.statusCode) {
    statusCode = err.statusCode;
  }
  console.error(err);
  res.status(statusCode).json({ error: err.message });
};

const validationSchemas = {
  validateGetProducts: celebrate({
    body: Joi.object({
      sortedBy: Joi.string()
        .valid("CreateDate", "Price")
        .allow(null, "")
        .optional(),
    }),
  }),
  validateGetOneProduct: celebrate({
    body: Joi.object({
      productId: Joi.string().required(),
    }),
  }),
  validateCreateProduct: celebrate({
    body: Joi.object({
      title: Joi.string().required(),
      created_at: Joi.string().required(),
      category: Joi.string()
        .valid("Clothing", "Hats", "Sneakers", "Watches")
        .allow(null, "")
        .optional(),
      price: Joi.string().required(),
    }),
  }),
  validateDeleteProduct: celebrate({
    body: Joi.object({
      productId: Joi.string().required(),
    }),
  }),
  validateGetOrder: celebrate({
    body: Joi.object({
      orderId: Joi.string().required(),
    }),
  }),
  validateCreateOrder: celebrate({
    body: Joi.object({
      productId: Joi.string().required(),
    }),
  }),
};

router.post(
  "/getProducts",
  validationSchemas.validateGetProducts,
  async (req, res, next) => {
    try {
      const products = await Database.getProducts(req.body.sortedBy)
      res.send(products);
    } catch (error) {
      console.error("Error creating order:", error);
      next(error);
    }
  }
);
router.get(
  "/getOneProduct/:productId",
  validationSchemas.validateGetOneProduct,
  async (req, res, next) => {
    try {
      const product = await Database.getOneProduct(req.params.productId)
      res.send(product);
    } catch (error) {
      console.error("Error creating order:", error);
      next(error);
    }
  }
);
router.post(
  "/createProduct",
  validationSchemas.validateCreateProduct,
  async (req, res, next) => {
    try {
      const product = await Database.createProduct(req.body)
      res.send(product);
    } catch (error) {
      console.error("Error creating order:", error);
      next(error);
    }
  }
);
router.post(
  "/deleteProduct",
  validationSchemas.validateDeleteProduct,
  async (req, res, next) => {
    try {
      const product = await Database.deleteProduct(req.body.productId)
      res.send(product);
    } catch (error) {
      console.error("Error creating order:", error);
      next(error);
    }
  }
);
router.post(
  "/getOrder",
  validationSchemas.validateGetOrder,
  async (req, res, next) => {
    try {
      const order = await Database.getOrder(req.body.orderId)
      res.send(order);
    } catch (error) {
      console.error("Error creating order:", error);
      next(error);
    }
  }
);
router.post(
  "/createOrder",
  validationSchemas.validateCreateOrder,
  async (req, res, next) => {
    try {
      const order = await Database.createOrder(req.body.productId);
      res.send(order);
    } catch (error) {
      console.error("Error creating order:", error);
      next(error);
    }
  }
);

router.use(handleErrors);

export default router;
