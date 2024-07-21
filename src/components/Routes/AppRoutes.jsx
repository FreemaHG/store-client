import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../Home/Home";
import { ROUTES } from "../../utils/routes";
import SingleProduct from "../Products/SingleProduct";
import Profile from "../Profile/Profile";


// связываем роуты с компонентами
// при переходе по указанным URL будет вызываться соответствующий компонент
const AppRoutes = () => (
	<Routes>
		<Route index element={<Home/>} />
		<Route path={ROUTES.PRODUCT} element={<SingleProduct/>} />
		<Route path={ROUTES.PROFILE} element={<Profile/>} />
	</Routes>
);

export default AppRoutes;