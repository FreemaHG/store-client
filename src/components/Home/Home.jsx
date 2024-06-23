import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Poster from "../Poster/Poster";
import Products from "../Products/Products";
import Categories from "../Categories/Categories";
import Banner from "../Banner/Banner";
import { filterByPrice } from "../../features/products/productsSlice";


const Home = () => {

	// хук для отправки действия в хранилище redux для последующей обработки рудьюсерами
	const dispatch = useDispatch();

	// через хук получаем данные по товарам и категориям из хранилища redux
	const { products: { list, filtered }, categories } = useSelector((state) => state);

	// выполняем запросы к серверу для получения данных
	// useEffect выполняет функцию dispatch, только если массив зависимостей изменится, т.е. один раз
	useEffect(() => {
		// если в массиве с товарами нет элементов - ничего не делаем
		if (!list.length) return;
		// в противном случае фильтруем товары
		dispatch(filterByPrice(50));  // фильтруем товары по цене
	}, [dispatch, list.length]);

	return (
		<>
			<Poster/>
			<Products products={list} amount={5} title="Trending"/>
			<Categories categories={categories.list} amount={5} title="Worth seeing"/>
			<Banner/>
			<Products products={filtered} amount={5} title="Less than 100$"/>
		</>
	);
};

export default Home;