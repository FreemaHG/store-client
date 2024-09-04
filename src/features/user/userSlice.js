import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;


// асинхронные функции нельзя выполнять внутри редюсеров, они выносятся отдельно через createAsyncThunk
// и позже подключаются в слайле в extraReducers
// создание (регистрация) пользователя
export const createUser = createAsyncThunk(
	// 1 аргумент - URL адрес + название функции
	"users/createUser",
	async (payload, thunkAPI) => {
		// выполняем POST-запрос к API, в catch обрабатываем ошибку
		try {
			// process.env.REACT_APP_API_URL - подставляет URL API из .env
			// отправляем POST-запрос с данными из формы для регистрации пользователя
			const res = await axios.post(`${process.env.REACT_APP_API_URL}/users`, payload);
			return res.data;  // возвращаем результат
		} catch (err) {
			console.error(err);
			return thunkAPI.rejectWithValue(err);
		}
	}
);

// обновление данных пользователя
export const updateUser = createAsyncThunk(
	// 1 аргумент - URL адрес + название функции
	"users/updateUser",
	async (payload, thunkAPI) => {
		// выполняем PUT-запрос к API, в catch обрабатываем ошибку
		try {
			// process.env.REACT_APP_API_URL - подставляет URL API из .env
			// отправляем PUT-запрос с данными из формы для обновления пользователя
			const res = await axios.put(`${process.env.REACT_APP_API_URL}/users/${payload.id}`, payload);
			return res.data;  // возвращаем результат
		} catch (err) {
			console.error(err);
			return thunkAPI.rejectWithValue(err);
		}
	}
);

// авторизация пользователя
export const loginUser = createAsyncThunk(
	// 1 аргумент - URL адрес + название функции
	"users/loginUser",
	async (payload, thunkAPI) => {
		// выполняем запрос к API для получения категорий, в catch обрабатываем ошибку
		try {
			// process.env.REACT_APP_API_URL - подставляет URL API из .env
			// отправляем POST-запрос с данными из формы для авторизации пользователя
			// payload - данные, передаваемые на сервер
			// в res получим токен авторизации
			// {withCredentials: true} - позволяет получать куки с домена с бэкендом
			const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, payload, { withCredentials: true });

			// делаем GET-запрос с токеном для получения данных текущего пользователя
			// withCredentials: true - позволяет передавать куки с текущего домена на домен с бэкендом
			const login = await axios(`${process.env.REACT_APP_API_URL}/users/me`, {
				withCredentials: true,
				// передаем токен, полученный после авторизации пользователя
				headers: {
					"Authorization": `Bearer ${res.data.access_token}`,
					// 'Access-Control-Allow-Origin': '*',
					// 'Content-Type': 'application/json'
				}
			});
			return login.data;  // возвращаем данные текущего пользователя
		} catch (err) {
			console.error(err);
			return thunkAPI.rejectWithValue(err);
		}
	}
);

// добавление данных о текущем пользователе в состояние
const addCurrentUser = (state, { payload }) => {
	// обновляем состояние с данными текущего пользователя
	state.currentUser = payload;
};

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
		// удаление товара из корзины пользователя
		// в payload id товара для удаления
		removeItemFromCart: (state, { payload }) => {
			// деструктуризируем из payload только нужный id
			// после фильтра оставляем в корзине только товары с id не равным переданному
			state.cart = state.cart.filter(({ id }) => id !== payload);
		},
		// смена флага для вывода формы регистрации
		// state - объект со всеми состояниями
		// payload - новое значение состояния
		toggleForm: (state, { payload }) => {
			state.showForm = payload;  // меняем флаг на переданный
		},
		// смена флага с типом формы
		toggleFormType: (state, { payload }) => {
			state.formType = payload;  // меняем флаг на переданный
		}
	},
	// подключаем асинхронные функции по запросу данных с сервера
	// обрабатываем успешный ответ промиса - состояние fulfilled
	// неуспешный ответ - состояние rejected
	extraReducers: (builder) => {
		// обработка состояния промиса - fulfilled (результат запроса)
		// в ответе после регистрации и авторизации функция возвращает данные текущего пользователя
		// передаем эти данные в функцию для обновления состояния о текущем пользователе
		builder.addCase(createUser.fulfilled, addCurrentUser);
		builder.addCase(loginUser.fulfilled, addCurrentUser);
		builder.addCase(updateUser.fulfilled, addCurrentUser);
	},
});

export const { addItemToCart, removeItemFromCart, toggleForm, toggleFormType } = userSlice.actions;
export default userSlice.reducer;