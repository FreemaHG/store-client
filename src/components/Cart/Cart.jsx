import React from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "../../styles/Cart.module.css";
import { sumBy } from "../../utils/common";
import { addItemToCart, removeItemFromCart } from "../../features/user/userSlice";

/**
 * @component
 * @description Блок для отображения корзины текущего пользователя
 */
const Cart = () => {

	// для отправки действий в react-redux для обновления состояний
	const dispatch = useDispatch();

	// получаем и реструктуризируем список товарами в корзине текущего пользователя из хранилища redux
	const { cart } = useSelector(({ user }) => user);

	// изменение кол-ва товара при клике (передаем объект товара и новое значение кол-ва)
	const changeQuantity = (item, quantity) => {
		// передаем распакованные данные о товаре и новое кол-во товара
		dispatch(addItemToCart({ ...item, quantity }));
	}

	// удаление товара (по его id) из корзины пользователя
	const removeItem = (id) => {
		// вызов функции для изменения состояния в react-redux
		dispatch(removeItemFromCart(id));
	}

	return (
		<section className={styles.cart}>
			<h2 className={styles.title}>Your cart</h2>
			{/* отображаем товары, только если они есть */}
			{!cart.length ? (
				<div className={styles.empty}>Here is empty</div>
			) : (
				<>
					<div className={styles.list}>
						{/* реструктуризируем нужные параметры */}
						{cart.map((item) => {
							const { id, title, category, price, images, quantity } = item;
							return (
								<div className={styles.item} key={id}>
									<div
										className={styles.image}
										style={{ backgroundImage: `url(${images[0]})` }}
									/>
									<div className={styles.info}>
										<h3 className={styles.name}>{title}</h3>
										<div className={styles.category}>{category.name}</div>
									</div>
									<div className={styles.price}>{price}$</div>
									<div className={styles.quantity}>
										{/* передаем товар и новое кол-во товаров в changeQuantity для изменения состояния */}
										{/* передаем 1 либо новое кол-во товара (наибольшее значение) */}
										<div className={styles.minus} onClick={() => changeQuantity(item, Math.max(1, quantity - 1))}>
											<svg className="icon">
												<use
													xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#minus`}
												/>
											</svg>
										</div>
										<span>{quantity}</span>
										{/* передаем товар и новое кол-во товаров в changeQuantity для изменения состояния */}
										{/* передаем 1 либо новое кол-во товара (наибольшее значение) */}
										<div className={styles.plus} onClick={() => changeQuantity(item, Math.max(1, quantity + 1))}>
											<svg className="icon">
												<use
													xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#plus`}
												/>
											</svg>
										</div>
									</div>
									{/* общая стоимость одной позиции товара (умножаем цену на кол-во) */}
									<div className={styles.total}>{price * quantity}$</div>
									{/* удаление товара при клике */}
									<div className={styles.close} onClick={() => removeItem(item.id)}>
										<svg className="icon">
											<use
												xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`}
											/>
										</svg>
									</div>
								</div>
							);
						})}
					</div>
					<div className={styles.actions}>
						<div className={styles.total}>
							TOTAL PRICE: {" "}
							<span>
								{/*
									проходим циклом по массиву с товарами, перемножаем кол-во товара на цену, сохраняем в массив
									и передаем массив с суммами позиций товаров в функцию для подсчета общей стоимости всей корзины
								*/}
								{sumBy(cart.map(({ quantity, price }) => quantity * price))}$
							</span>
						</div>
						<button className={styles.proceed}>Proceed to checkout</button>
					</div>
				</>
			)}
		</section>
	);
};

export default Cart;