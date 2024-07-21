import React, { useEffect, useState } from "react";

import styles from "../../styles/Profile.module.css";
import { updateUser } from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";


/**
 * @component
 * @description Форма для обновления данных пользователя
 */
const Profile = () => {

	// dispatch позволяет вызывать функцию для изменения состояния в redux
	const dispatch = useDispatch();

	// извлекаем из хранилища react-redux данные о текущем пользователе
	const { currentUser } = useSelector(({ user }) => user);

	// сохраняем значение инпутов в состояние
	const [values, setValues] = useState({
		username: "",
		email: "",
		password: "",
		avatar: "",
	});

	useEffect(() => {
		// ничего не делаем, если нет текущего пользователя
		if (!currentUser) return

		// добавляем данные о логине и аватаре текущего пользователя, если есть данные
		setValues(currentUser);

	}, [currentUser]);

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

		// вызываем функцию по обновлению данных пользователя и получении обновленных данных с сервера
		// передаем состояние с данными пользователя
		dispatch(updateUser(values));

	};

	return (
		<section className={styles.profile}>
			{/* если текущий пользователь не авторизован, выводим предупреждение, иначе форму для обновления данных о себе */}
			{!currentUser ? <span>You need to login</span> : (
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
					<button type="submit" className={styles.submit}>Update</button>
				</form>
			)}

		</section>
	);
};

export default Profile;