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
	// продолжение 2 подхода
	// Добавление промежуточного программного обеспечения api позволяет выполнять кэширование, аннулирование, опрос
	// и другие полезные функции "rtk-запроса".
	middleware: (getMiddleware) => getMiddleware().concat(apiSlice.middleware),
	devTools: true,
});