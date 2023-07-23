import API from "../../Api";
import { CreateProductArgs, DeleteProductArgs, GetOneProductArgs, GetOneProductData, GetProductsArgs, GetProductsData } from "./ProductTypes";

const ProductService = API.injectEndpoints({
    endpoints: builder => ({
        getProducts: builder.mutation<GetProductsData, GetProductsArgs>({
            query: (args) => ({
                url: "/getProducts",
                method: "POST",
                body: args,
            }), extraOptions: { retryCondition: () => false}
        }),
        getOneProduct: builder.query<GetOneProductData, GetOneProductArgs>({
            query: (args) => ({
                url: `/getOneProduct/${args.productId}`,
            }), extraOptions: { retryCondition: () => false}, providesTags: ['Product']
        }),
        createProduct: builder.mutation<void, CreateProductArgs>({
            query: (args) => ({
                url: `/createProduct`,
                method: "POST",
                body: args,
            }), extraOptions: { retryCondition: () => false}, invalidatesTags: ['Product']
        }),
        deleteProduct: builder.mutation<void, DeleteProductArgs>({
            query: (args) => ({
                url: `/deleteProduct`,
                method: "POST",
                body: args,
            }), extraOptions: { retryCondition: () => false}, invalidatesTags: ['Product']
        })
    })
})

export const  { useGetProductsMutation, useGetOneProductQuery, useCreateProductMutation, useDeleteProductMutation } = ProductService