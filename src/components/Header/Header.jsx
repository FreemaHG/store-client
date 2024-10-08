import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "../../styles/Header.module.css";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.jpg";
import { ROUTES } from "../../utils/routes";
import { toggleForm } from "../../features/user/userSlice";
import { useGetProductsQuery } from "../../features/api/apiSlice";


/**
 * @component
 * @description Вывод шапки сайта
 */
const Header = () => {

	// dispatch позволяет вызывать функцию для изменения состояния в redux
	const dispatch = useDispatch();

	const navigate = useNavigate();

	// состояние для хранения введенного инпута для поиска товара
	const [searchValue, setSearchValue] = useState("");

	// получаем данные по текущему пользователю и его корзины из хранилища redux
	const { currentUser, cart } = useSelector(({ user }) => user);

	// состояние для отображения логика и аватарки авторизованного пользователя
	// для неавторизованного пользователя отображения данных по умолчанию (гостевых)
	const [values, setValues] = useState({ username: "Guest", avatar: avatar });

	// передаем название товара, введенное в инпут поиска товара
	const { data, isLoading } = useGetProductsQuery({ title: searchValue });

	useEffect(() => {
		// ничего не делаем, если нет текущего пользователя
		if (!currentUser) return;

		// добавляем данные о логине и аватаре текущего пользователя, если есть данные
		setValues(currentUser);

	}, [currentUser]);

	// обработчик клика по иконке пользователя
	const handleClick = () => {
		// если нет данных о текущем пользователе, передаем значение флага для смены состояния для вывода формы регистрации
		if (!currentUser) dispatch(toggleForm(true));
		// в противном случае перенаправляем на страницу профиля
		else navigate(ROUTES.PROFILE);
	};

	// обработка при изменении инпута поиска товара
	const handleSearch = ({ target: { value } }) => {
		// сохраняем новое значение в состояние с введенным инпутом для поиска товара
		setSearchValue(value);
	};

	return (
		<div className={styles.header}>

			{/* логотип */}
			<div className={styles.logo}>
				<Link to={ROUTES.HOME}>
					<img src={logo} alt="Stuff"/>
				</Link>
			</div>

			<div className={styles.info}>

				{/* иконка и имя пользователя */}
				<div className={styles.user} onClick={handleClick}>
					{/* подставляем логин и аватарку из состояния */}
					<div className={styles.avatar} style={{ backgroundImage: `url(${values.avatar})` }}/>
					<div className={styles.username}>{values.username}</div>
				</div>

				{/* форма для поиска */}
				<form className={styles.form}>
					<div className={styles.icon}>
						<svg className="icon">
							{/* process.env.PUBLIC_URL - путь до папки public проекта */}
							<use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`}/>
						</svg>
					</div>
					<div className={styles.input}>
						{/* autoComplete="off" - отключение автодополнения */}
						{/* вызываем функцию handleSearch при изменении инпута */}
						<input
							type="search"
							name="search"
							placeholder="Search for anything..."
							autoComplete="off"
							onChange={handleSearch}
							value={searchValue}
						/>
					</div>
					{/*	если есть значение в searchValue, отображаем блок с данными, найденными по введенному тексту */}
					{/*
					 	вложенное условие с ? :
						пока идет загрузка, выводим 'Loading'
						если длина массива с товарами = 0, выводим, что нет результатов
				 	*/}
					{searchValue && (
						<div className={styles.box}>
							{isLoading
								? 'Loading'
								: !data.length
								? 'No results'
								: data.map(({id, title, images}) => {
									return (
										// при клике по ссылке очищаем значение введенного инпута для поиска товара
										<Link
											key={id}
											onClick={() => setSearchValue("")}
											className={styles.item}
											to={`/products/${id}`}
										>
											<div
												className={styles.image}
												style={{ backgroundImage: `url(${images[0]})` }}
											/>
											<div className={styles.title}>{title}</div>
										</Link>
									);
								})}
						</div>
					)}
				</form>

				{/*	иконки для избранного и корзины */}
				<div className={styles.account}>
					{/* избранное */}
					<Link to={ROUTES.HOME} className={styles.favourites}>
						<svg className={styles["icon-fav"]}>
							<use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`}/>
						</svg>
					</Link>
					{/* корзина */}
					<Link to={ROUTES.CART} className={styles.cart}>
						<svg className={styles["icon-cart"]}>
							<use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`}/>
						</svg>
						{/* отображаем кол-во товаров в корзине, если они есть */}
						{/* через двойное отрицание избавляемся от вывода 0, если товаров нет */}
						{!!cart.length && (
							<span className={styles.count}>{cart.length}</span>
						)}
					</Link>
				</div>

			</div>

		</div>
	);
};

export default Header;