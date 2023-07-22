import { Database } from "./data/Database";

const express = require('express');
const router = express.Router();
const { celebrate, Joi, Segments } = require('celebrate');

const handleErrors = (err, req, res, next) => {
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
        sortedBy: Joi.string().valid("createDate", "Price").allow(null, '').optional(),
      })
    }),
    validateGetOneProduct: celebrate({
        body: Joi.object({
          productId: Joi.string().required(),
        })
      }),
  };

router.post('/getProducts', validationSchemas.validateGetProducts, async (req, res) => {res.send(Database.getProducts(req.body.sortedBy))});
router.post('/getOneProduct', validationSchemas.validateGetOneProduct, async (req, res) => {res.send(Database.getOneProduct(req.body.productId))});

router.use(handleErrors);

module.exports = router;