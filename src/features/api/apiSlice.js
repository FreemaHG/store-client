import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { buildUrl } from "../../utils/common";


// 2 подход для запросов данных с сервера
export const apiSlice = createApi({
	reducerPath: "api",
	// базовый URL (будет автоматически дополняться из endpoints)
	// process.env.REACT_APP_API_URL - подставляет URL API из .env
	baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
	tagTypes: ["Product"],
	endpoints: (builder) => ({
		getProduct: builder.query({
			query: ({ id }) => `/products/${id}`,
			providesTags: ["Product"],
		}),
		getProducts: builder.query({
			query: (params) => buildUrl("/products", params),
			providesTags: ["Products"],
		}),
	}),
});

export const { useGetProductQuery, useGetProductsQuery } = apiSlice;