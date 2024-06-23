import React from "react";

import styles from "../../styles/Categories.module.css";
import { Link } from "react-router-dom";

/**
 * @component
 * @description Блок для вывода категорий
 * @prop {string} title - заголовок блока
 * @prop {list} products - массив с категориями
 * @prop {number} amount - кол-во категорий для вывода
 */
const Categories = ({ title, categories = [], amount }) => {

	// фильтруем категории по индексу (возвращаем не более amount)
	const list = categories.filter((_, i) => i < amount);


	return (
		<section className={styles.section}>
			<h2>{title}</h2>
			<div className={styles.list}>
				{list.map(({ id, name, image }) => (
					// компонент react-router-dom, чтобы переходить по URL на определенную категорию товаров
					<Link to={`categories/${id}`} key={id} className={styles.item}>
						<div className={styles.image} style={{ backgroundImage: `url(${image})` }}/>
						<h3 className={styles.title}>{name}</h3>
					</Link>
				))}
			</div>

		</section>
	);
};

export default Categories;