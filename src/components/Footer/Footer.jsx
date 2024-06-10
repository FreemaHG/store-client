import React from "react";
import { Link } from "react-router-dom";

import styles from "../../styles/Footer.module.css";
import logo from "../../images/logo.svg";

import { ROUTES } from "../../utils/routes";


const Footer = () => {
	return (
		<section className={styles.footer}>

			{/* логотип */}
			<div className={styles.logo}>
				<Link to={ROUTES.HOME}>
					<img src={logo} alt="Stuff"/>
				</Link>
			</div>

			{/* Ссылка */}
			<div className={styles.rights}>
				Developer by{" "}
				<a href="/" target="_blank" rel="noreferrer">
					Tomkovich
				</a>
			</div>

			{/* блок с соц.сетями */}
			<div className={styles.socials}>
				<a href="https://instagram.com" target="_blank" rel="noreferrer">
					<svg className="icon">
						<use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#instagram`}/>
					</svg>
				</a>
				<a href="https://facebook.com" target="_blank" rel="noreferrer">
					<svg className="icon">
						<use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#facebook`}/>
					</svg>
				</a>
				<a href="https://youtube.com" target="_blank" rel="noreferrer">
					<svg className="icon">
						<use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#youtube`}/>
					</svg>
				</a>
			</div>

		</section>
	);
};

export default Footer;