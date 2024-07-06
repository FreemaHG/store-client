import React from "react";
import { useDispatch, useSelector } from "react-redux";

import UserSignUpForm from "./UserSignUpForm";
import styles from "../../styles/User.module.css";
import { toggleForm } from "../../features/user/userSlice";

/**
 * @component
 * @description Вывод формы регистрации в зависимости от состояния текущего пользователя
 */
const UserForm = () => {

	// dispatch позволяет вызывать функцию для изменения состояния в redux
	const dispatch = useDispatch();

	// получаем данные по текущему флагу вывода формы из хранилища redux
	const { showForm } = useSelector(({ user }) => user);

	// функция для смены флага вывода формы регистрации
	const closeForm = () => dispatch(toggleForm(false))

	// если флаг true, выводим форму регистрации
	return showForm ? (
		<>
			{/* смена флага вывода формы при клике вне области формы (область overlay) */}
			<div className={styles.overlay} onClick={closeForm}/>
			{/*
				передаем в качестве пропса функцию для смены флага вывода формы регистрации,
				чтобы при клике по крестику скрывать форму
			*/}
			<UserSignUpForm closeForm={closeForm}/>
		</>
	) : (
		<></>
	);
};

export default UserForm;