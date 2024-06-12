import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "../../styles/Sidebar.module.css";


const Sidebar = () => {
	// через хук получаем данные по категориям из хранилища redux
	const { list } = useSelector(({ categories }) => categories);

	return (
		<section className={styles.sidebar}>
			<div className={styles.title}>CATEGORIES</div>
			{/* блок с меню, получаем данные из API */}
			<nav>
				<ul className={styles.menu}>
					{/* проходим циклом по объектам категорий, деструктуризируем */}
					{list.map(({ id, name }) => (
						<li key={id}>
							{/* для маршрутизации (отображения нужного URL) используем компонент из react-router-dom */}
							{/* устанавливаем стиль для активной ссылки при нажатии (см. документацию react-router-dom) */}
							<NavLink
								className={({ isActive }) =>
									`${styles.link} ${isActive ? styles.active : ""}`
								}
								to={`/categories/${id}`}>{name}
							</NavLink>
						</li>
					))}
				</ul>
			</nav>

			<div className={styles.footer}>
				<a href="/help" className={styles.link} target="_blank">Help</a>
				<a
					href="/terms"
					className={styles.link}
					style={{ textDecoration: "underline" }}
					target="_blank"
				>Terms & Conditions</a>
			</div>

		</section>
	);
};

export default Sidebar;