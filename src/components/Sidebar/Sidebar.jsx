import React from "react";
import { NavLink } from "react-router-dom";

import styles from "../../styles/Sidebar.module.css";


const Sidebar = () => {
	return (
		<section className={styles.sidebar}>

			<div className={styles.title}>CATEGORIES</div>

			{/* блок с меню, получаем данные из API */}
			<nav>
				<ul className={styles.menu}>
					<li>
						{/* для маршрутизации (отображения нужного URL) используем компонент из react-router-dom */}
						<NavLink to={`/categories/${1}`}>Link</NavLink>
					</li>
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