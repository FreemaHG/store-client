import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import AppRoutes from "../Routes/AppRoutes";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";

import { getCategories } from "../../features/categories/categoriesSlice";
import { getProducts } from "../../features/products/productsSlice";

import UserForm from "../User/UserForm";


const App = () => {
	// хук для отправки действия в хранилище redux для последующей обработки рудьюсерами
	const dispatch = useDispatch();

	// выполняем запросы к серверу для получения данных
	// useEffect выполняет функцию dispatch, только если массив зависимостей изменится, т.е. один раз
	useEffect(() => {
		dispatch(getCategories());  // получаем категории
		dispatch(getProducts());  // получаем товары
	}, [dispatch]);

	return (
		<div className="app">
			{/* Header всегда виден */}
			<Header />
			{/* форма регистрации и авторизации отображается по клику */}
			<UserForm />
			<div className="container">
				{/* сайдбар виден всегда */}
				<Sidebar/>
				{/* в зависимости от URL вырисовывается соответствующий компонент */}
				<AppRoutes/>
			</div>
			{/* footer виден всегда */}
			<Footer/>
		</div>
	);
};

export default App;