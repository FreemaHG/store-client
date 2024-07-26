import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { shuffle } from "../../utils/common";


// 1 подход для запросов данных с сервера
// асинхронная функция для получения товаров с сервера, возвращает промис - результат в будущем!
export const getProducts = createAsyncThunk(
	// 1 аргумент - URL адрес + название функции
	"products/getProducts",
	async (_, thunkAPI) => {
		// выполняем запрос к API для получения товаров, в catch обрабатываем ошибку
		try {
			// подставляет URL API из .env
			const res = await axios(`${process.env.REACT_APP_API_URL}/products`);
			// из-за пагинации возвращаем вложенный объект по ключу items с массивом товаров
			return res.data;
		} catch (err) {
			console.error(err);
			return thunkAPI.rejectWithValue(err);
		}
	}
);

/*
В редукторе обрабатываем 3 состояния промиса (генерируем редьюсеры для каждого действия):
	- pending - начальное состояние промиса (ожидает разрешения (успешный ответ) или отклонения (ошибку))
	- fulfilled - промис выполнен и содержит значение
	- rejected - промис не выполнен и содержит ошибку
*/
const productsSlice = createSlice({
	name: "products",
	// состояния
	initialState: {
		list: [],  // по умолчанию пустой список товарами
		filtered: [],  // отфильтрованные товары
		related: [],  // похожие товары
		isLoading: false,  // для отслеживания загрузки данных с сервера
	},
	reducers: {
		// функция для фильтрации товаров по цене
		// state - состояние с товарами с сервера
		// payload - цена для фильтрации
		filterByPrice: (state, { payload }) => {
			// сохраняем в состояние filtered массив с отфильтрованными по цене товарами
			state.filtered = state.list.filter(({ price }) => price <= payload);
		},
		// возврат товаров той же категории
		getRelatedProducts: (state, { payload }) => {
			const list = state.list.filter(({ category: { id } }) => id === payload);
			// сохраняем в состояние перемешанный массив с товарами той же категории
			state.related = shuffle(list);
		},
	},
	extraReducers: (builder) => {
		// 1 аргумент состояние, 2 аргумент - действие, результатом которого будет новое состояние
		// обработка состояния промиса - pending (ожидание)
		builder.addCase(getProducts.pending, (state) => {
			// обновляем состояние с флагом загрузки
			state.isLoading = true;
		});
		// обработка состояния промиса - fulfilled (результат запроса)
		builder.addCase(getProducts.fulfilled, (state, action) => {
			// обновляем состояние с категориями
			// ВАЖНО: в коде мы как будто бы мутируем состояние (оригинал), но под капотом redux изменяет копию списка!
			state.list = action.payload;
			state.isLoading = false;  // выключаем флаг загрузки
		});
		// обработка состояния промиса - rejected (ошибка)
		builder.addCase(getProducts.rejected, (state) => {
			state.isLoading = false;
			// т.к. в getCategories ошибка обрабатывается в блоке catch, то здесь не обязательно выводить и делать что-либо
		});
	},
});

export default productsSlice.reducer;
// экспортируем для доступа к хранилищу redux внутри компонентов через функцию dispatch
export const { filterByPrice, getRelatedProducts } = productsSlice.actions;