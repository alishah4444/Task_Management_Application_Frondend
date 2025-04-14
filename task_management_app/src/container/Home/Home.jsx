import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Row, Col, Dropdown, Alert, Spinner, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import LoginPrompt from './LoginPrompt';
import ListView from './ListView';

function Home() {
	const [tasks, setTasks] = useState([]);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [status, setStatus] = useState('To Do');
	const [editingId, setEditingId] = useState(null);
	const [token, setToken] = useState(localStorage.getItem('token'));
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	const navigate = useNavigate();

	useEffect(() => {
		if (!token) {
			setLoading(false);
			return;
		}

		fetchTasks();
	}, [token]);

	const fetchTasks = async () => {
		try {
			const res = await api.get('/api/tasks/', {
				headers: { Authorization: `Bearer ${token}` },
			});
			setTasks(res.data);
		} catch (err) {
			setError('Failed to load tasks');
		} finally {
			setLoading(false);
		}
	};

	const handleAddOrUpdateTask = async () => {
		if (!title || !description) return;

		const taskData = { title, description, status };

		try {
			if (editingId) {
				const res = await api.put(`/api/tasks/${editingId}`, taskData, {
					headers: { Authorization: `Bearer ${token}` },
				});
				setTasks((prev) => prev.map((t) => (t._id === editingId ? res.data : t)));
				setEditingId(null);
			} else {
				const res = await api.post('/api/tasks', taskData, {
					headers: { Authorization: `Bearer ${token}` },
				});
				setTasks((prev) => [...prev, res.data]);
			}

			setTitle('');
			setDescription('');
			setStatus('To Do');
		} catch {
			setError('Task could not be saved.');
		}
	};

	const handleEdit = (task) => {
		setTitle(task.title);
		setDescription(task.description);
		setStatus(task.status);
		setEditingId(task._id);
	};

	const handleDelete = async (id) => {
		try {
			await api.delete(`/api/tasks/${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			setTasks((prev) => prev.filter((t) => t._id !== id));
		} catch {
			setError('Failed to delete task.');
		}
	};

	const updateStatus = async (id, newStatus) => {
		try {
			const res = await api.put(
				`/api/tasks/${id}`,
				{ status: newStatus },
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			setTasks((prev) => prev.map((t) => (t._id === id ? res.data : t)));
		} catch {
			setError('Failed to update status.');
		}
	};

	if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;

	if (!token) {
		return <LoginPrompt />;
	}

	return (
		<Container className="my-4">
			<motion.h2 className="text-center mb-4" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
				Task Manager
			</motion.h2>

			{error && <Alert variant="danger">{error}</Alert>}

			<Form className="bg-light p-4 rounded shadow-sm mb-4">
				<Form.Group className="mb-3">
					<Form.Label>Title</Form.Label>
					<Form.Control
						type="text"
						value={title}
						placeholder="Enter title"
						onChange={(e) => setTitle(e.target.value)}
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Description</Form.Label>
					<Form.Control
						as="textarea"
						rows={3}
						value={description}
						placeholder="Enter description"
						onChange={(e) => setDescription(e.target.value)}
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Status</Form.Label>
					<Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
						<option>To Do</option>
						<option>In Progress</option>
						<option>Done</option>
					</Form.Select>
				</Form.Group>

				<Button variant="success" onClick={handleAddOrUpdateTask}>
					{editingId ? 'Update Task' : 'Add Task'}
				</Button>
			</Form>

			<Row>
				{tasks.length === 0 && <p className="text-center">No tasks available</p>}
				<ListGroup variant="flush">
					{tasks.map((task) => (
						<ListView
							key={task._id}
							task={task}
							handleDelete={handleDelete}
							handleEdit={handleEdit}
							updateStatus={updateStatus}
						/>
					))}
				</ListGroup>
			</Row>
		</Container>
	);
}

export default Home;
