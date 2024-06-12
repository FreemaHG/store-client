import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import AppRoutes from "../Routes/AppRoutes";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import { getCategories } from "../../features/categories/categoriesSlice";


const App = () => {
	// хук для отправки действия в хранилище redux для последующей обработки рудьюсерами
	const dispatch = useDispatch();

	// выполняем функцию dispatch, только если массив зввисимостей изменится, т.е. один раз
	useEffect(() => {
		dispatch(getCategories());
	}, [dispatch]);

	return (
		<div className="app">
			<Header/>
			<div className="container">
				<Sidebar/>
				<AppRoutes/>
			</div>
			<Footer/>
		</div>
	);
};

export default App;