import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './LoginPrompt.css'; // CSS file for animations

function LoginPrompt() {
	const navigate = useNavigate();

	return (
		<Container className="text-center my-5 fade-in">
			<h3 className="mb-4 login-title">🔐 Access Restricted</h3>
			<p className="mb-4">Please log in to view your tasks and manage your productivity.</p>
			<Button variant="dark" className="bounce-btn" size="lg" onClick={() => navigate('/login')}>
				🚀 Login Now
			</Button>
		</Container>
	);
}

export default LoginPrompt;
