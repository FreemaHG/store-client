import React from "react";

import styles from "../../styles/Home.module.css";
import BG from "../../images/computer.png"

const Poster = () => (
	<section className={styles.home}>
		<p className={styles.title}>Big Sale 20%</p>
		<div className={styles.product}>
			<div className={styles.text}>
				<p className={styles.subtitle}>The bestseller of 2024</p>
				<h1 className={styles.head}>LENNON r2d2 with NVIDIA 5090 TI</h1>
				<button className={styles.button}>Shop Now</button>
			</div>
			<div className={styles.image}>
				<img src={BG} alt="" />
			</div>
		</div>
	</section>
);

export default Poster;