import React from "react";

import Poster from "../Poster/Poster";
import Category from "./Category";


/**
 * @component
 * @description Страница для отображения товаров одной категории
 */
const SingleCategory = () => {
	return (
		<>
			<Poster />
			<Category />
		</>
	);
};

export default SingleCategory;