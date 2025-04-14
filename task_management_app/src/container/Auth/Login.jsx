// src/Login.js
import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const [form, setForm] = useState({ email: '', password: '' });
	const [message, setMessage] = useState('');
	const navigate = useNavigate();

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await api.post('/api/auth/login', form);
			localStorage.setItem('token', res.data.token);
			window.location.href = '/';
		} catch (err) {
			setMessage(err.response?.data?.message || 'Login failed');
		}
	};

	const onSwitchToRegister = () => {
		navigate('/Register');
	};

	return (
		<Container style={{ maxWidth: 400 }} className="mt-5">
			<h3>Login</h3>
			{message && <Alert variant="danger">{message}</Alert>}
			<Form onSubmit={handleSubmit}>
				<Form.Group className="mb-3">
					<Form.Label>Email</Form.Label>
					<Form.Control name="email" type="email" onChange={handleChange} required />
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Password</Form.Label>
					<Form.Control name="password" type="password" onChange={handleChange} required />
				</Form.Group>
				<Button type="submit" className="w-100">
					Login
				</Button>
				<div className="text-center mt-3">
					<Button variant="link" onClick={onSwitchToRegister}>
						Don't have an account? Register
					</Button>
				</div>
			</Form>
		</Container>
	);
};

export default Login;
