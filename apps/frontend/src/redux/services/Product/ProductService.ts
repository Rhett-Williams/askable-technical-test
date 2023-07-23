import API from "../../Api";
import {
  CreateProductArgs,
  DeleteProductArgs,
  GetOneProductArgs,
  GetOneProductData,
  GetProductsArgs,
  GetProductsData,
} from "./ProductTypes";

const ProductService = API.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<GetProductsData, GetProductsArgs>({
      query: (args) => ({
        url: `/getProducts/${args.sortedBy}`,
      }),
      extraOptions: { retryCondition: () => false },
      providesTags: ["Product"],
    }),
    getOneProduct: builder.query<GetOneProductData, GetOneProductArgs>({
      query: (args) => ({
        url: `/getOneProduct/${args.productId}`,
      }),
      extraOptions: { retryCondition: () => false },
      providesTags: ["Product"],
    }),
    createProduct: builder.mutation<void, CreateProductArgs>({
      query: (args) => ({
        url: `/createProduct`,
        method: "POST",
        body: args,
      }),
      extraOptions: { retryCondition: () => false },
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation<void, DeleteProductArgs>({
      query: (args) => ({
        url: `/deleteProduct`,
        method: "POST",
        body: args,
      }),
      extraOptions: { retryCondition: () => false },
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetOneProductQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} = ProductService;
