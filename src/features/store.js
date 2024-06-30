import { configureStore } from "@reduxjs/toolkit";

import categoriesSlice from "./categories/categoriesSlice";
import productsSlice from "./products/productsSlice";
import userSlice from "./user/userSlice";
import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
	// глобальные состояния, доступные в любом компоненте
	reducer: {
		// 1 подход для запросов данных с сервера
		categories: categoriesSlice,
		products: productsSlice,
		user: userSlice,
		// 2 подход для запросов данных с сервера
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: (getMiddleware) => getMiddleware().concat(apiSlice.middleware),
	devTools: true,
});