import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useGetProductQuery } from "../../features/api/apiSlice";
import { ROUTES } from "../../utils/routes";
import Product from "./Product";


// загрузка данных о товаре
const SingleProduct = () => {

	// извлекаем id товара из URL при помощи хука react-router-dom
	const { id } = useParams();
	// для перенаправления на другую страницу используем хук react-router-dom"
	const navigate = useNavigate();

	// в отличие от 1 подхода, где нужно явно прописывать состояния для полученных данных, отслеживания загрузки и др.,
	// в данном случае из коробки уже предоставляются готовые состояния
	const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({ id });

	useEffect(() => {
		// при завершении загрузки и в случае неуспеха (н-р, если товар не найден на сервере) перенаправляем на главную,
		// чтобы пользователь не смотрел на пустую страницу
		if (!isFetching && !isLoading && !isSuccess) {
			navigate(ROUTES.HOME);
		}
	}, [navigate, isLoading, isFetching, isSuccess])

	// возвращаем компонент с данными о товаре, если данные пришли с сервера
	return !data ? (
		<section className="preloader">Loading...</section>
	) : (
		// передаем распакованные данные в компонент
		<Product {...data} />
	);
};

export default SingleProduct;