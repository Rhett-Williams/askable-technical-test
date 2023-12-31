import { Types } from "../../../types/Types";

export type GetProductsArgs = {
  sortedBy: "CreateDate" | "Price" | undefined;
};

export type GetProductsData = Types.Product[];

export type GetOneProductArgs = {
  productId: string;
};

export type GetOneProductData = Types.Product;

export type CreateProductArgs = Types.CreateProduct;

export type DeleteProductArgs = {
  productId: string;
};
