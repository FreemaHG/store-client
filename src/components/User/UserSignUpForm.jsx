import React, { useState } from "react";
import { useDispatch } from "react-redux";

import styles from "../../styles/User.module.css";
import { createUser } from "../../features/user/userSlice";


/**
 * @component
 * @description Форма для регистрации пользователя
 * @prop {function} closeForm - функция для смены флага вывода формы регистрации
 */
const UserSignUpForm = ({ closeForm }) => {

	// dispatch позволяет вызывать функцию для изменения состояния в redux
	const dispatch = useDispatch();

	// сохраняем значение инпутов в состояние
	const [values, setValues] = useState({
		username: "",
		email: "",
		password: "",
		avatar: "",
	});

	// действие при изменении инпута
	const handleChange = ({ target: { value, name } }) => {
		// ...values - распаковываем все значения
		// [name]: value - динамический ключ и его значение
		setValues({ ...values, [name]: value });
	};

	// отправка данных для регистрации
	const handleSubmit = (e) => {
		// отключаем перезагрузку страницы при отправке формы
		e.preventDefault();

		// проверка, что все поля заполнены (все поля состояния values заполнены)
		// создаем объект (массив), передаем в него значение состояния value, проверяем, что каждое значение есть
		// в isEmpty сохранится true, если какое-либо из полей пустое
		const isNotEmpty = Object.values(values).every((val) => val);

		// если какое-либо из полей пустое, прерываем действие
		if (!isNotEmpty) return;

		// вызываем функцию по регистрации пользователя и получении его данных с сервера
		// передаем состояние с данными пользователя
		dispatch(createUser(values));

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
			<div className={styles.title}>Sign Up</div>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.group}>
					{/* autoComplete=off - отключаем автозаполнение */}
					<input
						type="email"
						placeholder="Your email"
						name="email"
						value={values.email}
						autoComplete="off"
						onChange={handleChange}
						required
					/>
				</div>
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
				<div className={styles.group}>
					<input
						type="avatar"
						placeholder="Your avatar"
						name="avatar"
						value={values.avatar}
						autoComplete="off"
						onChange={handleChange}
						required
					/>
				</div>
				<div className={styles.link}>I already have an account</div>
				<button type="submit" className={styles.submit}>Create an account</button>
			</form>
		</div>
	);
};

export default UserSignUpForm;