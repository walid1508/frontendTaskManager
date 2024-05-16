import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import LogoutButton from '../components/LogoutButton';
import AddTaskModal from '../components/AddTaskModal';
import EditTaskModal from '../components/EditTaskModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faTimes, faEdit, faTrash, faTh, faBars } from '@fortawesome/free-solid-svg-icons';
import './Home.css';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isGridView, setIsGridView] = useState(true);
    const username = useAuthStore(state => state.username);

    const fetchTasks = async () => {
        const accessToken = useAuthStore.getState().accessToken;

        try {
            const response = await fetch('http://localhost:4500/tasks', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            const data = await response.json();

            if (response.ok) {
                setTasks(data.data);
            } else {
                console.error('Failed to fetch tasks:', data.message);
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    const addTask = async (newTask) => {
        const accessToken = useAuthStore.getState().accessToken;

        try {
            const response = await fetch('http://localhost:4500/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(newTask),
            });

            const data = await response.json();

            if (response.ok) {
                setTasks([...tasks, data.data]);
            } else {
                console.error('Failed to add task:', data.message);
            }
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const updateTask = async (updatedTask) => {
        const accessToken = useAuthStore.getState().accessToken;

        try {
            const response = await fetch(`http://localhost:4500/tasks/${updatedTask._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(updatedTask),
            });

            const data = await response.json();

            if (response.ok) {
                setTasks(tasks.map(task => (task._id === updatedTask._id ? data.data : task)));
            } else {
                console.error('Failed to update task:', data.message);
            }
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const deleteTask = async (id) => {
        const accessToken = useAuthStore.getState().accessToken;

        try {
            const response = await fetch(`http://localhost:4500/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (response.ok) {
                setTasks(tasks.filter(task => task._id !== id));
            } else {
                const data = await response.json();
                console.error('Failed to delete task:', data.message);
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const editTask = (task) => {
        setSelectedTask(task);
        setShowEditModal(true);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const getPriorityClass = (priority) => {
        switch (priority) {
            case 'Low':
                return 'low-priority';
            case 'Medium':
                return 'medium-priority';
            case 'High':
                return 'high-priority';
            default:
                return '';
        }
    };

    return (
        <div className="container-fluid mt-5 text-light" style={{ minHeight: '100vh' }}>
            <Navbar bg="dark" variant="dark" fixed="top" className="mb-5">
                <Container>
                    <Navbar.Brand href="#home">Task Manager</Navbar.Brand>
                    <Nav>
                        <Nav.Link href="#user">Welcome, {username}</Nav.Link>
                        <LogoutButton />
                    </Nav>
                </Container>
            </Navbar>
            <div className="content" style={{ paddingTop: '60px' }}>
                <div className="d-flex justify-content-center mb-4">
                    <Button variant="success" className="rounded-pill me-2" onClick={() => setShowAddModal(true)}>
                        <FontAwesomeIcon icon={faPlus} /> Add New Task
                    </Button>
                    <Button variant="secondary" className="rounded-pill" onClick={() => setIsGridView(!isGridView)}>
                        <FontAwesomeIcon icon={isGridView ? faBars : faTh} /> Toggle View
                    </Button>
                </div>
                {loading ? (
                    <div className="d-flex justify-content-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : (
                    <Row className={`justify-content-center ${isGridView ? 'grid-view' : 'list-view'}`}>
                        {tasks.map(task => (
                            <Col md={isGridView ? 4 : 12} sm={6} key={task._id} className="mb-4">
                                <Card className={`shadow-sm text-light bg-dark ${getPriorityClass(task.priority)}`}>
                                    <Card.Body>
                                        <Card.Title className="d-flex justify-content-between align-items-center">
                                            <span>{task.title}</span>
                                            <div>
                                                <FontAwesomeIcon icon={faEdit} className="text-primary me-2 cursor-pointer" onClick={() => editTask(task)} />
                                                <FontAwesomeIcon icon={faTrash} className="text-danger cursor-pointer" onClick={() => deleteTask(task._id)} />
                                            </div>
                                        </Card.Title>
                                        <Card.Text>{task.description}</Card.Text>
                                        <Card.Text><strong>Priority:</strong> <span className={`badge ${getPriorityClass(task.priority)}`}>{task.priority}</span></Card.Text>
                                        <Card.Text><strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}</Card.Text>
                                        <Card.Text>
                                            <strong>Completed:</strong> {task.completed ? (
                                            <FontAwesomeIcon icon={faCheck} className="text-success" />
                                        ) : (
                                            <FontAwesomeIcon icon={faTimes} className="text-danger" />
                                        )}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
                <AddTaskModal show={showAddModal} handleClose={() => setShowAddModal(false)} addTask={addTask} />
                <EditTaskModal show={showEditModal} handleClose={() => setShowEditModal(false)} task={selectedTask} updateTask={updateTask} />
            </div>
        </div>
    );
};

export default Home;
