import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useGetProductsQuery } from "../../features/api/apiSlice";
import Products from "../Products/Products";
import styles from "../../styles/Category.module.css";

/**
 * @component
 * @description Блок для отображения товаров одной категории с возможностью фильтрации
 */
const Category = () => {

	// извлекаем id текущей категории из URL
	const { id } = useParams();

	// дефолтные значения для фильтрации товаров
	const defaultValues = {
		title: "",
		price_min: 0,
		price_max: 0,
	}

	// дефолтные параметры для фильтрации товаров
	const defaultParams = {
		categoryId: id,
		...defaultValues,
	};

	// значения для фильтрации товаров
	const [values, setValues] = useState(defaultValues);

	// значения параметров для фильтрации товаров
	const [params, setParams] = useState(defaultParams);

	useEffect(() => {
		// ничего не делаем, если нет id категории
		if (!id) return;
		// распаковываем все параметры, в конце перезаписывая id категории текущим значением
		setParams({ ...defaultParams, categoryId: id });
	}, [id]);

	// вызывая функцию useGetProductsQuery делаем запрос по URL /products, передав параметры, н-р, categoryId (/products?categoryId=1)
	// фильтрация товаров по категории, названию, мин и макс цене
	// получаем отфильтрованные данные, флаг окончания загрузки, статус ответа
	const { data, isLoading, isSuccess } = useGetProductsQuery(params);

	// обновление состояний со значениями фильтров при изменении инпутов
	const handleChange = ({ target: { value, name } }) => {
		setValues({ ...values, [name]: value });
	};

	// при нажатии Enter в форме обновляем состояния и параметры фильтрации
	// при обновлении состояний происходит перерисовка компонента и вызов функции useGetProductsQuery с новыми параметрами для фильтрации
	const handleSubmit = (e) => {
		// отключаем перезагрузку страницы при отправке формы
		e.preventDefault();
		// распаковываем параметры и значения для фильтрации товаров
		setParams({ ...params, ...values });
	}

	return (
		<section className={styles.wrapper}>
			<h2 className={styles.title}>Shoes</h2>
			<form className={styles.filters} onSubmit={handleSubmit}>
				<div className={styles.filter}>
					<input
						type="text"
						name="title"
						onChange={handleChange}
						placeholder="Product name"
						value={values.title}
					/>
				</div>
				<div className={styles.filter}>
					<input
						type="number"
						name="price_min"
						onChange={handleChange}
						placeholder="0"
						value={values.price_min}
					/>
				</div>
				<div className={styles.filter}>
					<input
						type="number"
						name="price_max"
						onChange={handleChange}
						placeholder="0"
						value={values.price_max}
					/>
				</div>
				<button type="submit" hidden/>
			</form>

			{/* вложенный ? : */}
			{/*
				выводим лоадер, пока не завершится загрузка;
				пишем, что нет результатов, если статус ответа от сервера не успешный или товаров нет + кнопка сброса фильтров;
				выводим компонент с товарами, если все ОК
			*/}
			{isLoading ? (
				<div className="preloader">Loading ...</div>
			) : !isSuccess || !data.length ? (
				<div className={styles.back}>
					<span>No results</span>
					<button>Reset</button>
				</div>
			) : (
				<Products
					title=""
					products={data}
					style={{ padding: 0 }}
					amount={data.length}
				/>
			)}
		</section>
	);
};

export default Category;