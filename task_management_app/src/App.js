import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './container/Home/Home';
import About from './container/About/About';
import AppNavbar from './component/Navbar';
import { Col } from 'react-bootstrap';
import Login from './container/Auth/Login';
import Register from './container/Auth/Registration';

function App() {
	return (
		<BrowserRouter>
			<AppNavbar />

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/Login" element={<Login />} />
				<Route path="/Register" element={<Register />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
