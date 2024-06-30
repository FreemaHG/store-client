import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import styles from "../../styles/Product.module.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { addItemToCart } from "../../features/user/userSlice";

// имитация данных с фронта с размерами
const SIZES = [4, 4.5, 5];

/**
 * @component
 * @description Блок для вывода товара
 * @prop {string} title - название товара
 * @prop {string} price - цена товара
 * @prop {string} description - описание товара
 * @prop {string[]} images - массив с изображениями
 */
const Product = (item) => {
	// распаковываем все пропсы
	const { title, price, description, images } = item;

	// dispatch позволяет вызывать функцию для изменения состояния в redux
	const dispatch = useDispatch();

	// первое изображение товара
	const [currentImage, setCurrentImage] = useState(images[0]);
	const [currentSize, setCurrentSize] = useState();

	useEffect(() => {
		// ничего не делаем, если изображений нет
		if (!images.length) return;
		// при изменении массива картинок изменяем главную картинку товара на первую в массиве
		setCurrentImage(images[0]);
	}, [images]);

	// добавление товара в корзину
	const addToCart = () => {
		dispatch(addItemToCart(item));
	}

	return (
		<section className={styles.product}>
			<div className={styles.images}>
				<div
					className={styles.current}
					style={{ backgroundImage: `url(${currentImage})` }}
				/>
				<div className={styles["images-list"]}>
					{images.map((image, index) => (
						// меняем главную картинку товара при клике на второстепенные картинки
						<div
							key={index}
							className={styles.image}
							style={{ backgroundImage: `url(${image})` }}
							onClick={() => setCurrentImage(image)}
						/>
					))}
				</div>
			</div>
			<div className={styles.info}>
				<h1 className={styles.title}>{title}</h1>
				<div className={styles.price}>{price} $</div>
				<div className={styles.color}>
					<span>Color:</span> Green
				</div>
				<div className={styles.sizes}>
					<span>Sizes:</span>
					<div className={styles.list}>
						{SIZES.map(size => (
							// добавляем динамически стиль для выделения активного размера
							<div
								key={size}
								className={`${styles.size} ${currentSize === size ? styles.active : ""}`}
								onClick={() => setCurrentSize(size)}
							>
								{size}
							</div>
						))}
					</div>
				</div>
				<p className={styles.description}>{description}</p>
				<div className={styles.actions}>
					{/*
					кнопка добавления в корзину не активна, пока не выбран размер
					(пока состояние, отвечающее за размер, не имеет данных)
					*/}
					<button className={styles.add} disabled={!currentSize} onClick={addToCart}>Add to cart</button>
					<button className={styles.favourite}>Add to favourites</button>
				</div>
				<div className={styles.bottom}>
					<div className={styles.purchase}>19 people purchased</div>
					<Link to={ROUTES.HOME}>Return to store</Link>
				</div>
			</div>
		</section>
	);
};

export default Product;