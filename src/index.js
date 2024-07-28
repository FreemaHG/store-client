import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./components/App/App";
import "./styles/index.css"
import { store } from "./features/store";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	// StrictMode проверяет и выявляет проблемы при разработке, не влияет на производительность прод.версии приложения
	<React.StrictMode>
		{/* оборачиваем приложение для работы менеджера состояний */}
		<Provider store={store}>
			{/* оборачиваем приложение для маршрутизации роутов */}
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);