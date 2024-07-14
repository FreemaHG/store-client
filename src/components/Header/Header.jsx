import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "../../styles/Header.module.css";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.jpg";
import { ROUTES } from "../../utils/routes";
import { toggleForm } from "../../features/user/userSlice";


/**
 * @component
 * @description Вывод шапки сайта
 */
const Header = () => {

	// dispatch позволяет вызывать функцию для изменения состояния в redux
	const dispatch = useDispatch();

	// получаем данные по текущему пользователю из хранилища redux
	const { currentUser } = useSelector(({ user }) => user);

	// состояние для отображения логика и аватарки авторизованного пользователя
	// для неавторизованного пользователя отображения данных по умолчанию (гостевых)
	const [values, setValues] = useState({ username: "Guest", avatar: avatar });

	useEffect(() => {
		// ничего не делаем, если нет текущего пользователя
		if (!currentUser) return

		// добавляем данные о логине и аватаре текущего пользователя, если есть данные
		setValues(currentUser);

	}, [currentUser]);

	// обработчик клика по иконке пользователя
	const handleClick = () => {
		// если нет данных о текущем пользователе, передаем значение флага для смены состояния для вывода формы регистрации
		if (!currentUser) dispatch(toggleForm(true));
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
						<input
							type="search"
							name="search"
							placeholder="Search for anything..."
							autoComplete="off"
							onChange={() => {
							}}
							value=""
						/>
					</div>
					{/*	блок с данными, найденными по введенному тексту (скрыт пока нет введенного текста!) */}
					{false && <div className={styles.box}></div>}
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
						{/* кол-во товаров в корзине */}
						<span className={styles.count}>2</span>
					</Link>
				</div>

			</div>

		</div>
	);
};

export default Header;