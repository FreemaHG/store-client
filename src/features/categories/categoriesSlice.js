import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

// асинхронная функция для получения категорий с сервера, возвращает промис - результат в будущем!
export const getCategories = createAsyncThunk(
	// 1 аргумент - URL адрес + название функции categoriesSlice
	"categories/categoriesSlice",
	async (_, thunkAPI) => {
		// выполняем запрос к API для получения категорий, в catch обрабатываем ошибку
		try {
			// по умолчанию axios делает GET-запрос (можно не писать axios.get()
			const res = await axios(`${BASE_URL}/categories`);
			return res.data;  // возвращаем результат
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
const categoriesSlice = createSlice({
	name: "categories",
	// состояния
	initialState: {
		list: [],  // по умолчанию пустой список с категориями
		isLoading: false,  // для отслеживания загрузки данных с сервера
	},
	extraReducers: (builder) => {
		// 1 аргумент состояние, 2 аргумент - действие, результатом которого будет новое состояние
		// обработка состояния промиса - pending (ожидание)
		builder.addCase(getCategories.pending, (state) => {
			// обновляем состояние с флагом загрузки
			state.isLoading = true;
		});
		// обработка состояния промиса - fulfilled (результат запроса)
		builder.addCase(getCategories.fulfilled, (state, action) => {
			// обновляем состояние с категориями
			// ВАЖНО: в коде мы как будто бы мутируем состояние (оригинал), но под капотом redux изменяет копию списка!
			state.list = action.payload;
			state.isLoading = false;  // выключаем флаг загрузки
		});
		// обработка состояния промиса - rejected (ошибка)
		builder.addCase(getCategories.rejected, (state) => {
			state.isLoading = false;
			// т.к. в getCategories ошибка обрабатывается в блоке catch, то здесь не обязательно выводить и делать что-либо
		});
	},
});

export default categoriesSlice.reducer;