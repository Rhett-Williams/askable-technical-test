import API from "../../Api";
import { CreateOrderArgs } from "./OrderTypes";

const ProductService = API.injectEndpoints({
    endpoints: builder => ({
        createOrder: builder.mutation<void, CreateOrderArgs>({
            query: (args) => ({
                url: "/createOrder",
                method: "POST",
                body: args,
            }), extraOptions: { retryCondition: () => false}, invalidatesTags: ['Product']
        }),
    })
})

export const  { useCreateOrderMutation } = ProductService