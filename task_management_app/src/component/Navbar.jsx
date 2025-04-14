import { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AppNavbar() {
	const [token, setToken] = useState(localStorage.getItem('token'));

	const handleLogout = () => {
		localStorage.setItem('token', '');
		window.location.reload();
	};

	return (
		<Navbar bg="dark" variant="dark" expand="lg">
			<Container fluid>
				<Navbar.Brand as={Link} to="/">
					Task Managment App
				</Navbar.Brand>

				{/* mobile toggle */}
				<Navbar.Toggle aria-controls="main-navbar" />
				<Navbar.Collapse id="main-navbar">
					<Nav className="ms-auto">
						{token ? (
							<>
								<Nav.Link as={Link} to="/">
									Welcome! to Mini Todo List
								</Nav.Link>
								<Nav.Link as={Link} onClick={handleLogout}>
									Logout
								</Nav.Link>
							</>
						) : (
							<Nav.Link as={Link} to="/Login">
								Login to use Mini Todo List
							</Nav.Link>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default AppNavbar;
