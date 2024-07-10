import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


// создание (регистрация) пользователя
export const createUser = createAsyncThunk(
	// 1 аргумент - URL адрес + название функции
	"users/createUser",
	async (payload, thunkAPI) => {
		// выполняем запрос к API для получения категорий, в catch обрабатываем ошибку
		try {
			// process.env.REACT_APP_API_URL - подставляет URL API из .env
			// TODO Поменять на свой URL авторизации пользователя!!!
			// const res = await axios(`${process.env.REACT_APP_API_URL}/categories`);
			const res = await axios.post("https://api.escuelajs.co/api/v1/users/", payload);
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
const userSlice = createSlice({
	name: "user",
	// состояния
	initialState: {
		currentUser: null,  // текущий пользователь, по умолчанию null
		cart: [],  // по умолчанию пустой массив с данными о товарах в корзине
		isLoading: false,  // для отслеживания загрузки данных с сервера
		formType: "signup",  // тип формы (регистрация)
		showForm: false,  // флаг для отображения формы регистрации
	},
	// вызываемые действия для смены состояния в хранилище redux
	reducers: {
		// добавление товара в корзину
		addItemToCart: (state, { payload }) => {
			// добавляем в переменную все уже имеющиеся товары в состоянии с товарами в корзине
			let newCart = [...state.cart];
			// если добавляемый товар уже есть в корзине,
			// ищем среди них товар с соответствующим id, чтобы увеличить его счетчик
			const found = state.cart.find(({ id }) => id === payload.id);

			if (found) {
				newCart = newCart.map((item) => {
					return item.id === payload.id
						? { ...item, quantity: payload.quantity || item.quantity + 1 }
						: item;
				});
				// добавляем элемент в конец массива, возвращая его длину
				// добавляем новый товар в корзину и его кол-во
			} else newCart.push({ ...payload, quantity: 1 });

			// добавляем в состояние с корзинами новую созданную корзину с товарами
			state.cart = newCart;
		},
		// смена флага для вывода формы регистрации
		// state - объект со всеми состояниями
		// payload - новое значение состояния
		toggleForm: (state, { payload }) => {
			// меняем флаг на переданный
			state.showForm = payload;
		}
	},
	extraReducers: (builder) => {
		// // 1 аргумент состояние, 2 аргумент - действие, результатом которого будет новое состояние
		// // обработка состояния промиса - pending (ожидание)
		// builder.addCase(getCategories.pending, (state) => {
		// 	// обновляем состояние с флагом загрузки
		// 	state.isLoading = true;
		// });
		// обработка состояния промиса - fulfilled (результат запроса)
		builder.addCase(createUser.fulfilled, (state, action) => {
			// обновляем состояние с данными созданного пользователя
			state.currentUser = action.payload;
		});
		// // обработка состояния промиса - rejected (ошибка)
		// builder.addCase(getCategories.rejected, (state) => {
		// 	state.isLoading = false;
		// 	// т.к. в getCategories ошибка обрабатывается в блоке catch, то здесь не обязательно выводить и делать что-либо
		// });
	},
});

export const { addItemToCart, toggleForm } = userSlice.actions;
export default userSlice.reducer;