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