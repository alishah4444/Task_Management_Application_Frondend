import React from 'react';
import { Button, Dropdown, ListGroup, Badge } from 'react-bootstrap';
import './TaskList.css';

export default function ListView({ task, handleDelete, updateStatus, handleEdit }) {
	return (
		<ListGroup.Item className="task-item shadow-sm fade-in mb-3">
			<div className="d-flex justify-content-between align-items-center flex-wrap">
				<div className="task-content">
					<h5 className="mb-1">{task.title}</h5>
					<p className="mb-1 text-muted">{task.description}</p>
					<Badge
						bg={
							task.status === 'Done' ? 'success' : task.status === 'In Progress' ? 'warning' : 'secondary'
						}
					>
						{task.status}
					</Badge>
					<p className="mb-0 mt-1 small text-muted">Created: {new Date(task.createdAt).toLocaleString()}</p>
				</div>

				<div className="d-flex gap-2 mt-2 mt-sm-0 align-items-center">
					<Dropdown>
						<Dropdown.Toggle size="sm" variant="outline-info">
							Status
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<Dropdown.Item onClick={() => updateStatus(task._id, 'To Do')}>To Do</Dropdown.Item>
							<Dropdown.Item onClick={() => updateStatus(task._id, 'In Progress')}>
								In Progress
							</Dropdown.Item>
							<Dropdown.Item onClick={() => updateStatus(task._id, 'Done')}>Done</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>

					<Button size="sm" variant="outline-warning" onClick={() => handleEdit(task)}>
						Edit
					</Button>
					<Button size="sm" variant="outline-danger" onClick={() => handleDelete(task._id)}>
						Delete
					</Button>
				</div>
			</div>
		</ListGroup.Item>
	);
}
