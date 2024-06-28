import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


// 2 подход для запросов данных с сервера
export const apiSlice = createApi({
	reducerPath: "api",
	// базовый URL (будет автоматически дополняться из endpoints)
	// process.env.REACT_APP_API_URL - подставляет URL API из .env
	baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
	// baseQuery: fetchBaseQuery({ baseUrl: "https://api.escuelajs.co/api/v1" }),
	tagTypes: ["Product"],
	endpoints: (builder) => ({
		getProduct: builder.query({
			query: ({ id }) => `/products/${id}`,
			providesTags: ["Product"],
		}),
	}),
});

export const { useGetProductQuery } = apiSlice;