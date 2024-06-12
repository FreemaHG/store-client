import { configureStore } from "@reduxjs/toolkit";

import categoriesSlice from "./categories/categoriesSlice";

export const store = configureStore({
	// глобальные состояния, доступные в любом компоненте
	reducer: {
		categories: categoriesSlice,
	},
	devTools: true,
});