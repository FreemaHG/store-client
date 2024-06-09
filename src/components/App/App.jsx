import React from "react";

import AppRoutes from "../Routes/AppRoutes";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";

const App = () => {
	return (
		<div className="app">
			<Header />
			<div className="container">
				<AppRoutes />
				<Sidebar />
			</div>
			<Footer />
		</div>
	);
};

export default App;