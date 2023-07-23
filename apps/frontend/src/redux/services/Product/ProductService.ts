import API from "../../Api";
import { GetProductsArgs, GetProductsData } from "./ProductTypes";

const ProductService = API.injectEndpoints({
    endpoints: builder => ({
        getProducts: builder.mutation<GetProductsData, GetProductsArgs>({
            query: (args) => ({
                url: "/getProducts",
                method: "POST",
                body: args,
            }), extraOptions: { retryCondition: () => false}
        })
    })
})

export const  { useGetProductsMutation } = ProductService