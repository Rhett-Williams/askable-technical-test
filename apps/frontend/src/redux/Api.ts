import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  retry,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000",
  prepareHeaders: async (headers, api) => {
    return headers;
  },
  credentials: "include",
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 2 });

const API = createApi({
  reducerPath: "AskableApi",
  baseQuery: baseQueryWithRetry,
  endpoints: () => ({}),
  tagTypes: ["Product", "Order"],
});

export default API;
