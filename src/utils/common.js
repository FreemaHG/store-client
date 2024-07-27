// перемешивание элементов массива
export const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

// построение URL с параметрами фильтрации товаров
export const buildUrl = (url, params) => {
	let urlWithParams = url;

	Object.entries(params).forEach(([key, value], index) => {
		// если индекс 0, подставляем '?' (первый параметр), иначе '&' (остальные параметры)
		const sign = !index ? '?' : '&';
		// добавляем параметр в URL только, если есть его значение!
		if (value) {
			urlWithParams += `${sign}${key}=${value}`
		}
	})

	return urlWithParams;
}

// суммирование всех позиций в корзине
// проходим циклом по массиву и складываем предыдущее число со следующим, получая общую сумму
export const sumBy = (arr) => arr.reduce((prev, cur) => prev + cur, 0);
