import React, { useState } from "react";
import { useDispatch } from "react-redux";

import styles from "../../styles/User.module.css";
import { loginUser } from "../../features/user/userSlice";


/**
 * @component
 * @description Форма для авторизации пользователя
 * @prop {function} closeForm - функция для смены флага вывода формы регистрации
 * @prop {function} toggleCurrentFormType - функция для смены флага типа формы
 */
const UserLoginForm = ({ toggleCurrentFormType, closeForm }) => {

	// dispatch позволяет вызывать функцию для изменения состояния в redux
	const dispatch = useDispatch();

	// сохраняем значение инпутов в состояние
	const [values, setValues] = useState({
		username: "",
		password: "",
	});

	// действие при изменении инпута
	const handleChange = ({ target: { value, name } }) => {
		// ...values - распаковываем все значения
		// [name]: value - динамический ключ и его значение
		setValues({ ...values, [name]: value });
	};

	// отправка данных для авторизации
	const handleSubmit = (e) => {
		// отключаем перезагрузку страницы при отправке формы
		e.preventDefault();

		// проверка, что все поля заполнены (все поля состояния values заполнены)
		// создаем объект (массив), передаем в него значение состояния value, проверяем, что каждое значение есть
		// в isEmpty сохранится true, если какое-либо из полей пустое
		const isNotEmpty = Object.values(values).every((val) => val);

		// если какое-либо из полей пустое, прерываем действие
		if (!isNotEmpty) return;

		// вызываем функцию по авторизации пользователя и получении его данных с сервера
		// передаем состояние с данными пользователя
		dispatch(loginUser(values));
		// закрываем форму после отправки данных (смена флага активности вывода формы)
		closeForm()
	}

	return (
		<div className={styles.wrapper}>
			{/* при клике на крестик вызываем переданную функцию по смене флага вывода формы */}
			<div className={styles.close} onClick={closeForm}>
				<svg className="icon">
					<use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`}/>
				</svg>
			</div>
			<div className={styles.title}>Login</div>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.group}>
					<input
						type="name"
						placeholder="Your name"
						name="username"
						value={values.name}
						autoComplete="off"
						onChange={handleChange}
						required
					/>
				</div>
				<div className={styles.group}>
					<input
						type="password"
						placeholder="Your password"
						name="password"
						value={values.password}
						autoComplete="off"
						onChange={handleChange}
						required
					/>
				</div>
				{/* при клике (onClick) вызываем функцию по смене состояния-флага с типом формы на регистрацию */}
				<div
					className={styles.link}
					onClick={() => toggleCurrentFormType("signup")}
				>
					Create an account
				</div>
				<button type="submit" className={styles.submit}>Login</button>
			</form>
		</div>
	);
};

export default UserLoginForm;