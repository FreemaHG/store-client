import React from "react";
import { useDispatch, useSelector } from "react-redux";

import UserSignUpForm from "./UserSignUpForm";
import styles from "../../styles/User.module.css";
import { toggleForm, toggleFormType } from "../../features/user/userSlice";
import UserLoginForm from "./UserLoginForm";

/**
 * @component
 * @description Вывод формы регистрации в зависимости от состояния текущего пользователя
 */
const UserForm = () => {

	// dispatch позволяет вызывать функцию для изменения состояния в redux
	const dispatch = useDispatch();

	// получаем данные по текущему флагу вывода формы из хранилища redux
	const { showForm, formType } = useSelector(({ user }) => user);

	// функция для смены флага вывода формы регистрации
	// вызываем функцию toggleForm, передав в нее новое значение флага
	const closeForm = () => dispatch(toggleForm(false));

	// функция для смены флага с типом формы
	// вызываем функцию toggleFormType, передав в нее новое значение флага (type) с типом формы
	const toggleCurrentFormType = (type) => dispatch(toggleFormType(type));

	// если флаг true, выводим форму регистрации
	return showForm ? (
		<>
			{/* смена флага вывода формы при клике вне области формы (область overlay) */}
			<div className={styles.overlay} onClick={closeForm}/>
			{/* в зависимости от флага с типом формы выводим либо форму регистрации (UserSignUpForm), либо форму авторизации (UserLoginForm) */}
			{/* передаем в качестве пропса функцию для смены флага вывода формы и типы формы, чтобы при клике по крестику скрывать форму */}
			{
				formType === "signup" ?
					<UserSignUpForm
						toggleCurrentFormType={toggleCurrentFormType}
						closeForm={closeForm}
					/> :
					<UserLoginForm
						toggleCurrentFormType={toggleCurrentFormType}
						closeForm={closeForm}
					/>
			}
		</>
	) : (
		<></>
	);
};

export default UserForm;