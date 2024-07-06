import React, { useState } from "react";

import styles from "../../styles/User.module.css";


/**
 * @component
 * @description Форма для регистрации пользователя
 * @prop {function} closeForm - функция для смены флага вывода формы регистрации
 */
const UserSignUpForm = ({ closeForm }) => {

	const [values, setValues] = useState({
		name: "",
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

	return (
		<div className={styles.wrapper}>
			{/* при клике на крестик вызываем переданную функцию по смене флага вывода формы */}
			<div className={styles.close} onClick={closeForm}>
				<svg className="icon">
					<use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`}/>
				</svg>
			</div>
			<div className={styles.title}>Sign Up</div>
			<form className={styles.form}>
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
						name="name"
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