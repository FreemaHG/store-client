import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

import App from "./components/App/App";
import "./styles/index.css"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		{/* оборачиваем приложение для маршрутизации роутов */}
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>
);