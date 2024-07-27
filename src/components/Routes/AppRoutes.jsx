import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../Home/Home";
import { ROUTES } from "../../utils/routes";
import SingleProduct from "../Products/SingleProduct";
import Profile from "../Profile/Profile";
import SingleCategory from "../Categories/SingleCategory";
import Cart from "../Cart/Cart";


// связываем роуты (ссылки) с компонентами
// при переходе по указанным URL будет вызываться соответствующий компонент
// в зависимости от URL отрисовывается соответствующий компонент на странице
/**
 * @component
 * @description Отрисовка компонентов-страниц для главной страницы, товара, товаров определенной категории и профиля
 */
const AppRoutes = () => (
	<Routes>
		<Route index element={<Home/>} />
		<Route path={ROUTES.PRODUCT} element={<SingleProduct/>} />
		<Route path={ROUTES.CATEGORY} element={<SingleCategory/>} />
		<Route path={ROUTES.CART} element={<Cart/>} />
		<Route path={ROUTES.PROFILE} element={<Profile/>} />
	</Routes>
);

export default AppRoutes;