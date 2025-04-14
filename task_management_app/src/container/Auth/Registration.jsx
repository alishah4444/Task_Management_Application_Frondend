// src/Register.js
import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
	const [form, setForm] = useState({ name: '', email: '', password: '', rePassword: '' });
	const [message, setMessage] = useState('');
	const [success, setSuccess] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		const successMsg = localStorage.getItem('successMsg');
		if (successMsg) {
			setSuccess(successMsg);
			localStorage.removeItem('successMsg');
		}
	}, []);
	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};
	const onSwitchToLogin = () => {
		navigate('/Login');
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// console.log(form.password + '---' + form.rePassword);
			if (form.password.trim() !== form.rePassword.trim()) {
				setMessage('Sorry Password not Match');
				return;
			} else {
				const res = await api.post('/api/auth/register', form);
				localStorage.setItem('token', res.data.token);
				localStorage.setItem('successMsg', 'Successfully Registered! Please proceed to login.');
				window.location.reload(); // reload app as logged in
			}
		} catch (err) {
			setMessage(err.response?.data?.message || 'Registration failed');
		}
	};

	return (
		<Container style={{ maxWidth: 400 }} className="mt-5">
			<h3>Register</h3>
			{message && <Alert variant="danger">{message}</Alert>}
			{success && <Alert variant="success">{success}</Alert>}
			<Form onSubmit={handleSubmit}>
				<Form.Group className="mb-3">
					<Form.Label>Name</Form.Label>
					<Form.Control name="name" type="name" onChange={handleChange} required />
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Email</Form.Label>
					<Form.Control name="email" type="email" onChange={handleChange} required />
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Password</Form.Label>
					<Form.Control name="password" type="text" onChange={handleChange} required />
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Retype Password</Form.Label>
					<Form.Control name="rePassword" type="text" onChange={handleChange} required />
				</Form.Group>

				<Button type="submit" className="w-100">
					Register
				</Button>
				<div className="text-center mt-3">
					<Button variant="link" onClick={onSwitchToLogin}>
						Already have an account? Login
					</Button>
				</div>
			</Form>
		</Container>
	);
};

export default Register;
