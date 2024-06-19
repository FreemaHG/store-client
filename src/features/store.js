import { configureStore } from "@reduxjs/toolkit";

import categoriesSlice from "./categories/categoriesSlice";
import productsSlice from "./products/productsSlice";

export const store = configureStore({
	// глобальные состояния, доступные в любом компоненте
	reducer: {
		categories: categoriesSlice,
		products: productsSlice,
	},
	devTools: true,
});