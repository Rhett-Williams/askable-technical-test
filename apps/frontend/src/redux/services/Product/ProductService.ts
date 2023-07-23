import API from "../../Api";
import { GetOneProductArgs, GetOneProductData, GetProductsArgs, GetProductsData } from "./ProductTypes";

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
        })
    })
})

export const  { useGetProductsMutation, useGetOneProductQuery } = ProductService