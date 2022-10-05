import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './views/Login';
import Register from './views/Register';
import Dashboard from './views/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate } from 'react-router-dom';

const App = () => {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/register" exact element={<Register />}></Route>
					<Route path="/login" exact element={<Login />}></Route>
					<Route path="/dashboard" exact element={<Dashboard />}></Route>
					<Route path="/" element={<Navigate to="/register" replace />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
