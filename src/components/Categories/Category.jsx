import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useGetProductsQuery } from "../../features/api/apiSlice";
import Products from "../Products/Products";
import styles from "../../styles/Category.module.css";

/**
 * @component
 * @description Блок для отображения товаров одной категории с возможностью фильтрации и пагинации
 */
const Category = () => {

	// извлекаем id текущей категории из URL
	const { id } = useParams();

	// получаем и реструктуризируем список категорий из хранилища redux
	const { list } = useSelector(({ categories }) => categories);

	// дефолтные значения (не обязательные) для фильтрации товаров
	const defaultValues = {
		title: "",
		price_min: 0,
		price_max: 0,
	};

	// дефолтные параметры (обязательные) для фильтрации товаров
	const defaultParams = {
		categoryId: id,
		// пагинация
		offset: 0,  // с какого товара выводить (от 0 до 5 - 5 товаров)
		limit: 5,  // кол-во товаров
		...defaultValues,
	};

	// флаг для скрытия кнопки для показа новой порции товаров, когда товары больше не приходят с сервера
	const [isEnd, setIsEnd] = useState(false);

	// наименование текущей категории
	const [category, setCategory] = useState(null);

	// товары
	const [items, setItems] = useState([]);

	// значения для фильтрации товаров
	const [values, setValues] = useState(defaultValues);

	// значения параметров для фильтрации товаров
	const [params, setParams] = useState(defaultParams);

	// вызывая функцию useGetProductsQuery делаем запрос по URL /products, передав параметры, н-р, categoryId (/products?categoryId=1)
	// фильтрация товаров по категории, названию, мин и макс цене
	// получаем отфильтрованные данные, флаг окончания загрузки, статус ответа
	const { data = [], isLoading, isSuccess } = useGetProductsQuery(params);

	// обновление состояний при смене id категории (переходе на другую страницу категории)
	useEffect(() => {
		// ничего не делаем, если нет id категории
		if (!id) return;
		// сбрасываем параметры при смене id текущей категории
		setValues(defaultValues);
		// очищаем список с похожими товарами
		setItems([]);
		// меняем флаг кнопки на дефолтный
		setIsEnd(false);
		// распаковываем все параметры, в конце перезаписывая id категории текущим значением
		setParams({ ...defaultParams, categoryId: id });
		// для отключения правила ESLint, связанного с зависимостями в хуках (чтобы не было надоедливого предупреждения)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	// обновление состояний при загрузке новой порции товаров по пагинации
	useEffect(() => {
		// ничего не делаем, если загрузка не завершена
		if (isLoading) return;
		// если кол-во товаров меньше лимита (меньше 5), скрываем кнопку загрузки + не блокируем добавление новых товаров для вывода
		if (data.length < defaultParams.limit) setIsEnd(true);
		// Если кол-во товаров 0, прерываем функцию (флаг скрытия кнопки уже сменен выше)
		if (!data.length) return;
		// сохраняем в состоянии старые товары + новые
		setItems((_items) => [..._items, ...data]);
	}, [data, isLoading, defaultParams.limit]);

	// обновление состояния с названием категории
	useEffect(() => {
		// ничего не делаем, если нет id текущей категории или массив с категориями пустой
		if (!id || !list.length) return;

		// сохраняем категорию, в которой id равен id текущей категории
		// умножаем на 1, чтобы привести из строки (id из URL) к числовому типу, т.к. сравниваем через ===
		const category = list.find((item) => item.id === id * 1);
		// сохраняем в состояние название текущей категории
		setCategory(category);
	}, [list, id]);

	// обновление состояний со значениями фильтров при изменении инпутов
	const handleChange = ({ target: { value, name } }) => {
		setValues({ ...values, [name]: value });
	};

	// при обновлении состояний происходит перерисовка компонента и вызов функции useGetProductsQuery с новыми параметрами для фильтрации
	const handleSubmit = (e) => {
		// отключаем перезагрузку страницы при отправке формы
		e.preventDefault();
		// обнуляем состояние с товарами
		setItems([]);
		// меняем флаг кнопки на дефолтный
		setIsEnd(false);
		// распаковываем параметры и значения для фильтрации товаров
		setParams({ ...defaultParams, ...values });
	};

	// сброс параметров фильтрации товаров
	const handleReset = () => {
		setValues(defaultValues);
		setParams(defaultParams);
		// смена флага вывода кнопки подгрузки еще товаров
		setIsEnd(false);
	}

	return (
		<section className={styles.wrapper}>
			{/* выводим название текущей категории (только если есть такое свойство!) */}
			<h2 className={styles.title}>{category?.name}</h2>
			{/* при нажатии Enter в форме обновляем состояния и параметры фильтрации через handleSubmit */}
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
					<span>Price from</span>
				</div>
				<div className={styles.filter}>
					<input
						type="number"
						name="price_max"
						onChange={handleChange}
						placeholder="0"
						value={values.price_max}
					/>
					<span>Price to</span>
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
			) : !isSuccess || !items.length ? (
				<div className={styles.back}>
					<span>No results</span>
					{/* сбрасываем параметры фильтрации */}
					<button onClick={handleReset}>Reset</button>
				</div>
			) : (
				<Products
					title=""
					products={items}
					style={{ padding: 0 }}
					amount={items.length}
				/>
			)}
			{/*
				показываем кнопку только, если флаг не активен (флаг меняется, если новые статьи не приходят больше)
			*/}
			{/*
				при клике обновляем состояние с параметрами: сохраняем старые параметры + обновляем offset (с какой записи выводить новую партию товаров (пагинация))
				к старому значению offset + кол-во выводимых записей.
			*/}
			{!isEnd && (
				<div className={styles.more}>
					<button onClick={() => setParams({ ...params, offset: params.offset + params.limit })}>
						See more
					</button>
				</div>
			)}
		</section>
	);
};

export default Category;