import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useGetProductQuery } from "../../features/api/apiSlice";
import { ROUTES } from "../../utils/routes";
import Product from "./Product";
import Products from "./Products";
import { getRelatedProducts } from "../../features/products/productsSlice";


/**
 * @component
 * @description Страница для отображения данных товара
 */
const SingleProduct = () => {

	// для отправки действий в react-redux для обновления состосний
	const dispatch = useDispatch();

	// для извлечения данных из хранилища react-redux
	// list - массив с категориями
	// related - массив с товарами идентичной категории
	const { list, related } = useSelector(({ products }) => products);

	// извлекаем id товара из URL при помощи хука react-router-dom
	const { id } = useParams();
	// для перенаправления на другую страницу используем хук react-router-dom"
	const navigate = useNavigate();

	// в отличие от 1 подхода, где нужно явно прописывать состояния для полученных данных, отслеживания загрузки и др.,
	// в данном случае из коробки уже предоставляются готовые состояния
	const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({ id });

	// редирект на главную, если нет данных по товару
	useEffect(() => {
		// при завершении загрузки и в случае неуспеха (н-р, если товар не найден на сервере) перенаправляем на главную,
		// чтобы пользователь не смотрел на пустую страницу
		if (!isFetching && !isLoading && !isSuccess) {
			navigate(ROUTES.HOME);
		}
	}, [navigate, isLoading, isFetching, isSuccess]);

	// вывод товаров той же категории
	useEffect(() => {
		// если нет данных по товару или по категориям, ничего не делаем
		if (!data || !list.length) return;

		// получаем товары идентичной категории, передав id категории текущего товара
		dispatch(getRelatedProducts(data.category.id));
	}, [data, dispatch, list.length]);

	// возвращаем компонент с данными о товаре, если данные пришли с сервера
	return !data ? (
		<section className="preloader">Loading...</section>
	) : (
		<>
			{/* передаем распакованные данные в компонент для отображения данных о товаре */}
			<Product {...data} />
			{/* Выводим список товаров */}
			<Products products={related} amount={5} title="Related products" />
		</>
	);
};

export default SingleProduct;