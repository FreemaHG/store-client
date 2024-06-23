import React from "react";
import { Link } from "react-router-dom";

import styles from "../../styles/Products.module.css";

/**
 * @component
 * @description Блок для вывода популярных, похожих и отфильтрованных товаров
 * @prop {string} title - заголовок блока
 * @prop {object} style - стили
 * @prop {list} products - массив с товарами
 * @prop {number} amount - кол-во товаров для вывода
 */
const Products = ({ title, style = {}, products = [], amount }) => {

	// фильтруем товары по индексу (возвращаем не более amount)
	const list = products.filter((_, i) => i < amount)

	return (
		<section className={styles.products} style={style}>
			{title && <h2>{title}</h2>}
			<div className={styles.list}>
				{/* проходимся циклом по уже отфильтрованным товарам */}
				{list.map(({id, images, title, category: {name: cat}, price}) => (
					// компонент react-router-dom, чтобы переходить по URL на определенный товар
					<Link className={styles.product} to={`/products/${id}`} key={id}>
						<div className={styles.image} style={{backgroundImage: `url(${images[0]})`}} />
						<div className={styles.wrapper}>
							<h3 className={styles.title}>{title}</h3>
							<p className={styles.cat}>{cat}</p>
							<div className={styles.info}>
								<div className={styles.prices}>
									<p className={styles.price}>{Math.floor(price * 0.8)}$</p>
									<p className={styles.oldPrice}>{price}$</p>
								</div>
								<p className={styles.purchases}>
									{Math.floor(Math.random() * 20 + 1)} purchased
								</p>
							</div>
						</div>
					</Link>
				))}
			</div>
		</section>
	);
};

export default Products;